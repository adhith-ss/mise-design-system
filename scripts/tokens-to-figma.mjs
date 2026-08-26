/**
 * tokens.css  ->  tokens/figma-tokens.json  (Tokens Studio format)
 *
 * Two sets:
 *   primitives  the raw palette and scales, deduplicated. Nothing binds to these
 *               directly in Figma except the semantic layer.
 *   semantic    mirrors tailwind.config.ts exactly, so a Figma variable and a
 *               Tailwind class are the same word: bg-brand-600 <-> brand/600.
 *
 * Values are copied verbatim from tokens.css. This script never invents or
 * adjusts a value — if a colour is wrong it is wrong in tokens.css.
 *
 *   node scripts/tokens-to-figma.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const CSS = 'storybook/src/styles/tokens.css';
const OUT = 'tokens/figma-tokens.json';

/* ---------- read tokens.css ---------------------------------------- */

const src = readFileSync(CSS, 'utf8');

// Only the :root block. The prefers-reduced-motion block re-declares two
// durations; those are a runtime concern, not a design token, so it is skipped.
const root = src.slice(src.indexOf(':root'), src.indexOf('@media'));

const css = {};
for (const [, name, value] of root.matchAll(/--mise-([a-z0-9-]+)\s*:\s*([^;]+);/g)) {
  css[name] = value.trim();
}

const used = new Set();
const take = (name) => {
  if (!(name in css)) throw new Error(`tokens.css has no --mise-${name}`);
  used.add(name);
  return css[name];
};

/* ---------- primitives --------------------------------------------- */
// Grouped, but every leaf keeps the name it already has in tokens.css.

const color = (v) => ({ value: v, type: 'color' });

const primitives = {
  brand: Object.fromEntries(
    ['50', '100', '200', '500', '600', '700', '800', '900'].map((s) => [s, color(take(`brand-${s}`))]),
  ),
  ink: Object.fromEntries(
    ['300', '400', '500', '700', '900'].map((s) => [s, color(take(`ink-${s}`))]),
  ),
  surface: {
    canvas: color(take('canvas')),
    surface: color(take('surface')),
    raised: color(take('surface-raised')),
    sunken: color(take('sunken')),
  },
  line: {
    line: color(take('line')),
    soft: color(take('line-soft')),
    'neutral-200': color(take('neutral-200')),
  },
  red: {
    600: color(take('danger')),
    // One danger tint, doing both jobs: the fill behind a danger Badge or
    // Banner, and the hover wash on a danger Button. There was a second,
    // paler #FDF8F7 for the wash; the two were indistinguishable in Figma.
    50: color(take('tone-danger-bg')),
    200: color(take('danger-line')),
    300: color(take('danger-border')),
  },
  amber: {
    600: color(take('warn')),
    700: color(take('warn-ink')),
    50: color(take('warn-bg')),
  },
  orange: {
    600: color(take('alert')),
    50: color(take('tone-warning-bg')),
  },
  blue: {
    600: color(take('tone-info-fg')),
    50: color(take('tone-info-bg')),
  },
};

/* ---------- semantic ------------------------------------------------ */
// Shape follows tailwind.config.ts. `ref` aliases a primitive; anything not
// aliased below had no primitive to point at.

const ref = (path) => ({ value: `{primitives.${path}}`, type: 'color' });

const resolve = (path) =>
  path.split('.').reduce((o, k) => o[k], primitives).value;

/**
 * Alias a tokens.css variable onto a primitive, asserting they hold the same
 * value. Six of the tone/* variables duplicate a primitive exactly; this keeps
 * that true rather than assumed, so a future edit to one and not the other
 * fails the build instead of silently splitting the palette in two.
 */
const alias = (cssName, path) => {
  const actual = take(cssName);
  const expected = resolve(path);
  if (actual.toUpperCase() !== expected.toUpperCase()) {
    throw new Error(
      `--mise-${cssName} is ${actual}, but primitives.${path} is ${expected}. ` +
        `They were the same value when this mapping was written. Decide which is ` +
        `right, fix tokens.css, then update this alias.`,
    );
  }
  return ref(path);
};

const semantic = {
  brand: Object.fromEntries(
    Object.keys(primitives.brand).map((s) => [s, ref(`brand.${s}`)]),
  ),
  ink: Object.fromEntries(
    Object.keys(primitives.ink).map((s) => [s, ref(`ink.${s}`)]),
  ),

  canvas: ref('surface.canvas'),
  surface: {
    DEFAULT: ref('surface.surface'),
    raised: ref('surface.raised'),
    sunken: ref('surface.sunken'),
  },
  line: {
    DEFAULT: ref('line.line'),
    soft: ref('line.soft'),
  },
  neutral: { 200: ref('line.neutral-200') },

  danger: {
    DEFAULT: ref('red.600'),
    line: ref('red.200'),
    border: ref('red.300'),
  },
  warn: {
    DEFAULT: ref('amber.600'),
    ink: ref('amber.700'),
    bg: ref('amber.50'),
  },
  alert: ref('orange.600'),

  // The five states any record can be in. Shared by Badge, Banner, Toast,
  // StatusDot via tone.ts, so these five pairs are the contract.
  tone: {
    'success-bg': alias('tone-success-bg', 'brand.50'),
    'success-fg': alias('tone-success-fg', 'brand.600'),
    'warning-bg': ref('orange.50'),
    'warning-fg': alias('tone-warning-fg', 'orange.600'),
    'danger-bg': ref('red.50'),
    'danger-fg': alias('tone-danger-fg', 'red.600'),
    'info-bg': ref('blue.50'),
    'info-fg': ref('blue.600'),
    'neutral-bg': alias('tone-neutral-bg', 'surface.sunken'),
    'neutral-fg': alias('tone-neutral-fg', 'ink.700'),
  },

  // Scrim is a colour, not a shadow — it fills the backdrop behind a modal.
  scrim: color(take('scrim')),

  radius: Object.fromEntries(
    ['sm', 'md', 'lg', 'xl', 'pill', 'control'].map((s) => [
      s,
      { value: take(`radius-${s}`).replace('px', ''), type: 'borderRadius' },
    ]),
  ),

  control: Object.fromEntries(
    ['sm', 'md', 'lg'].map((s) => [
      s,
      { value: take(`control-${s}`).replace('px', ''), type: 'sizing' },
    ]),
  ),

  // Figma applies these as effect styles, not variables.
  shadow: Object.fromEntries(
    ['popover', 'overlay', 'raised'].map((name) => {
      const [x, y, blur, ...rest] = take(`shadow-${name}`).split(/\s+(?![^(]*\))/);
      return [
        name,
        {
          type: 'boxShadow',
          value: {
            x: x.replace('px', ''),
            y: y.replace('px', ''),
            blur: blur.replace('px', ''),
            spread: '0',
            color: rest.join(' '),
            type: 'dropShadow',
          },
        },
      ];
    }),
  ),

  // Figma needs a family name, not a CSS stack. The fallbacks in tokens.css
  // are dropped here and kept only in code.
  font: {
    sans: { value: 'Manrope', type: 'fontFamilies' },
    data: { value: 'General Sans', type: 'fontFamilies' },
  },

  duration: {
    fast: { value: take('duration-fast'), type: 'other' },
    base: { value: take('duration-base'), type: 'other' },
  },
  ease: { value: take('ease'), type: 'other' },
};

// font-sans / font-data are consumed above as literals; mark them read.
take('font-sans');
take('font-data');

/* ---------- guard --------------------------------------------------- */
// If tokens.css gains a value and nobody maps it, fail loudly rather than
// shipping a Figma library that is quietly missing a token.

const missed = Object.keys(css).filter((k) => !used.has(k));
if (missed.length) {
  throw new Error(`unmapped in tokens.css: ${missed.join(', ')}`);
}

/* ---------- write --------------------------------------------------- */

mkdirSync('tokens', { recursive: true });
writeFileSync(
  OUT,
  `${JSON.stringify(
    {
      primitives,
      semantic,
      $themes: [],
      $metadata: { tokenSetOrder: ['primitives', 'semantic'] },
    },
    null,
    2,
  )}\n`,
);

const count = (o) =>
  Object.values(o).reduce((n, v) => n + ('type' in v ? 1 : count(v)), 0);

console.log(`${OUT}: ${count(primitives)} primitives, ${count(semantic)} semantic`);
console.log(`${Object.keys(css).length} variables read from ${CSS}, all mapped`);

/**
 * Refresh tokens/lucide/icons.json from Lucide's published SVGs.
 *
 * Keyed by the semantic name this system uses; each entry records the canonical
 * Lucide name (five differ — see tokens/lucide/README.md) and the SVG body.
 *
 *   node scripts/fetch-lucide.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';

const VERSION = '1.34.0';
const BASE = `https://unpkg.com/lucide-static@${VERSION}/icons/`;

// our name -> candidate Lucide names, most current first
const WANT = {
  'alert-triangle': ['triangle-alert', 'alert-triangle'],
  'arrow-down-right': ['arrow-down-right'],
  'arrow-up-right': ['arrow-up-right'],
  'bar-chart': ['chart-column', 'bar-chart'],
  'book-open': ['book-open'],
  calendar: ['calendar'],
  check: ['check'],
  'check-circle': ['circle-check', 'check-circle'],
  'chevron-down': ['chevron-down'],
  'chevron-left': ['chevron-left'],
  'chevron-right': ['chevron-right'],
  'chevron-up': ['chevron-up'],
  'clipboard-check': ['clipboard-check'],
  close: ['x'],
  database: ['database'],
  'dollar-sign': ['dollar-sign'],
  download: ['download'],
  'external-link': ['external-link'],
  'file-text': ['file-text'],
  gauge: ['gauge'],
  history: ['history'],
  'layout-grid': ['layout-grid'],
  minus: ['minus'],
  'more-horizontal': ['ellipsis', 'more-horizontal'],
  'package-search': ['package-search'],
  plus: ['plus'],
  printer: ['printer'],
  search: ['search'],
  settings: ['settings'],
  sparkles: ['sparkles'],
  'trending-up': ['trending-up'],
  upload: ['upload'],
};

const out = {};
const failed = [];

for (const [ours, candidates] of Object.entries(WANT)) {
  let got = null;
  for (const name of candidates) {
    const res = await fetch(BASE + name + '.svg');
    if (!res.ok) continue;
    const svg = await res.text();
    const body = svg
      .slice(svg.indexOf('>', svg.indexOf('<svg')) + 1, svg.lastIndexOf('</svg>'))
      .replace(/\s+/g, ' ')
      .trim();
    got = { lucide: name, body };
    break;
  }
  if (got) out[ours] = got;
  else failed.push(ours);
}

if (failed.length) throw new Error(`could not resolve: ${failed.join(', ')}`);

mkdirSync('tokens/lucide', { recursive: true });
writeFileSync('tokens/lucide/icons.json', `${JSON.stringify(out, null, 1)}\n`);

const renamed = Object.entries(out).filter(([k, v]) => k !== v.lucide);
console.log(`lucide ${VERSION}: ${Object.keys(out).length} icons`);
console.log(`renamed upstream: ${renamed.map(([k, v]) => `${k} -> ${v.lucide}`).join(', ')}`);

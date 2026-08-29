# Mise DLS — Storybook

CSF3 + MDX, TypeScript, Tailwind. Drop this folder into whichever repo ends up
housing the design system; nothing here assumes a path outside itself.

```
npm install
npm run storybook     # localhost:6006
npm run typecheck
```

## Layout

```
.storybook/            main.ts (globs, docgen), preview.ts (sort, backgrounds, a11y)
src/styles/tokens.css  every value in the system, as CSS custom properties
src/styles/tailwind.css base layer + .font-data utility
tailwind.config.ts     theme mapped onto the token variables
src/lib/cx.ts          class joiner — swap for the host repo's cn()
src/docs/*.mdx         Foundations pages + one category page per category
src/components/<category>/
    Component.tsx          implementation
    Component.stories.tsx  one export per state
    index.ts               category barrel
```

## Rules the files follow

- Components read `tokens.css` through Tailwind's theme. No hex in a component.
- `.font-data` (Roboto Mono Light) for anything read as data: amounts, counts,
  IDs, tool names. Manrope everywhere else.
- One story per state, named for the state. Where a component has more than four,
  an `AllStates` story is the visual-regression baseline.
- Props are documented by TSDoc on the interface — autodocs reads it, so there is
  no separate props table to keep in sync.
- `parameters.docs.description.component` carries the same prose as the HTML spec
  site, so the two do not drift.

## Fonts

Not bundled. Add to `.storybook/preview-head.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=general-sans@300&display=swap" rel="stylesheet">
```

Self-host both before production.

## Status

All eight categories built. 78 components, 8 category docs pages, 6 Foundations pages.

| Category | Count | Stories |
| --- | --- | --- |
| Chat & Agent | 8 | done |
| Action | 10 | done |
| Data Input | 13 | done |
| Feedback & Status | 8 | done |
| Content | 15 | done |
| Navigation | 7 | done |
| Overlay | 7 | done |
| Table & List | 5 | done |

Foundations: Overview, Colour, Type, Spacing & radius, Elevation, Motion — done.

## Source of truth

The HTML documentation site at the project root is the specification. This
Storybook implements it. Where they disagree, the spec is right and the code is
behind.

# Icons — Lucide

The Mise MVP uses [Lucide](https://lucide.dev). The Figma library imports Lucide's
published SVGs unmodified, so Figma and production render identical geometry.

`icons.json` is the exact source used to build the Figma components: Lucide
**1.34.0**, keyed by our semantic name, each entry recording the canonical Lucide
name and the SVG body.

## How they are set

Lucide ships at `stroke-width="2"` on a 24 grid. This system overrides that to
**1.5**, because that is what `Icon.tsx` passes:

```tsx
<svg viewBox="0 0 24 24" width={DIM[size]} strokeWidth={1.5} />
```

Figma components are built at 24×24 with SCALE constraints, so resizing an
instance to 14 / 16 / 20 scales geometry and stroke together — matching how the
SVG behaves in the browser.

## Five names differ

Lucide has renamed these since the words this system uses were chosen:

| This system calls it | Lucide calls it |
| --- | --- |
| `close` | `x` |
| `more-horizontal` | `ellipsis` |
| `alert-triangle` | `triangle-alert` |
| `bar-chart` | `chart-column` |
| `check-circle` | `circle-check` |

Figma components carry the **Lucide** name, so `import { X }` and `icon/x` agree.

## Known inconsistency

The Storybook components do **not** use Lucide yet — they use typographic
stand-ins (`▾` in 5 files, `×` in 7, plus `▴ ▸ ✓ ··· − ↗`). Production and the
Figma library both use Lucide. Adopting Lucide in `storybook/src/components`
would close the gap; the mapping above is what that swap needs.

## Refreshing

```bash
node scripts/fetch-lucide.mjs
```

## Licence

Lucide is ISC licensed. See https://lucide.dev/license.

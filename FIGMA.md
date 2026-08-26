# The Figma library

`https://www.figma.com/design/OYSStcuycsv9G63w7TC1uc/Mise_DLS`

Built from this repo. Values come from `tokens.css`, geometry from Lucide,
component behaviour from `storybook/src/components`.

## ⚠️ One thing to change back before shipping

**Every `data/*` text style points at Geist Light. They must be General Sans
Light.**

Repoint all of them in Figma's local text styles — there are five today
(`data/14`, `data/13`, `data/12.5`, `data/12`, `data/11.5`) and the set grows as
components need new sizes, so select the whole `data/` group rather than working
from a list. Every number, ID and tool name in the file becomes correct at once;
nothing else needs touching and no component has to be rebuilt.

### Why they are wrong on purpose

General Sans is installed locally and works in the Figma client, but the tooling
that builds these components cannot load it — `loadFontAsync` throws "the font
family does not exist", because that context only sees Figma's ~1,900 hosted
families.

A text style using it can still be *applied*, and the node really does become
General Sans. But from that moment the node is frozen to tooling:

- `characters`, `fontSize`, `textCase`, `letterSpacing` all throw
- `instance.setProperties()` fails for a TEXT property on such a node
- the text style itself cannot be edited, so uppercase and tracking cannot be
  baked in

Building on Geist keeps all of that working. The swap at the end costs one
action and loses nothing, because from then on the only people editing those
nodes are humans in Figma — where the font is available.

Two components already carry the scars of building the other way round, both
flagged in amber on their pages: `DropdownMenu`'s group heading has no tracking,
and its shortcut text is fixed at the component default.

## Structure

| Page | Contents |
| --- | --- |
| Cover, Getting Started | Entry points and the three system rules |
| Colour | 31 palette + 38 semantic swatches, every chip bound to its variable |
| Type | 11 `ui/*` and 4 `data/*` styles, with specimens |
| Spacing & Radius | Spacing bars, 6 radii, 3 control heights |
| Elevation | 3 effect styles, scrim |
| Icon | 32 Lucide components at 24×24, stroke 1.5 |
| Action | Button, IconButton, ButtonGroup, ToggleButton, ToggleButtonGroup, SegmentedControl, Link, MenuItem, DropdownMenu, MoreMenu, Toolbar |

Variables: `primitives` (31, hidden from pickers) and `semantic` (49, aliased to
primitives, WEB code syntax on every one).

## Known gaps

- `SegmentedControl` sm is 26px — the scale has 32 / 40 / 44 and nothing at 26,
  so it is a raw value. Needs a token or should inherit `control/sm`.
- `Link`'s inline underline is `decoration-brand-200` in code — lighter than the
  text. Figma cannot colour an underline separately.
- The MVP's sidebar is a dark surface with an amber logo mark. Neither exists in
  the token set; resolve before building an app shell.

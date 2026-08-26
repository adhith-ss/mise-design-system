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
| Type | 11 `ui/*` and 5 `data/*` styles, with specimens |
| Spacing & Radius | Spacing bars, 6 radii, 3 control heights |
| Elevation | 3 effect styles, scrim |
| Icon | 32 Lucide components at 24×24, stroke 1.5 |
| Action | Button, IconButton, ButtonGroup, ToggleButton, ToggleButtonGroup, SegmentedControl, Link, MenuItem, DropdownMenu, MoreMenu, Toolbar |
| Content | Heading, Text, Divider, Token, Kbd, Code, Timestamp, Avatar, AvatarGroup, Thumbnail, Blockquote, CodeBlock, Markdown, Card |

Variables: `primitives` (31, hidden from pickers) and `semantic` (49, aliased to
primitives, WEB code syntax on every one).

`Icon` counts as Content in the code (`components/content/Icon.tsx`) but keeps
its own page here, next to the other foundations, because it is a 32-component
asset sheet rather than a documented component.

### Page template

Every component page is laid out the same way, so a reader learns the shape once:

| Frame | Position | Contents |
| --- | --- | --- |
| `doc — header` | 40, 60 · w 980 | `ui/section-title` name, `ui/body` description |
| component set | 40, 300 · no fill | The variant grid |
| `in use` | 40, 640 · w 760 | The component in a real ops context, with a caption |
| `doc — notes` | 10, 1320 · w 520 | Note cards: `ui/card-title-sm` + `ui/dense`, radius 14 |

Variants are named `Axis=Value, Axis=Value`. Editable text is a component
property named for the node it drives (`label`, `quote`, `value`).

### Content — variant counts

| Component | Variants | Axes | Extra properties |
| --- | --- | --- | --- |
| Heading | 5 | Level | — |
| Text | 30 | Size × Face × Tone | label |
| Divider | 4 | Orientation × Weight | label, Show label |
| Token | 8 | Tone × Size | label, prefix, Show prefix, Removable |
| Kbd | 2 | Size | key |
| Code | 2 | Tone | label |
| Timestamp | 6 | Format × Size | value |
| Avatar | 24 | Shape × Size × Status | initials |
| AvatarGroup | 3 | Size | count |
| Thumbnail | 6 | Kind × Size | pageCount, Show page count |
| Blockquote | 2 | Attribution | quote, attribution, source |
| CodeBlock | 4 | Appearance × Header | code, language |
| Markdown | 2 | Size | — |
| Card | 3 | Edge | title, subtitle, Show header/action/footer |

## Three traps worth knowing before building the next category

**A hidden auto-layout child still costs you its gap.** Hiding a node removes it
from layout, but the spacing between its two neighbours remains. An unlabelled
`Divider` first rendered as two segments with a hole in the middle. The fix is to
move the breathing room onto a padded slot around the optional node and set the
parent's `itemSpacing` to 0, so the neighbours sit flush when it disappears. Any
component with an optional middle element has this trap.

**A component property's default overrides every variant's own value.** Wiring
`componentPropertyReferences` on a node hands control of that node to the
property, and the property has exactly one default for the whole set — not one
per variant. `Thumbnail` shipped its Photo variants reading "PDF" for this
reason. If a value should follow the variant, it must not also be a property;
if it must be editable, the default has to be the one that is correct everywhere.

**Figma allows one stroke colour per node.** A `Card` with a coloured left edge
cannot also carry its 1px line border through the stroke, because setting
per-side weights applies one paint to all of them. The edge is drawn as an
absolutely-positioned 3px rectangle with `constraints.vertical = STRETCH`,
clipped by the card's corner radius, leaving the border free to stay `line`.

## Spacing scale

Padding and gap were raw numbers everywhere through Action and the first pass of
Content — a documented convention on the Spacing & Radius page, but nothing
bound to it. Fixed: 16 `space/*` variables (0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 12,
14, 16, 18, 20 — every discrete value actually found inside a component, not
the doc scaffolding around it) plus `overlap/sm|md|lg` for AvatarGroup's
negative stacking margin and `overlap/border` for ButtonGroup's −1px attached-
border collapse. Live on the Spacing & Radius page under **Spacing
(variables)**, in the `semantic` collection, scope `GAP`. `space/14` and
`overlap/border` were added in a second pass once Action's Button and
ButtonGroup turned up values the Content-only scale didn't cover — the scale
grows from what's actually used, not from guessing ahead.

Rebound, category-complete: every Content component (`Divider`, `Token`, `Kbd`,
`Code`, `Thumbnail`, `Blockquote`, `CodeBlock`, `Markdown`, `Card`,
`AvatarGroup`) and every Action component (`Button`, `IconButton`,
`ButtonGroup`, `ToggleButton`, `ToggleButtonGroup`, `SegmentedControl`, `Link`,
`MenuItem`, `DropdownMenu`, `MoreMenu`, `Toolbar`) — every component-internal
padding and gap whose value matched the scale, with nothing left unmatched.
`Icon` was checked and needs nothing: the 32 icon components have no
auto-layout, so there's no padding or gap to bind — confirmed, not skipped.

**Not** rebound, by design: the `doc — header` / `in use` / `doc — notes`
scaffolding on every page. That matches the pre-existing `Text`/`Heading`
convention of raw numbers for documentation frames — the scale covers what
ships, not the pages that describe it.

The rebind script discovers its target generically — it walks every
`COMPONENT`/`COMPONENT_SET` that's a direct child of the page, so it doesn't
need a hardcoded node ID and works unchanged on a page with one component
(`Toolbar`) or three (`DropdownMenu`'s `MenuItem` + `DropdownMenu` +
`MoreMenu`). Same script reaches Data Input and every category after it.

## Known gaps

- `SegmentedControl` sm is 26px — the scale has 32 / 40 / 44 and nothing at 26,
  so it is a raw value. Needs a token or should inherit `control/sm`.
- `Link`'s inline underline is `decoration-brand-200` in code — lighter than the
  text. Figma cannot colour an underline separately.
- The MVP's sidebar is a dark surface with an amber logo mark. Neither exists in
  the token set; resolve before building an app shell.
- **`Avatar` initials have no text style.** The scale needs 10 / 11 / 13px bold
  and the `ui/*` ramp has nothing below 11.5, so the three sizes set Manrope Bold
  directly. Either add three styles or accept the exception.
- **`Markdown` exposes no properties.** It is a type frame demonstrating the
  rhythm of a rendered document, so its content is fixed. Treat it as a specimen
  rather than something to instantiate.

## Fixed this pass

- **`AvatarGroup` clipped initials at Sm and Md.** A flat `-ml-[8px]` overlap —
  in the code (`AvatarGroup.tsx`) as well as the Figma port — covered a third of
  a 24px circle, cutting the second letter of the next avatar's initials. Fixed
  in both: overlap now scales with the circle (`sm -4 · md -6 · lg -8`, bound to
  `overlap/sm|md|lg`), verified at 8× zoom with no clipped strokes.
- **Action and Icon had zero spacing bindings.** Ran the same rebind across all
  10 Action components plus Icon. Found two values the Content-only scale
  hadn't needed yet (`14`, `-1`), added `space/14` and `overlap/border` to
  cover them, then closed the loop — every page now reports zero unmatched
  values. Screenshotted `Button` (150 bindings, the largest single page) and
  `DropdownMenu` (three separate component sets on one page) after the rebind;
  both pixel-identical to before.

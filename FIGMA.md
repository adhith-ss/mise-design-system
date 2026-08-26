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

## Known gaps

- `SegmentedControl` sm is 26px — the scale has 32 / 40 / 44 and nothing at 26,
  so it is a raw value. Needs a token or should inherit `control/sm`.
- `Link`'s inline underline is `decoration-brand-200` in code — lighter than the
  text. Figma cannot colour an underline separately.
- The MVP's sidebar is a dark surface with an amber logo mark. Neither exists in
  the token set; resolve before building an app shell.
- **No spacing scale exists as variables.** Padding and gap are raw numbers in
  every component on both sides of the line. The values are consistent and
  documented on the Spacing & Radius page, but nothing enforces them, so a
  spacing change is a manual sweep rather than a token edit.
- **`Avatar` initials have no text style.** The scale needs 10 / 11 / 13px bold
  and the `ui/*` ramp has nothing below 11.5, so the three sizes set Manrope Bold
  directly. Either add three styles or accept the exception.
- **`AvatarGroup` clips initials at Sm and Md.** The −8px overlap comes straight
  from the code, and at 24px and 30px it covers the second initial of the avatar
  beneath. Correct against the implementation, wrong-looking in a library that
  shows initials rather than photographs. Decide which one moves.
- **`Markdown` exposes no properties.** It is a type frame demonstrating the
  rhythm of a rendered document, so its content is fixed. Treat it as a specimen
  rather than something to instantiate.

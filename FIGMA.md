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
| Data Input | Field, TextInput, TextArea, NumberInput, CheckboxInput, Switch, RadioList, Slider, DateInput, FileInput, Selector, MultiSelector, Typeahead |
| Feedback & Status | StatusDot, Spinner, Skeleton, Badge, Banner, Toast, ProgressBar, EmptyState |
| Navigation | TopNav, SideNav, TabList, Breadcrumbs, Pagination, Stepper, Outline |

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

### Data Input — variant counts

| Component | Variants | Axes | Extra properties |
| --- | --- | --- | --- |
| Field | 4 | State | label, hint, error, Required |
| TextInput | 8 | Face × State | — |
| TextArea | 3 | State | value |
| NumberInput | 4 | State | — |
| CheckboxInput | 6 | State | label |
| Switch | 4 | State | label, hint |
| RadioList | 2 | Appearance | — |
| Slider | 3 | State | — |
| DateInput | 2 | Mode | — |
| FileInput | 2 | State | — |
| Selector | 4 | State | — |
| MultiSelector | 2 | State | — |
| Typeahead | 2 | State | — |

Every padding and gap here is bound to `space/*` as it's built — Data Input is
the first category with no separate rebind pass, and one new token
(`space/24`, FileInput's drop-zone padding) joined the scale along the way.

Several of these components — TextInput's Face, NumberInput's AtMinimum,
Selector's per-state sample text — carry **no** shared text property even
though the trap below would allow one, because each variant's content is
supposed to differ (a data-face sample vs a UI-face one, a "0" at the floor
vs a "10" elsewhere). Static per-variant text, no property, matches the same
rule as Thumbnail's fix.

### Feedback & Status — variant counts

| Component | Variants | Axes | Extra properties |
| --- | --- | --- | --- |
| StatusDot | 5 | Tone | — |
| Spinner | 4 | Variant | — |
| Skeleton | 3 | Shape | — |
| Badge | 15 | Tone × Appearance | — |
| Banner | 4 | Tone | — |
| Toast | 3 | Tone | — |
| ProgressBar | 3 | Variant | — |
| EmptyState | 4 | Kind | — |

Zero shared text properties in this category — every variant's label, title,
or body is distinct by design (StatusDot's five different status sentences,
Badge's five different state words), so wiring a property would have
overwritten every one of them with a single default. Caught this on
StatusDot's first build (all five tones briefly read "Connected") and skipped
the property from the start on everything after.

### Navigation — variant counts

| Component | Variants | Axes |
| --- | --- | --- |
| TopNav | — | plain `COMPONENT`, no axis |
| SideNav | 2 | State (Expanded, Collapsed) |
| TabList | 2 | Appearance (Underline, Enclosed) |
| Breadcrumbs | 2 | State (Default, Collapsed) |
| Pagination | 2 | Variant (WithPageSize, WithoutPageSize) |
| Stepper | 2 | Orientation |
| Outline | — | plain `COMPONENT`, no axis |

TopNav and Outline don't vary — a nav bar and an in-page contents list don't
have a meaningful second state worth documenting side by side, so each is a
plain `COMPONENT`, not a `COMPONENT_SET`, matching `DropdownMenu`'s own
precedent (its main panel is a bare `COMPONENT`; `MenuItem` and `MoreMenu`,
which do vary, are sets). Both were built as one-child `COMPONENT_SET`s first;
Figma flagged that as **"component set has existing errors"** the moment
`variantGroupProperties` was read on it — a single-variant set with no
differentiating property is invalid state, not just an unusual one. Fixed by
moving the child out to the page as a top-level `COMPONENT` and letting Figma
auto-delete the now-empty set — the correct construction is to know before
building whether a component has an axis, and skip `combineAsVariants`
entirely when it doesn't.

## Traps worth knowing before building the next category

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

**`resize()` silently resets sizing back to FIXED — even on a node you already
built with auto-layout.** `FileInput`'s drop zone and `MultiSelector`'s open
dropdown were both created as auto-layout frames, then `resize(w, 10)` was
called to lock in a placeholder width — which also flips *both* axes to
`FIXED`. Nothing errors; the frame just quietly stops hugging its content, so
padding appears to do nothing and multi-line content gets clipped to whatever
height the placeholder happened to be. The fix is always the same:
`layoutSizingVertical = 'HUG'` after the `resize()` call, not instead of it.
Screenshot every component that calls `resize()` on anything but a leaf node.

**A top-level component's own width is `counterAxisSizingMode`, not
`layoutSizingHorizontal`.** `layoutSizingHorizontal` (`'FIXED'|'HUG'|'FILL'`)
describes a node *as a child of an auto-layout parent* — it does nothing
useful on the component itself, which is never anyone's child. `Typeahead`'s
Open variant stayed stuck at Figma's default 100×100 frame size because
setting `layoutMode` alone doesn't touch the axis sizing modes left over from
that default; the fix is `counterAxisSizingMode = 'AUTO'` (and
`primaryAxisSizingMode = 'AUTO'` for the other axis) on the component itself.
Same two-enum confusion the `figma-use` skill already warns about (Rule 12b),
just showing up one level higher — on the root, not a child.

**Which axis is "primary" flips with `layoutMode`, and mixing them up produces
exactly the same symptom as forgetting sizing entirely.** For a `HORIZONTAL`
frame, `primaryAxisSizingMode` is width and `counterAxisSizingMode` is height.
For `VERTICAL`, it's the other way round — primary is height, counter is
width. `EmptyState`'s cards were built as `VERTICAL` frames; setting
`counterAxisSizingMode = 'AUTO'` on them made the *width* hug (each card a
different width, matching whichever line of text happened to be longest) while
height stayed frozen at the `resize()` placeholder — every card 10px tall,
title and body spilling out underneath into the next row. The fix isn't a new
rule, it's reading the one that exists correctly: check `layoutMode` before
choosing which axis to touch, every time — the direction items stack in is
always the primary axis, regardless of which one intuition calls "the height."

**A shared component property silently overrides an `INSTANCE`'s override too
if you forget to set it.** `EmptyState`'s Button instances all read "Send
order" — Button's own default — because creating an instance from a variant
doesn't inherit any *other* instance's override; each one starts at the
component's stored default until told otherwise with `instance.setProperties()`.
Reusing another category's component (`Button`, `Avatar`, anything with its
own TEXT property) means explicitly overriding that property on every
instance, not just trusting the variant you picked in.

**`FILL` divides space evenly across every `FILL` sibling — it does not give
each one "at least its content width."** `Stepper`'s horizontal variant put
all three steps at `layoutSizingHorizontal = 'FILL'` inside a 600px frame;
Figma split that three ways (~184px each) regardless of whether "Delivery
windows" plus its icon actually fit in 184px, and the steps overlapped.
`FILL` is for children that should share leftover space after fixed-size
siblings are accounted for (`Pagination`'s spacer, pushing Previous/Next to
the far edge) — not for children whose natural size varies and must stay
intact. When siblings need to keep their own width, use `HUG` and let the
parent's `itemSpacing` do the separating.

**A token named after a design-system "step" is not the same as its pixel
value, and code comments using the design system's own shorthand will fool
you.** `space/1` in this file's scale is literally 1px. Tailwind's `gap-1`
(what the original `TopNav.tsx` uses) is 4px — Tailwind's spacing scale
multiplies its step number by 4px, it isn't a raw pixel count. Binding
`itemSpacing` to `space/1` while reading `gap-1` in the source produced a
1px gap where 4px was meant, and the four nav items ran together with no
visible space at all. When porting a Tailwind arbitrary class, convert the
*value*, never the number in the class name.

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

# The Figma library

`https://www.figma.com/design/OYSStcuycsv9G63w7TC1uc/Mise_DLS`

Built from this repo. Values come from `tokens.css`, geometry from Lucide,
component behaviour from `storybook/src/components`.

## ✅ The Geist → General Sans swap is done

`data/*` text styles now point at General Sans Light, done by hand in the
Figma client on 2026-08-27 and verified by screenshot (Table, Timestamp —
numbers and dates render correctly, no fallback tofu, no layout shift).

**This closed one door: any `data/*`-styled TEXT node can no longer be edited
or created through `use_figma` scripts.** `loadFontAsync({family:'General
Sans', ...})` throws — that tooling context only sees Figma-hosted families,
General Sans isn't one — so `.characters =`, `setTextStyleIdAsync`, and any
new text node built with a `data/*` style all fail with "Cannot write to node
with unloaded font." Hit repeatedly during the 27-issue review pass (Slider's
"of 100" suffix, Pagination's page/count text, DateInput's Missing-state
value). The workaround, every time: don't touch the `data/*` node. Add a
**second, sibling TEXT node** in a loadable font (Manrope, matching size and
colour) carrying the new characters, positioned right next to or in place of
the untouchable one — two text nodes reading as one string. This is now the
permanent shape of "add data-styled text" for the rest of this file's life;
building a brand-new data-styled component from scratch still works fine
(Geist can be swapped in low-effort at the end, as before), it's only
*editing an already-swapped* node that's closed off.

<details>
<summary>Why they were wrong on purpose (Geist-first build history)</summary>

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

</details>

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
| Overlay | Tooltip, Popover, HoverCard, Dialog, AlertDialog, CommandPalette, Lightbox |
| Table & List | Table, List, MetadataList, TreeList, OverflowList |
| Chat & Agent | Citation, Message, ToolCallCard, InlineApproval, AgentStatus, SuggestionChips, Composer, AgentError |

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

### Overlay — variant counts

| Component | Variants | Axes |
| --- | --- | --- |
| Tooltip | 2 | Placement (Top, Bottom) |
| Popover | — | plain `COMPONENT` |
| HoverCard | — | plain `COMPONENT` |
| Dialog | 3 | Size (Sm, Md, Lg) |
| AlertDialog | 2 | Tone (Default, Danger) |
| CommandPalette | — | plain `COMPONENT` |
| Lightbox | — | plain `COMPONENT` |

Four of seven are plain `COMPONENT`s — applied the Navigation lesson from the
start this time, so none of them round-tripped through a one-child
`COMPONENT_SET` first. No new sizing traps this category; every bug (once
Popover's leftover single-variant wrap was caught early and fixed the same
way as `TopNav`/`Outline`) was content, not layout.

### Table & List — variant counts

| Component | Variants | Axes |
| --- | --- | --- |
| Table | 2 | Density (Default, Compact) |
| List | 2 | Density (Default, Compact) |
| MetadataList | 2 | Layout (Stacked, Inline) |
| TreeList | — | plain `COMPONENT` |
| OverflowList | 2 | Behaviour (Expandable, CountOnly) |

Every real bug this category was found by screenshot and deferred to a single
fix pass at the end, per the reviewing instruction that shaped this category —
four fixes, three real, one false alarm:

- **Table's card was 12px too narrow** for its own five columns plus padding
  (280+160+90+90+90 + 2×14 ≠ 720), clipping the Delta column at the right
  edge. Widened to 750.
- **Table's Compact variant looked identical to Default at thumbnail scale**
  — turned out not to be a bug at all; the row heights were correctly 36 vs
  44, an 8px difference just doesn't read at the zoom level a quick screenshot
  renders at. Worth remembering before spending a fix cycle on what a closer
  look would show is already correct.
- **List's leading icon ended up inside the text column, stacked below the
  title instead of beside it** — a leftover fragment from mid-edit code
  (`textCol.appendChild(icon)` followed immediately by re-appending `textCol`
  itself) that moved the icon to the wrong parent without erroring. Fixed by
  reading the actual node tree back after the fact rather than trusting what
  the build script intended to do.
- **MetadataList clipped its Stacked entries and truncated Inline's values.**
  Two independent causes bundled into one visual symptom: the inner `cols`
  wrapper frame was built with plain `layoutMode = 'HORIZONTAL'` and never
  told to hug its height (the same "manual `layoutMode` assignment keeps
  Figma's 100×100 default until told otherwise" trap as `Spinner`'s Inverse
  variant), and separately the component was simply too narrow (360px) for
  two inline label/value columns with 90px fixed labels to fit real content.

### Chat & Agent — variant counts

| Component | Variants | Axes |
| --- | --- | --- |
| Citation | 2 | Confidence |
| Message | 3 | Role |
| ToolCallCard | 4 | Status |
| InlineApproval | 3 | State |
| AgentStatus | 3 | State |
| SuggestionChips | 2 | Variant |
| Composer | 2 | State |
| AgentError | 4 | Kind |

The category most exposed to the FILL-on-TEXT trap, since every component here
is a paragraph of prose in a fixed-width card rather than a short label — used
the `fixedText`/`resolvedText` helper (`resize()` to the parent's real inner
width → `layoutSizingHorizontal = 'FIXED'` → `textAutoResize = 'HEIGHT'`) from
the start on every component built after `Message`, rather than reaching for
`FILL` and finding out the hard way each time.

- **`Citation`'s confidence chip was pinned at 1px wide.** `resize(1, 10)` set
  a placeholder, then only `counterAxisSizingMode = 'AUTO'` was set (hugging
  height, since the chip is a `HORIZONTAL` frame) — `primaryAxisSizingMode`
  (width) was left at the `resize()` value and never told to hug. Same family
  of bug as the `resize()`-resets-sizing trap below, just on the axis that's
  easy to forget once you've already remembered the other one.
- **`Message` rendered as a single vertical column of individual letters, full
  height of the page (640×1183).** Exactly the FILL-on-TEXT trap below, in its
  original, page-breaking form — this is the component that got it documented.
- **`ToolCallCard`'s tool name and summary ran together with no gap.**
  `itemSpacing` was bound to `space/11`, which does not exist in the token
  scale — `setBoundVariable` no-ops silently on a missing variable rather than
  throwing, so the frame's `itemSpacing` stayed at its unset default of 0.
  Fixed by rebinding to the existing `space/10` rather than adding a
  speculative new token for one gap.

### Chat & Agent — AgentError content notes

Four `Kind` variants (`network`, `permission`, `timeout`, `refusal`), each with
its own title/body pair and a primary/secondary action row — content
deliberately never names a provider, never shows a stack trace, and never
offers to auto-retry a write (a queued credit request or payment), only a read
like "Try again" on a fetch or "Continue from invoice 9" on a paused read-only
scan. `Timeout` is the one variant with a third line (`completed`) reporting
partial progress before the ask; the other three kinds have nothing finished
to report, so the property is conditionally rendered rather than always
present with an empty string.

## Traps worth knowing before building the next category

**`layoutSizingHorizontal = 'FILL'` on a `TEXT` node does nothing while
`textAutoResize` is still the default `WIDTH_AND_HEIGHT` — the box collapses
to near-zero width and every character wraps onto its own line.** `Message`'s
agent and user turns rendered as a single vertical column of individual
letters, full height of the page, because the pre-flight checklist's own
warning about this ("NOT `FILL` alone... collapsing the node to a near-zero-
width thread") got skipped in the moment. The fix that actually worked:
**don't use `FILL` for wrapping text at all** — `resize()` the node to the
parent's real inner width (parent width minus its own padding), set
`layoutSizingHorizontal = 'FIXED'`, then `textAutoResize = 'HEIGHT'`. Toggling
`FILL` off and back on to force a relayout was tried first and did not fix
it — this is a case where the reliable path is avoiding the property that
usually works elsewhere in this file, not fighting it into behaving.

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
bound to it. Fixed: 18 `space/*` variables (0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 12,
14, 16, 18, 20, 24, 32 — every discrete value actually found inside a
component, not the doc scaffolding around it) plus `overlap/sm|md|lg` (`sm`
corrected to `-5` in the 27-issue review pass — the fixed 2px ring border eats
proportionally more space at 24px than at md/lg, so `-4` read looser than the
larger sizes) for AvatarGroup's negative stacking margin and `overlap/border` for ButtonGroup's
−1px attached-border collapse. Live on the Spacing & Radius page under
**Spacing (variables)**, in the `semantic` collection, scope `GAP`. `space/24`
joined for FileInput's drop-zone padding, `space/32` for TreeList's depth-1
indent — same story each time: build first, add the token the moment a real
value needs it, never speculatively. `space/14` and `overlap/border` were
added in a second pass once Action's Button and
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

## 27-issue Storybook review pass (2026-08-27)

A full visual review of the deployed Storybook surfaced 27 issues across
Content, Action, Data Input, Feedback & Status, and Navigation. Every one was
fixed in the React components first (verified in the Storybook dev server,
`tsc --noEmit` and `storybook build` both clean), then mirrored into this
file so the two never drift. `overlap/sm` itself changed value — `-4` → `-5`
— rather than picking up a new token, since the ring border eating
proportional space at 24px was a genuine measurement correction, not a new
value to bind.

**New Icon-page components**, added because the fix genuinely needed them and
nothing in the existing 32 was close enough: `icon/info` (Banner/Toast's
info tone — no reasonable substitute existed) and `icon/circle` (Toast's
neutral tone, matching code's bare `Circle` glyph). Everywhere else, an
existing icon was reused as the closest available stand-in rather than
growing the sheet further — e.g. `chart-column` for "Orders", `database` for
"Vendors", `arrow-up-right` for "Shipped" on Badge. The 32-icon sheet is
still an asset sheet, not a full Lucide mirror; it grows only when a fix
truly has no fit, the same rule the `space/*` scale already follows.

**Streak border.** Card's "needs attention" edge and Banner's tone edge both
moved from a flat coloured strip to a rotating CSS conic-gradient border in
code (`.mise-streak-border`, documented in `tailwind.css`). Figma has no
motion — the static proxy here is a **full-perimeter 1–1.5px stroke in the
tone colour**, which is what the rotating arc visits over one full cycle.
Not literal frame-matching, a reasonable "what would you see if you averaged
every frame" substitute.

**New variants added, not just re-skinned** (several code fixes revealed
Figma components that had never been given the state the fix needed):
- `CheckboxInput` — `State=Required` (was missing entirely)
- `DateInput` — went from `Mode` as the only axis to `Mode × State`, adding
  `State=Invalid` and `State=Missing`; existing variants were renamed to
  `State=Default` to keep every variant on the same two axes (Figma throws
  "component set has existing errors" the moment variants don't share axes)
- `MultiSelector` — `State=Invalid` (was missing)
- `FileInput` — `State=Disabled` (was missing; only Default/DragOver existed)
- `ProgressBar` — `Variant=Complete` (Determinate only ever showed partial
  progress; cloned and set to N of N, plus a leading check icon)
- `Pagination` — `Variant=SinglePage` (Prev/Next hidden, "Page 1 of 1")
- `Badge` — no new variant axis (an icon+count combination would explode 15
  variants into 30 for one demonstration); added as a standalone instance in
  the "in use" row instead, matching how one-off states have been shown
  elsewhere in this file when a full axis isn't warranted

**SideNav's icon slots were empty in both Expanded and Collapsed** — not a
first-letter fallback like the code, just blank rounded chips with zero
children, in *every* item, in *every* state. The reported bug (collapsed
needs real icons) was really surfacing a gap that existed everywhere;
fixed both states in one pass rather than leaving Expanded looking
inconsistent with a freshly-icon'd Collapsed. Added a 20px logo-mark square
to both states too — this component never had a header slot at all.

**Stepper never drew a connector, in either orientation** — the code's
"trailing line after each step" turned out not to exist in Figma at all, so
"move the dash from after to before" became "add the dash." Horizontal reused
a `flex-1` gap sibling as in code; vertical needed absolute-ish manual
positioning instead (`layoutMode = 'NONE'`, explicit x/y per row) since a
fixed-height rectangle inside an unconstrained auto-layout column doesn't
have anything to size against.

**TopNav's icons landed with zero gap to their labels** — inserting a new
first child into a row whose `itemSpacing` had never been set (because it
only ever had one child before) doesn't create spacing from nothing; had to
explicitly `setBoundVariable('itemSpacing', space/7)` on every row after
inserting. The same trap as ToolCallCard's `space/11` miss, different cause:
that one was a wrong token name, this one was a spacing property that was
simply never set because the row never needed it before.

## Four follow-up fixes (2026-08-27, same day)

A second, smaller round after the 27-issue pass — code fixed and verified
first, then mirrored here as before.

- **`DateInput`'s Missing state now shows "DD/MM/YYYY" inside the bar.** In
  code this needed an absolutely-positioned overlay plus `text-transparent`
  on the real `<input type="date">`, since browsers ignore the `placeholder`
  attribute on date inputs and render their own locale format instead. In
  Figma, the `value` text is already `data/*`-styled (unloadable per the
  General Sans trap above) — hid it (`visible = false`) rather than editing
  it, and added a sibling Manrope text reading "DD/MM/YYYY" at the same
  position instead of trying to touch the frozen node.
- **`Card`'s needs-attention icon moved from after the body to before the
  title**, in the header row next to `titles`. Fixing this in code surfaced a
  real bug: the header row only rendered when `title || action` was truthy,
  so a title-less needs-attention card would have silently dropped the icon
  with nowhere to put it — fixed by adding `needsAttention` to that
  condition too. The Figma side just needed the existing icon instance moved
  from `body` into `header`, inserted before `titles`, with `itemSpacing`
  set on `header` (it had none — a 2-child row that never needed a gap
  before the icon existed).
- **`Toast`'s Danger description is `text-danger`**, not the shared
  `text-ink-500` every other tone description used — a one-line fill swap on
  both sides.
- **`Stepper`'s connector was already fixed-length in Figma** (24px
  horizontal, 14px vertical, from the earlier pass's positioning fix) — code
  was the one still using `flex-1` for the horizontal connector, which
  stretched proportionally to each step's own leftover width, so steps with
  longer labels got visibly longer dashes. Fixed code to match Figma's
  already-even fixed width rather than the other way round — the one case
  in this project so far where the Figma side led and code caught up.

## 12-issue review pass: Command Palette, Overlay/Table font audit, Chat & Agent (2026-08-27)

### The General Sans trap has a workaround after all

Every prior note said the swapped `data/*` styles are frozen — can't edit
`.characters` on an already-styled node. Still true. But this pass found the
actual boundary is narrower than that made it sound:

- **Editing an existing General-Sans-styled node's text → still blocked.**
- **Restyling an existing node that's currently in a *loadable* font (e.g.
  still Manrope) to a `data/*` style → works fine.** `node.setTextStyleIdAsync(dataStyleId)`
  succeeds with no `loadFontAsync` call at all, as long as the node isn't
  already sitting in the unloadable font when you call it.
- **Creating brand-new data-styled text from scratch → works, in the right
  order.** `figma.createText()` → set `fontName` to a loadable font (e.g.
  Manrope) → set `.characters` → *then* `setTextStyleIdAsync(dataStyleId)`.
  Setting the style before the characters is what fails; setting it after
  works every time.

This meant most of the "verify General Sans" fixes in this pass were a
straight `setTextStyleIdAsync` call on existing Manrope nodes that had
drifted from convention — not sibling-node surgery. The sibling-node
workaround from the last pass is still correct for the one case that's
genuinely closed: changing what an *already data-styled* node says.

### Font audit findings (items 1, 3, 6, 8 — no code changes, all Figma)

Scanned every TEXT node across Command Palette, the whole Overlay category,
the whole Table & List category, `AgentError`, and `Citation` for font
family. `Citation` and `AgentError`'s reportId (once added — see below) were
already correct or fixed on the spot. Three real gaps, all fixed by
restyling in place:

- **Command Palette** — none of its secondary text was General Sans: the
  `esc` kbd hint, `RECORDS`/`ACTIONS` group headers, each result's `meta`
  text ("vendor", "invoice · 2 variances", "order · draft"), the action
  row's `⏎` hint, and the footer's `↑↓ navigate` / `⏎ open` / `⌘K toggle`
  were all sitting in Manrope. Restyled all nine to `data/11.5` or
  `data/12`, matching each one's `font-data` counterpart in code.
- **`MetadataList`** — the actual data values (`INV-20841`, `PO-4462`,
  `Aug 22, 2026`, `14 · 12 matched`) were Manrope Medium/Regular instead of
  General Sans, while `Vendor: Harbor Produce Co.` (correctly *not*
  `data: true` in code) was already fine left alone. Restyled the four
  data-eligible values (×2 instances) to `data/13`.
- **`AgentError`** had no `reportId` demoed at all — none of the four `Kind`
  variants rendered one, even though the code story for `Refusal` sets
  `reportId: 'ref 8f21c4'`. Added it as new data-styled text (via the
  set-characters-then-style order above) to `Kind=Refusal`.

**One real gap the audit couldn't close via tooling:** `OverflowList`'s
Count-only "+3" needs to be both bold *and* General Sans (item 4). General
Sans has no loadable Bold face in this tooling context — same restriction
that blocks the Light face's characters, just on a different weight of the
same family. Left it in Manrope Bold + brand-600 for now (achievable, and
visually close since the deployed Storybook build doesn't even load General
Sans as a webfont — `--mise-font-data` falls back to `ui-monospace,
monospace` for anyone without it installed locally). **Follow-up needed by
hand:** swap this one node to General Sans Bold in the Figma client once
that face is confirmed to exist as a real installed font, the same way the
original Geist→General Sans Light swap was done.

### Components that had never been built with the state a fix needed

The recurring shape of this whole project: a requested fix reveals a state
that was demoed nowhere in Figma, not a state that regressed. This pass hit
it five more times:

- **`Table` had no selectable state at all** — zero checkboxes anywhere in
  either density variant. Added `Selectable=Partial` (new axis, existing two
  variants renamed to `Selectable=None` to match), with a real indeterminate
  header checkbox (brand-600 fill, white dash) and two of three rows
  checked. Widening the row by the new 40px checkbox column clipped the
  rightmost `Delta` column at first — each row frame had a fixed pixel
  width, and inserting a child doesn't grow a fixed-width frame. Resized
  every row (and the variant, and the component set) by the exact column
  width added.
- **`AgentStatus` had no compact+working state** — `Waiting` and `Idle` were
  already built as compact pills (matching their code stories, which always
  pass `compact: true`), but `Working` only existed as the full step list.
  Cloned `Waiting`'s compact shell, swapped in a brand-600 dot and the
  working copy, and gave it a full brand-coloured stroke (the same static
  full-perimeter proxy used for Card/Banner's streak border, since this
  pill has the same "should visually pulse" requirement CSS can't show
  statically here).
- **`Message` had no Error state** — only the `Role` axis (User/Agent/
  System) existed. Added `Role=Agent, State=Error` (existing three renamed
  to `State=Default`): pink `tone-danger-bg` bubble, no border, single line
  of copy, citation and footer stripped since the error story doesn't carry
  either.
- **`ToolCallCard` had no Write state** — `Status` was the only axis. Added
  `Status=Done, Writes=True` (existing four renamed to `Writes=False`),
  swapping in the write example's own tool name and summary. Tripped over a
  script bug here, not a Figma trap: `summary.visible = false` inside the
  same script that immediately re-queried and inserted a sibling silently
  didn't stick (returned `done: true` with no error, but a follow-up
  `findAll` showed the old node still `visible: true`) — fixed by re-running
  the hide as its own isolated call afterward. Worth remembering: a
  same-script property write that reports success isn't proof it landed;
  re-read the node if the visual doesn't match what the script claims it did.
- **`Composer`'s plus button had never had its "+" drawn** — the attach
  button was an empty 30×30 frame with zero children in every prior
  screenshot, easy to miss because the outline and spacing looked complete.
  Reordering it before the scope pill (the actual ask) meant touching this
  frame anyway, so drew the missing glyph in the same pass rather than
  leaving a blank box one token now sits in front of.

### Everything else in this pass

- **`Dialog`'s close button** — removed the `bg-surface-sunken` box fill
  from all three size variants, leaving the `×` as a plain glyph. No new
  variant needed.
- **`InlineApproval`'s unresolved state** (`Pending` — the single Figma
  variant standing in for code's Pending/Permanent/NeedsAnotherRole, which
  all render the same branch) — dropped the 3px left border for a full
  brand-600 stroke (streak proxy, not tone-matched like Card/Banner since
  the request was explicitly for brand colour here). `Declined`'s dot
  swapped from `ink/400` grey to `danger/DEFAULT` red.

## AgentError: left border + hover-only primary button (2026-08-27)

All four `Kind` variants share one component, so this landed in a single
pass: `strokeLeftWeight` un-set back to match the other three sides (was 3,
matching `border-l-[3px]`), and each variant's primary button re-filled from
solid `brand/600` to `surface/DEFAULT` + `line/DEFAULT` border + `ink/900`
text — the same white/black-until-hover treatment Empty State's Error action
got earlier. Figma can't show the hover state itself (green + white text on
:hover), so that half is verified in Storybook only; the static file shows
the resting white/black look, consistent with how every other hover-only
Figma limitation in this project has been handled — document it, don't fake
a state Figma can't represent.

**Follow-up same day: title and body turned red** (`danger/DEFAULT`) across
all four `Kind` variants — the `completed` line (Timeout's third text node)
stayed at its original `ink/700`, matching code's scope: the request was
title and body specifically, not every line in the card.

## Accessibility sweep: ink-500, ink-400, alert/tone-warning-fg (2026-08-28)

Ran axe-core against one representative story per component (73 components)
in the deployed Storybook, then targeted deep-dives on anything flagged.
Found exactly three failing colour pairs system-wide — `ink-500` and
`ink-400` on every light surface (canvas/surface/surface-raised), and
`alert`/`tone-warning-fg` on `tone-warning-bg`, all below WCAG's 4.5:1 —
plus two structural ARIA bugs in `CommandPalette` and one nameless `<th>` in
`Table`. Full detail and the exact contrast math is in the commit for
`storybook`; here's what changed on the Figma side.

**Fixed at the primitive layer, not the semantic alias.** First attempt
called `setValueForMode` directly on `ink/500`, `ink/400`, `alert`, and
`tone/warning-fg` — which are *semantic* variables aliased to `palette/*`
primitives (`Variables: primitives (31, hidden from pickers) and semantic
(49, aliased to primitives)`, per the Structure section above). Setting a
semantic variable's value directly overwrites the alias with a raw colour,
silently breaking the primitive→semantic chain this whole file is built on.
Caught it by checking `valuesByMode` right after and seeing a raw RGB object
instead of a `VARIABLE_ALIAS`. Fixed correctly: updated `palette/ink/400`,
`palette/ink/500`, and `palette/orange/600` (the actual primitive `alert`
and `tone/warning-fg` both point to) to the new hex values, then explicitly
re-set the four semantic variables back to `{ type: 'VARIABLE_ALIAS', id:
<primitive id> }` to restore the chain. Verified afterward that
`valuesByMode` on all four semantic variables shows an alias, not a raw
colour, and screenshotted `Table` and `Banner` to confirm the darker colour
actually rippled through every bound instance rather than just the two
variables checked directly.

Because these are bound variables touched at the token layer, every
component using `ink/500`, `ink/400`, `alert`, or `tone/warning-fg`
anywhere in the file picked up the fix in one script — no per-component
edits, the same pattern as the `overlap/sm` and Geist→General Sans fixes
before it.

**Nothing to mirror for the ARIA and empty-`<th>` fixes.** `CommandPalette`'s
missing `aria-controls`/`role="listbox"` and `Table`'s nameless actions
column header are both pure DOM/screen-reader semantics with zero visual
change — Figma has no live ARIA tree or accessibility API to represent
them in. Documented here so the gap is visible, not silently skipped.

## Keyboard/focus fixes: SegmentedControl, DropdownMenu, Banner (2026-08-28)

Axe-core's automated ruleset was already clean on all 16 stories across
these three components — re-confirmed before touching anything. The
remaining issues were WAI-ARIA authoring-practice conformance gaps
(roving tabindex, arrow-key navigation, focus management on open/close,
`aria-haspopup`/`aria-expanded`) and one redundant icon label, none of
which a scanner can test since they're about *behaviour*, not markup a
static DOM snapshot can evaluate. Full detail is in the `storybook` commit.

**Nothing to mirror here either, for the same reason as CommandPalette's
fix above.** SegmentedControl's roving tabindex and arrow-key handling,
DropdownMenu's focus management and `aria-haspopup`/`aria-expanded`, and
Banner's icon going from labelled to `aria-hidden` are all runtime
DOM/keyboard behaviour with zero visual difference in any static frame —
screenshotted `Banner` and `DropdownMenu` (open state) to confirm exactly
that, pixel-identical to before. Figma has nothing to receive a mirror of
in this pass.

**Follow-up: Toast got the same fix.** The redundant-icon-label pattern
flagged in Banner above also existed in `Toast` — same `label={tone}` on
the leading icon, same double-announcement, same fix (remove the label,
icon becomes `aria-hidden`). Verified icon has no role/aria-label and no
visual change; axe-core clean. Nothing to mirror in Figma for the same
reason as Banner's own fix — this is a screen-reader-only attribute with
zero effect on any static frame.

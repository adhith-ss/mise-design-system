# The Figma library

`https://www.figma.com/design/OYSStcuycsv9G63w7TC1uc/Mise_DLS`

Built from this repo. Values come from `tokens.css`, geometry from Lucide,
component behaviour from `storybook/src/components`.

## ✅ General Sans replaced by Roboto Mono — the whole swap-by-hand problem is gone

`data/*` (amounts, counts, IDs, timestamps — anything the operator reads as a
value rather than prose) used to be General Sans, which was never loadable in
this plugin's tooling context (`loadFontAsync` threw "the font family does
not exist" — that context only sees Figma's ~1,900 hosted families, and
General Sans isn't one). The workaround for over a dozen components' worth of
history was building on Geist Light as a stand-in, then swapping to General
Sans by hand in the Figma client at the very end — documented at length in
this file's earlier revisions, preserved below for the record.

**Roboto Mono has no such problem — it's one of Figma's hosted families,
confirmed by `loadFontAsync` succeeding for Regular/Medium/Light/Bold before
any of this was built.** All 5 `data/*` styles (`11.5`, `12`, `12.5`, `13`,
`14`) were rebuilt directly on Roboto Mono Light through `use_figma`, no
Geist stand-in, no hand-swap step, and — the actual prize — **every
`data/*`-styled `TEXT` node is editable through scripts again.** The
sibling-node workaround this section used to describe (build a second TEXT
node in Manrope next to an unloadable one) is no longer needed for anything
new; existing sibling-node instances from before the swap were left as-is
rather than unwound, since they render identically either way.

**One font-swap is still pending, unrelated to this one: Satoshi, for the
`SplashWake` wordmark ("Plato").** Same root cause General Sans used to
have — not one of Figma's ~1,900 hosted families, so unloadable in this
tooling context. Built on Manrope Bold as the stand-in in Figma (see Brand &
Marketing → Splash — wake); the real Satoshi loads fine in Storybook itself
via a Fontshare `<link>`, since that's an ordinary browser, not this plugin
sandbox. Swap the Figma wordmark's font to Satoshi by hand before it ships.

<details>
<summary>General Sans → Geist-first build history (resolved, kept for the record)</summary>

### Why General Sans was built on Geist first

General Sans was installed locally and worked in the Figma client, but the
tooling that built these components couldn't load it — `loadFontAsync`
threw "the font family does not exist", because that context only sees
Figma's ~1,900 hosted families.

A text style using it could still be *applied*, and the node really did
become General Sans. But from that moment the node was frozen to tooling:

- `characters`, `fontSize`, `textCase`, `letterSpacing` all threw
- `instance.setProperties()` failed for a TEXT property on such a node
- the text style itself couldn't be edited, so uppercase and tracking
  couldn't be baked in

Building on Geist kept all of that working. The swap at the end cost one
action and lost nothing, because from then on the only people editing those
nodes were humans in Figma — where the font was available. Superseded by
the Roboto Mono replacement above, which needs none of this.

Two components carried the scars of building the other way round while
General Sans was still live, both flagged in amber on their pages:
`DropdownMenu`'s group heading has no tracking, and its shortcut text is
fixed at the component default. Worth a look now that data-styled nodes are
editable again.

</details>

## Layout normalization + annotation pass (2026-08-29)

The complaint that started this pass was accurate: only the Content category
(the 14 pages built with the most recent conventions) actually followed the
documented page template above. Every earlier category had drifted from it
in two ways —

1. **Naming drift.** Roughly 30 pages (the back half of Feedback & Status
   onward through all of Navigation, Overlay, Table & List, and Chat &
   Agent) had lost the semantic `doc — header` / `doc — notes` names
   entirely, sitting as generic `Frame`/`Frame` instead — invisible in the
   layers panel, indistinguishable from any other frame at a glance.
2. **Positioning drift.** `doc — notes` (and `in use`, where it existed) was
   placed **beside** the component set — at x=340, 440, 560, 680, 740, 977,
   1103, wherever happened to fit that page's particular width that day —
   rather than stacked below it in the single left column the template
   itself specifies. Gaps between sections ranged from 36px to 260px with
   no consistent rule.

**Fixed mechanically, not by hand, across all 71 component pages** (every
page in Action, Content, Data Input, Feedback & Status, Navigation, Overlay,
Table & List, Chat & Agent): a script per category classified each page's
top-level children by *content*, not by name — a header is a `FRAME` near
y=60 with exactly a title `TEXT` and a description `TEXT`; a notes panel is
a `FRAME` whose every child is itself a `FRAME` containing at least one
`TEXT` (the title+body card pattern); an "in use" panel is a `FRAME`
containing a real component `INSTANCE` somewhere inside it. Classified
frames were renamed to their canonical name if generic, then repositioned
into the single left column at x=40, stacked with a 60px gap below whatever
came before.

**One deliberate constraint kept this safe at this scale: the script never
touches a `COMPONENT_SET` or `COMPONENT`'s own position, ever.** Only
`doc — header`, `in use`, and `doc — notes` move. Pages like `DropdownMenu`
(three separate specimens — `MenuItem`, `DropdownMenu`, `MoreMenu` — laid
out side by side on purpose) and `SuggestionChips` (a second, intentionally
separate `WithDisabled` component off to the right) keep their deliberate
multi-specimen arrangements untouched; only the notes panel beneath them
moved. Verified: 65 component sets swept for `variantGroupProperties`
errors post-move — zero. Several pages screenshotted across categories
(DateInput, AgentError, SuggestionChips) to confirm no overlaps and correct
top-to-bottom flow.

**Not touched:** `Brand & Marketing` — it doesn't follow the four-zone
component-page template at all (it's a sequence of standalone documentation
sections: palette swatches, the Plato reference tiles, the icon-language
comparison, the Splash keyframes), and each of those sections was already
built with the same bottom-plus-gap logic by hand in the sessions that
created them.

### Annotations — the reviewer-facing marker system

The other half of this pass: "add annotations for all the components, using
any free annotation plugin." This file is built entirely through the
Plugin API — there's no path from that automation into Figma's actual
plugin-install flow, so a genuine third-party plugin (including Figma's
own free community **Annotation Kit**, the obvious choice) can't be invoked
the way the rest of the library gets built. The fix was to reproduce that
kit's own visual language — a numbered circular marker plus a linked
note — as two native components on a new **Annotations** page, which get
the same reviewer-facing result (a numbered callout naming one true, specific
thing about the component) as a first-class part of the system instead of
an external dependency this automation can't reach.

- **`annotation/marker`** — a 22px circle, `accent/600` fill (the wine
  colour, reused here for the same reason it's reused for `SplashWake`'s
  wordmark: both are meta/documentation content, never product UI, so
  borrowing the one hue already scoped that way beats inventing a third),
  white 2px ring, a bold white number driven by a `number` TEXT property.
- **`annotation/callout`** — the marker plus a short label in a pill,
  `accent/600` stroke, white fill. `label` is a TEXT property; the nested
  marker's `number` is set per instance via `instance.setProperties()` on
  the found nested `INSTANCE`, not exposed as a bubbled property on the
  callout itself — simpler, and there's never more than one marker per
  callout in practice.
- **Placement rule, identical on all 71 pages:** one callout instance,
  anchored at `(main.x, main.y − 34)` — directly above the top-left corner
  of the page's component set (or, for multi-specimen pages like
  `DropdownMenu` and `SuggestionChips`, the *first* main component only).
  Floating above rather than overlapping any part of the component itself
  means the placement rule needs no knowledge of what's inside any given
  component — it works identically whether the component is 90px or 700px
  tall, and can never visually corrupt the thing it's annotating.
- **Content, one callout per page, drawn from what this file already
  knows** — the single most specific, non-obvious true fact about that
  component, pulled from its own doc-notes cards or from a fix already
  logged elsewhere in this file (a real bug once shipped, a trap once hit,
  a measurement that matters). Not filler, and not a second copy of the
  doc-notes cards' own content — a one-line pointer a reviewer would
  otherwise have to read the whole notes panel to find.

### Measurements — a second marker, modelled on DesignDoc (2026-08-29)

A follow-up ask: use the free Figma plugin **DesignDoc [Spectral]**
(measures, annotations, handoff) to add measurement redlines. Same
constraint as the Annotation Kit request above — this file is built
entirely through the Plugin API, which has no path into installing or
running an actual Community plugin, DesignDoc included. Reproduced its
core value instead: a redline-style dimension marker showing a real,
*queried* value, not a guessed one.

- **`annotation/measure`** — a short tick–line–tick dimension (drawn as
  three `VECTOR` strokes, `accent/600`) with a bold value label above it.
  `value` is a `TEXT` component property; the line itself has no property
  binding for length (Figma properties can't drive geometry), so its visual
  span is decorative/schematic rather than a literal pixel-accurate ruler —
  the *number* is what's real, not the drawn line's exact length.
- **Every value was queried live from the file, not recalled** — for each
  page, a script read the first variant's actual `paddingLeft`/`itemSpacing`
  and, where bound, the real token name via `boundVariables`, before any
  content was written. Where a component's first variant carries no
  padding/gap worth showing (an icon-only control, a fixed-size avatar), the
  fallback was the component's own measured width×height instead of an
  invented number.
- **Placement is relative to the callout, not the component** — this is
  what today's actual bug was. The first placement rule anchored the
  measure to the component set's top-right corner independently of the
  callout's own width; on any component narrower than the callout itself
  (`Citation`'s is 135px wide, the callout closer to 260px), the measure
  landed directly on top of the callout's text. Fixed by anchoring the
  measure to the callout's own right edge instead
  (`callout.x + callout.width + 16`, vertically centred against it) — a
  rule that's correct regardless of how wide or narrow the actual
  component is, because it never references the component's geometry at
  all.
- **A second, more serious defect surfaced by the same audit: the callout
  itself was already overlapping every component's top-left corner by
  several pixels**, present since the *original* annotation pass, not
  introduced today. That pass anchored the callout at a flat `main.y − 34`
  assuming a callout height of ~34px; real callouts render at 40px
  (one line) or 56px (two), so every single one dipped 6–22px into the
  component it was meant to sit above. Invisible at a glance — a small
  overlap at the very top-left corner tip — caught only because this
  pass's overlap check tested it directly instead of eyeballing a
  screenshot. Fixed the same way as the measure: compute the callout's `y`
  from its own real, measured height (`mainTop − callout.height − 10`)
  rather than a flat guess, for all 71 pages. Every page re-verified by
  script afterward: callout-vs-main, measure-vs-main, and callout-vs-measure
  overlap all checked directly, zero found.

## AgentAvatar — Plato's 8 idle emotions, as a real component (2026-09-04)

Requested by name (naming each variant per emotion) and sourced from the
`Plato_Agent_Character` asset — the same solid-tile geometry already used
for `SplashWake` and the Brand & Marketing reference tiles, now shipped as
an actual product component: `AgentAvatar` stands in for the agent the way
`Avatar` stands in for a person, sized on the same sm/md/lg steps.

**Every emotion shares the exact same base geometry — only the animation
differs.** All 8 emotions in the source SVGs use identical `<line>`
coordinates for both eyes and the plate mouth; the visual difference comes
entirely from the CSS `@keyframes` applied to each. That's true in the real
component (8 real animations, translated directly from the source into
`tailwind.css`) and it's the reason a static Figma variant can't just freeze
each emotion's *rest frame* — every rest frame is pixel-identical, which
would make all 8 look the same in Figma.

**Fixed by computing each emotion's own characteristic pose analytically**,
the same technique proven on `SplashWake`'s mid-rotation keyframe: for each
`@keyframes` rule, apply its actual transform (rotate/scale/translate, in
the order CSS lists them, around the source's own `transform-origin`) to
the base line coordinates in Python, verify the result, then draw the
result as stroked `VECTOR` lines — never Figma's `rotation` property, which
didn't compose predictably with `resize()` last time it was tried. All 8
came out visually distinct in both Figma and the real component:
short/squinted dashes (Happy), inward-angled brows (Sad), sharp V angles
(Angry), asymmetric tilted eyes (Confused), elongated eyes with a dropped
mouth (Surprised), near-closed dot eyes (Sleepy), one open eye/one closed
plus a tilted mouth (Wink), a bounced-and-scaled pose (Excited).

**`prefers-reduced-motion` uses the same computed poses**, not just
`animation: none` — disabling animation alone would leave every emotion at
the identical shared rest frame, same problem as the Figma variants. Each
`.mise-agent-*` class gets an explicit static `transform` matching its own
characteristic pose under the reduced-motion media query.

Verified: all 8 Storybook stories (individually named) render visually
distinct, axe-core clean, `tsc --noEmit` and `storybook build` clean. Figma:
8-variant `COMPONENT_SET`, `variantGroupProperties` read clean, page placed
after `AgentError` (Chat & Agent's existing order).

**Found in passing, not touched:** the working tree had unrelated
uncommitted changes to `Message.tsx`/`ToolCallCard.tsx` (an `avatar` prop
on Message, an `icon` prop on ToolCallCard) that predate this change and
weren't made as part of it. Left as-is and excluded from this commit — not
this session's work to claim or discard.

## Structure

| Page | Contents |
| --- | --- |
| Cover, Getting Started | Entry points and the three system rules |
| Colour | 31 palette + 38 semantic swatches, every chip bound to its variable |
| Type | 11 `ui/*` and 5 `data/*` styles, with specimens |
| Spacing & Radius | Spacing bars, 6 radii, 3 control heights |
| Elevation | 3 effect styles, scrim |
| Annotations | `annotation/marker` + `annotation/callout` — the reviewer-facing marker system, one callout on every component page |
| Icon | 32 Lucide components at 24×24, stroke 1.5 |
| Action | Button, IconButton, ButtonGroup, ToggleButton, ToggleButtonGroup, SegmentedControl, Link, MenuItem, DropdownMenu, MoreMenu, Toolbar |
| Content | Heading, Text, Divider, Token, Kbd, Code, Timestamp, Avatar, AvatarGroup, Thumbnail, Blockquote, CodeBlock, Markdown, Card |
| Data Input | Field, TextInput, TextArea, NumberInput, CheckboxInput, Switch, RadioList, Slider, DateInput, FileInput, Selector, MultiSelector, Typeahead |
| Feedback & Status | StatusDot, Spinner, Skeleton, Badge, Banner, Toast, ProgressBar, EmptyState |
| Navigation | TopNav, SideNav, TabList, Breadcrumbs, Pagination, Stepper, Outline |
| Overlay | Tooltip, Popover, HoverCard, Dialog, AlertDialog, CommandPalette, Lightbox |
| Table & List | Table, List, MetadataList, TreeList, OverflowList |
| Chat & Agent | Citation, Message, ToolCallCard, InlineApproval, AgentStatus, SuggestionChips, Composer, AgentError, AgentAvatar |
| Brand & Marketing | Extended palette, accent (wine) ramp, Plato reference tiles, icon-language spec, Splash — wake keyframes |

Variables: `primitives` (31, hidden from pickers) and `semantic` (49, aliased to
primitives, WEB code syntax on every one).

`Icon` counts as Content in the code (`components/content/Icon.tsx`) but keeps
its own page here, next to the other foundations, because it is a 32-component
asset sheet rather than a documented component.

### Page template

Every component page is laid out the same way, so a reader learns the shape once — **enforced across all 71 pages** (see the layout normalization pass below), not just the Content category that originated it:

| Frame | Position | Contents |
| --- | --- | --- |
| `doc — header` | 40, 60 · w 980 | `ui/section-title` name, `ui/body` description |
| component set | 40, 300 · no fill | The variant grid |
| `in use` | 40, (component set bottom + 60) · w 760, when it exists | The component in a real ops context, with a caption |
| `doc — notes` | 40, (previous section's bottom + 60) · w 400–560 | Note cards: `ui/card-title-sm` + `ui/dense`, radius 14 |

Variants are named `Axis=Value, Axis=Value`. Editable text is a component
property named for the node it drives (`label`, `quote`, `value`). The gap
before `in use` and before `doc — notes` is always **60px from the actual
bottom edge of whatever comes before it** — a fixed rule, not a fixed
absolute Y — since component sets vary wildly in height (100px to 700px+)
and a fixed Y like the old "1320" for notes either left a huge gap or
crashed straight into taller content depending on the page.

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
| SideNav | 4 | State (Expanded, Collapsed) × Tone (Light, Dark) |
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

### Brand & Marketing — Plato

The agent's animated character (Plato, delivered as 8-emotion SVGs, solid +
"streak" tile variants) turned out to be built directly on `brand/600` — its
tile fill is the *exact* hex already in the product ramp, not a separate
marketing hue. That made the extension disciplined rather than invented:
everything on this page traces back to either brand/600 itself or an
HSL-interpolation of the existing 8-stop ramp's own curve.

New tokens (primitive + semantic pair each, `WEB` code syntax bound, same
two-tier pattern as every other colour in the file):

| Token | Hex | Source |
| --- | --- | --- |
| `brand/300` | `#A3D1B9` | Interpolated — fills the 200→500 gap |
| `brand/400` | `#54BB8B` | Interpolated — fills the 200→500 gap |
| `brand/950` | `#092519` | Extrapolated one step past 900, same curve |
| `mascot-ink` | `#171614` | Plato's line art colour on its white tile — a warm near-black (H≈40°), distinct from `ink/900`'s green-tinted near-black (H≈153°). Two different near-blacks, kept apart on purpose, same reasoning as `warn` vs `tone-warning-bg` in the Spacing section below. |
| `brand-glow/start` | `#1E6B4B` | The bright stop of Plato's breathing streak ring |
| `brand-glow/end` | `rgba(30,107,75,.24)` | The faded stop of the same ring — a direct semantic colour with alpha, no primitive twin (there's no separate hex, just brand-600 at 24%) |

Mirrored in code the same day: all six as real `--mise-*` custom properties
in `tokens.css`, and `brand-300/400/950`, `mascot-ink`, `brand-glow-{start,end}`
exposed as Tailwind utilities in `tailwind.config.ts` — same source of truth
as the product palette, not a one-off design-file hex.

**Two icon languages, kept apart on purpose.** Measuring Plato's own stroke
geometry against the product `Icon` component's Lucide-based 1.5px stroke
turned up a real, consistent difference: Plato's strokes run at ~11% of the
glyph box (16 units on a ~140-unit design canvas) against the UI icon's
~6.25% (1.5px on a 24px box) — close to double the relative weight, always
round-capped, never filled. That's what reads as "a character" rather than
"another toolbar glyph." Documented as a deliberate second icon language for
marketing/mascot-adjacent surfaces only — built two comparison pairs (a
check and a plus) redrawn in Plato's stroke language next to the real
`icon/check` and `icon/sparkles` component instances, to make the direction
concrete rather than descriptive-only. The product `Icon` component itself is
untouched; the two weights should never appear on the same screen.

**Plato's exact geometry, reproduced as bound vectors, not a pasted image.**
Both the solid (`brand/600` tile, white line art) and streak (white tile,
`mascot-ink` line art, `brand-glow` gradient ring) tiles were rebuilt from
the source SVGs' literal line coordinates (eyes at x=65/135, plate mouth
trapezoid at y=150→178) rather than imported as a flattened asset — every
stroke is a real vector bound to a real variable, consistent with how every
other component in this file is built. The streak ring is a rounded
rectangle (cornerRadius 40, 180×180) with a linear-gradient stroke rather
than a hand-authored SVG path — visually identical to the source's rounded-
rect path, far simpler to author correctly in the plugin API.

**Caption text needs an explicit fixed width to wrap inside its own
column** — same trap as always, caught immediately this time rather than
after a screenshot round-trip: a `TEXT` node's default `WIDTH_AND_HEIGHT`
auto-resize let the Plato tile captions overflow past their 200px column
into the neighbour's space until `resize(200, h)` → `layoutSizingHorizontal
= 'FIXED'` → `textAutoResize = 'HEIGHT'` was applied.

**Follow-up: an `accent` (wine) ramp, guidelines-scoped only.** The user
supplied `#6B1E3E` as a complementary colour. It turned out to be an *exact*
180° hue rotation of `brand/600` — identical saturation and lightness
(56.2%, 26.9%), not a coincidence — so the 11-stop ramp was built the same
disciplined way as the brand ramp's own 300/400/950 extension: every
`brand/*` stop rotated 180°, S/L untouched. Reviewed with the user via a
published Artifact (a hue-wheel proof plus a contrast table) before
anything was committed, per their explicit ask. Their decision on review:
**approved for Brand & Marketing guidelines only, not as an application
colour.** That changed the implementation from the earlier `brand`/
`mascot-ink`/`brand-glow` pattern in a specific way — `accent/*` exists as
Figma variables (so it can still be picked up consistently by hand) but
carries **no `WEB` code syntax binding**, and was deliberately *not* added
to `tokens.css` or `tailwind.config.ts`. No component can `bg-accent-600`
its way into product UI by accident, because there is no such class. If the
colour is ever needed in the app, that has to be a separate, deliberate
decision — this page doesn't grant it by existing.

**Follow-up: `SplashWake` — a wake-up animation, future scope only.** The
user shared a full animation package (SVG, MP4, GIF, HTML preview) for the
moment the agent opens on a *mobile* version of the application — a surface
that doesn't exist yet. Two resting dashes (a 6px gap between two 16px-tall
rounded bars — tight, reads as one thick double-bar, confirmed against the
SVG's own authored `0%` keyframe values, not guessed) rotate 90° in opposite
directions into Plato's established eyes, then the "Plato" wordmark fades in
with a `brand/600` streak sweep.

- **Built as a real, playable component** — `storybook/src/components/
  marketing/SplashWake.tsx`, under a new `Future Scope` story category kept
  last in `storySort`, clearly separated from every shipping category. A
  `Replay` control remounts it (`animation-fill-mode: forwards` doesn't
  restart on its own). Keyframes and the streak-sweep gradient live in
  `tailwind.css` as global `@keyframes`, matching the existing `mise-streak-*`
  convention — not component-scoped, since Tailwind has no per-component
  style scoping in this project.
- **Figma got 3 static keyframe cards, not a single static logo** — resting,
  ~50% (both dashes mid-rotation, computed analytically), and settled +
  wordmark — because a single frame can't communicate "this moves." Eye
  geometry is a stroked line (matching the plate's own technique) with
  endpoints computed from an interpolated centre + angle, not a rotated
  rectangle — Figma's `rotation` property did not compose predictably with
  `resize()` in this plugin context (two full rebuilds produced eyes
  overlapping or poking outside their card before switching to the
  line-endpoint math; documented as its own trap below).
- **Third typeface, Satoshi, reserved for this one wordmark** — approved by
  the user specifically as the logotype face, distinct from Manrope (UI) and
  Roboto Mono (data). Loaded via a Fontshare `<link>` in a new
  `.storybook/preview-head.html` (Storybook's supported mechanism for extra
  `<head>` content — no such file existed before). Unloadable in the Figma
  plugin context for the same reason General Sans used to be, before it was
  replaced by Roboto Mono — see the font-swap note at the top of this file.

**A rotated rectangle's `x`/`y` did not behave as expected once `rotation`
was set, then `resize()` and further `x`/`y` writes were applied on top.**
Two consecutive builds of `SplashWake`'s mid-rotation eye put one dash
overlapping the other, or one dash's stroke poking outside its card
entirely — structurally valid, no thrown error, wrong on screen both times.
The fix was to stop using `rotation` for anything but a static, already-
final angle: for an interpolated angle, compute the two endpoints of the
stroke analytically (`centre ± half-length · (cos θ, sin θ)`) and draw it as
a `VECTOR` line, exactly like every other stroked shape in this file. Same
family of lesson as the FILL-on-TEXT trap — the property that works
elsewhere in Figma (`rotation`, straightforward on a static shape) is not
the reliable path once another transform is layered on top of it in the
same script.

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
  Roboto Mono trap above) — hid it (`visible = false`) rather than editing
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

## SideNav — dark rail (2026-08-28)

Closed the oldest open item in "Known gaps": *"The MVP's sidebar is a dark
surface with an amber logo mark. Neither exists in the token set; resolve
before building an app shell."* Built as `SideNav`'s `tone="dark"` — a
persistent-chrome rail that stays dark while the rest of the product is
light, not a general dark mode.

**Two review rounds, not one — first pass wasn't close enough, and the
second pass shipped two real Figma-only bugs.**

- Round 1 built a plain reskin (dark bg, quiet counts, a single saturated
  amber square) and asked for sign-off before committing. The user replied
  with an actual MVP screenshot: a much richer composition — a bold header
  mark, a bordered workspace-switcher card with an avatar, icons beside
  every label (not just collapsed), a solid gold count badge on one item,
  and a footer status widget below a divider. The amber itself was also
  wrong — softer and far less saturated than the first guess.
- Round 2 rebuilt the palette (`--mise-rail-mark` retuned from H36°/S88%/L58%
  to H40°/S55%/L72% — same amber family, much less saturated) and extended
  `SideNav` with two new opt-in props (`showIcons`, `SideNavItem.highlightCount`)
  rather than changing the light rail's default look. `rail-current-bg`
  also changed from a translucent 14%-opacity overlay to a solid fill,
  because that's what the reference actually showed — and the first solid
  value chosen (L22) put `brand-400` at 4.48:1 against it, one hundredth
  under WCAG AA; stepped down to L20, which turned out to be numerically
  identical to `rail-border` — confirms it's a real, usable step in the
  scale, not a number invented to pass a contrast checker.

**Two Figma-only bugs, not present in the Storybook build:**

- **Every wrapper `figma.createAutoLayout()` frame defaults to an opaque
  white fill.** Six frames across the new variant (the switcher card, its
  text column, the nav column, the footer column, the status row, its text
  column) were left with that default because nothing was meant to need an
  explicit fill — they were meant to be transparent, showing the dark rail
  behind them. Instead the whole composition rendered as solid white cards
  floating on a dark background. `createAutoLayout` needs `fills = []`
  stated explicitly every time a frame is meant to be invisible; there is
  no "transparent by default" the way a plain `<div>` in code has.
- **Every icon instance defaulted to `ink/700` — a colour tuned for icons on
  a light surface — regardless of which rail they were placed on.** Icon
  components in this library don't inherit `currentColor` the way the code
  `Icon` component does (Lucide's own `stroke="currentColor"` behaviour);
  a Figma `INSTANCE` of `icon/*` keeps whatever colour its vectors were
  last painted with until told otherwise. On `rail-bg` this read as barely-
  visible dark-on-dark. Fixed by explicitly repainting every icon
  instance's vector strokes/fills to `rail/text` (or `brand/400` for the
  current item) after placing it — the same "recolour after instantiating"
  step every icon in this file needs when it lands on a non-default
  background, just newly relevant because this was the first genuinely
  dark one.

**New variables** (primitive + semantic pairs, `WEB` code syntax, same
two-tier pattern as everything else): `rail/bg` (`ink-900` reused, not a
new hex), `rail/bg-hover`, `rail/border`, `rail/text`, `rail/text-muted`,
`rail/current-bg`, `rail/avatar-bg` (`brand-800` reused), `rail/mark`,
`rail/mark-ink` (`ink-900` reused). The current-item label and footer
status dot both reuse `brand/400` directly rather than adding rail-scoped
duplicates of a colour the ramp already had.

**Component set:** added a `Tone` variant property (`Light` default,
`Dark`) alongside the existing `State` (`Expanded`/`Collapsed`) — 4
variants total. Retrofitting the two pre-existing light variants required
renaming them to include `Tone=Light` in the node name directly
(`TextStyle`-style `setFontNameAsync` doesn't exist on a plain `COMPONENT`;
a `COMPONENT_SET` derives its property definitions from parsing every
child's name, so the rename *is* the edit).

**`resize()` reset sizing yet again** — same trap as always, on the exact
call I already knew to watch for: `primaryAxisSizingMode = 'AUTO'` was set
*before* `root.resize(232, 10)` to seed a placeholder width, and `resize()`
silently flipped it back to `FIXED`. Caught immediately (`root.height`
read back as `10`, the placeholder, not the real auto-grown height) and
fixed by re-setting `AUTO` after all children were appended, not before.

### Follow-up: the light rail didn't match (same day)

Shipping the dark rail alone left the two tones reading as different
products — the light rail kept its original plain header and quiet counts
while the dark one gained a switcher card, icons, a badge, and a footer
status widget. The user caught this immediately: *"The light side nav and
dark mode look totally different."* Fixed by bringing light up to the same
composition, not by simplifying dark back down — same switcher card, same
icons-beside-every-label, same highlighted-badge pattern, same footer,
just in light tokens (`surface`, `line`, `ink/*`, `brand-600`) instead of
`rail/*`.

- **`SideNavItem.highlightCount` needed a real light-mode badge, not a
  fallback.** It shipped dark-only on the first pass, with a comment
  explaining light had "no equivalent designed yet" — that equivalent is
  now `bg-brand-600 text-white`, the same solid-pill shape as the dark
  version's `rail-mark`/`rail-mark-ink` pairing.
- **A real bug, not just a mismatch: `footer` wasn't collapse-aware, and
  `collapsed` broke it.** `header` already had `collapsedHeader` as a
  deliberate fallback ("the wordmark and location name have nowhere to go
  at 64px"). `footer` had no equivalent, so passing the same switcher-card-
  era footer (a divider, a Settings link, a two-line status block) into the
   64px collapsed rail forced full-width content into a narrow column —
  text wrapped onto 3+ lines and spilled outside the rail entirely,
  confirmed by screenshot before the fix. Added `collapsedFooter`, same
  pattern as `collapsedHeader`: falls back to rendering nothing at all when
  collapsed and not provided, rather than falling back to the broken full
  content — a two-line status widget has no safe partial version the way a
  short header sometimes does.
- **Rebuilding light `Expanded` in Figma left the new component
  ownerless.** `figma.createComponent()` was called without checking
  `figma.currentPage` first, and the current page had drifted to `Cover`
  from an earlier script in the same session — the new node was created
  there, not on `SideNav`'s page, and was never appended into the
  `COMPONENT_SET` at all. `variantGroupProperties` still returned cleanly
  because the *existing* 3 variants were untouched; the gap only surfaced
  on a full audit that explicitly listed variant names and found only 3
  where 4 were expected. Fixed by moving the node to the right page,
  appending it into the set, and repositioning all 4 variants into a clean
  non-overlapping grid. Worth checking variant *names*, not just the
  absence of a thrown error, after any script that creates a new variant.

## General Sans → Roboto Mono, system-wide (2026-08-28)

The data typeface changed for good — not another Geist-style stand-in.
`loadFontAsync` confirmed Roboto Mono Regular/Medium/Light/Bold all load in
this plugin's tooling context before anything was built on it, which is
exactly the property General Sans never had. See the top of this file for
the full account of what that unlocks.

- All 5 `data/*` styles (`11.5`–`14`) repointed from General Sans Light to
  Roboto Mono Light directly via `style.fontName = {...}` — a style-level
  property set, not `loadFontAsync` + text-node assignment, since these are
  `TextStyle` objects, not `TextNode`s. `setFontNameAsync` doesn't exist on
  `TextStyle`; the direct property assignment is the correct call once the
  font is loaded.
- **Two bugs that were structurally blocked by General Sans got fixed as a
  direct consequence, not scope creep** — both were sitting in this file's
  own "known gaps" precisely because the old font couldn't be edited:
  - `OverflowList`'s Count-only `+3` is now real `data/*`-styled Roboto
    Mono Bold, replacing the Manrope Bold + brand-600 substitute.
  - `DropdownMenu`'s `ORDER` group heading now carries its intended +8%
    tracking; its note box restyled from warning-amber to neutral, since
    the gap it flagged no longer exists. The other half of that same note
    — shortcut text "fixed at the component default" — turned out not to
    be currently visible anywhere in the file (only "Duplicate order"
    shows a shortcut, and it already correctly reads ⌘D), so nothing
    needed changing there.
- Swept every page for literal "General Sans" text and fixed all of it:
  `Cover`'s typeface credit, `Getting Started`'s type-system paragraph,
  `TextInput`'s story note, and — the biggest one — the `Type` page's
  amber "build-state notice" box, which described the now-nonexistent
  Geist-during-build limitation. Removed the box outright (auto-layout
  reflowed the page cleanly) rather than editing stale text inside a
  warning callout that no longer applies.
- Code side: `tokens.css`'s `--mise-font-data`, every doc/story/component
  comment mentioning the data typeface (18 files), and a new Google Fonts
  `<link>` in `.storybook/preview-head.html` — Roboto Mono was never
  actually loaded as a webfont even under the General Sans name, so this
  is a real fix, not just a rename; the deployed Storybook build used to
  silently fall back to `ui-monospace, monospace` for anyone without the
  font installed locally.
- Verified no layout regressions from the wider monospace characters —
  Table, NumberInput, Slider, Command Palette all screenshot-clean at
  their existing widths, no truncation.
- 65 component sets swept for `variantGroupProperties` errors after every
  change: zero.

## 12-issue review pass: Command Palette, Overlay/Table font audit, Chat & Agent (2026-08-27)

> **Historical note (added after the General Sans → Roboto Mono swap):** this
> pass and the ones below it were written while the data font was still
> General Sans, and every "trap"/"unloadable" reference in them describes
> General Sans's specific loading restriction. A later pass renamed the
> mentions to Roboto Mono for consistency, but the restriction itself did
> **not** carry over — Roboto Mono loads fine (see the top of this file).
> Read every "the Roboto Mono trap" below as "the *former* General Sans
> trap, which no longer applies."

### The Roboto Mono trap has a workaround after all

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

This meant most of the "verify Roboto Mono" fixes in this pass were a
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

- **Command Palette** — none of its secondary text was Roboto Mono: the
  `esc` kbd hint, `RECORDS`/`ACTIONS` group headers, each result's `meta`
  text ("vendor", "invoice · 2 variances", "order · draft"), the action
  row's `⏎` hint, and the footer's `↑↓ navigate` / `⏎ open` / `⌘K toggle`
  were all sitting in Manrope. Restyled all nine to `data/11.5` or
  `data/12`, matching each one's `font-data` counterpart in code.
- **`MetadataList`** — the actual data values (`INV-20841`, `PO-4462`,
  `Aug 22, 2026`, `14 · 12 matched`) were Manrope Medium/Regular instead of
  Roboto Mono, while `Vendor: Harbor Produce Co.` (correctly *not*
  `data: true` in code) was already fine left alone. Restyled the four
  data-eligible values (×2 instances) to `data/13`.
- **`AgentError`** had no `reportId` demoed at all — none of the four `Kind`
  variants rendered one, even though the code story for `Refusal` sets
  `reportId: 'ref 8f21c4'`. Added it as new data-styled text (via the
  set-characters-then-style order above) to `Kind=Refusal`.

**One real gap the audit couldn't close via tooling:** `OverflowList`'s
Count-only "+3" needs to be both bold *and* Roboto Mono (item 4). General
Sans has no loadable Bold face in this tooling context — same restriction
that blocks the Light face's characters, just on a different weight of the
same family. Left it in Manrope Bold + brand-600 for now (achievable, and
visually close since the deployed Storybook build doesn't even load General
Sans as a webfont — `--mise-font-data` falls back to `ui-monospace,
monospace` for anyone without it installed locally). **Follow-up needed by
hand:** swap this one node to Roboto Mono Bold in the Figma client once
that face is confirmed to exist as a real installed font, the same way the
original Geist→Roboto Mono Light swap was done.

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
edits, the same pattern as the `overlap/sm` and Geist→Roboto Mono fixes
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

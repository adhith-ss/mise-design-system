# Post-MVP / MVP information architecture

Storybook and Figma now share the same two-section model.

| Section | Meaning | Storybook | Figma pages |
| --- | --- | --- | --- |
| **Post-MVP** | Refresh / current (0.2.0-rc.1+) | `Post-MVP/…` first in the sidebar | `Post-MVP · …` first in the page list |
| **MVP** | Frozen pilot (0.1.0) | `MVP/…` last; archived banner | `MVP · …` last in the page list |

## Storybook

- Live primitives, Foundations, Patterns → under **Post-MVP**
- Archive under `storybook/src/archive/mvp-pilot/` → titles **MVP/…**
- Overview docs: `Post-MVP/Overview`, `MVP/Overview`

## Figma plugin (`figma-release-0.2.0-rc.1`)

1. **Reorganize pages (Post-MVP · / MVP ·)** — rename legacy `0.2.0-rc.1 /` and `MVP Pilot /` prefixes; Post-MVP first, MVP last
2. **Add Post-MVP foundation pages** — Foundations, Type and controls, Basil, Workflow artwork
3. **Move unmarked pages into MVP ·** — archives anything not already Post-MVP
4. **Add / Update Post-MVP · Patterns** — regenerates pattern specimens from Storybook specs

Canonical file: https://www.figma.com/design/OYSStcuycsv9G63w7TC1uc/Mise_DLS

## Patterns sync (APP polish)

Patterns re-aligned with mise-refresh:

- Plato subtitle → “Your virtual partner”
- NumberInput Basil steppers at 16px; spin buttons hidden
- Dialog close hit target enlarged
- DecisionApproval / DishDetailSheet use NumberInput + Reset; at-risk margin track
- ForecastScenario save reason uses unlabeled textarea (aria-label)

## Owner follow-ups

1. In Figma: run **Update Post-MVP · Patterns** from the rebuilt plugin (after installing the new `figma-release-0.2.0-rc.1` package) so specimens pick up the latest Storybook copy.
2. Publish the library when ready (not done by the plugin).
3. Chromatic will refresh Storybook nav after this branch merges.

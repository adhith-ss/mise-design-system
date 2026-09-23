# Mise DLS 0.2.0-rc.1

Release candidate for the September 2026 human-led workspace refresh. This is a versioned update to the existing Mise DLS, not a replacement library.

## Scope and release gates

- Preserve the current Figma file and Storybook 0.1.0 baseline.
- Minimum text size is 13 CSS px at the default root size, including metadata, errors, hints, chart labels and badges. Use rem bounds and a responsive upper size appropriate to each role.
- Manrope is the product typeface. Use tabular numerals for comparable values; reserve monospace for literal code.
- WCAG 2.2 Level AA is the release requirement across variants, states, themes and workflows, not an automatic claim made by this release candidate.
- Measure rendered foreground/background combinations, including hover, pressed, focus, selected, validation and overlays. Include alpha compositing; token swatches alone are insufficient.
- Basil is the product icon family, pruned to the Mise set (48 glyphs): every icon used across the app plus a small reserve for agent-first flows (Plato, sources, drafts, simulations, history, motion). Plato uses the approved full-plate image layers; a Basil glyph is never used for agent identity. No angry shaking or winking in decision flows.
- A draft is not an approval. A simulation is not a prediction. Celebrate only after a confirmed save.
- Do not remove factual limitations to make sample data or disconnected AI look live.

## Documentation contract

Each component exposes its purpose and usage, anatomy, properties, interactive examples, states, accessibility requirements and implementation guidance. This follows the documentation structure observed in [Astryx Button](https://astryx.atmeta.com/components/Button) and its [accessibility tab](https://astryx.atmeta.com/components/Button?tab=accessibility).

## Accessibility acceptance

| Check | Required evidence |
| --- | --- |
| Text | 4.5:1 for normal text; 3:1 only for qualifying large text |
| Essential non-text | 3:1 for required control boundaries, icons and state indicators |
| Focus | Visible, not fully obscured, keyboard reachable; brand border and contiguous halo |
| Target size | At least 24×24 CSS px or documented WCAG spacing exception; prefer 44×44 for touch |
| Semantics | Accessible names, associated labels/errors, valid roles, status announcements |
| Keyboard | Tab/Shift+Tab, Enter/Space, Escape and expected composite-control arrow keys |
| Resize/reflow | 200% text resize and 320 CSS px reflow; table exceptions must stay locally scrollable |
| Motion | Reduced motion and user pause respected; no meaning conveyed only by motion |
| Coverage | Both themes, all applicable component variants and interaction states |

These criteria derive from [WCAG 2.2](https://www.w3.org/TR/WCAG22/). Disabled controls have contrast exceptions; instructional text explaining their state does not.

## QA inventory

- Build and typecheck the existing library; verify the version and docs navigation.
- Audit rendered stories with axe WCAG 2.2 AA tags, computed text sizes and rendered contrast.
- Exercise light/dark theme, form focus, error recovery, keyboard navigation, component properties and motion controls.
- Inspect app Overview, Menu, Decisions, Weekly review, Forecast, Data and History at desktop, tablet and narrow widths.
- Inspect critical overlays and dense states, not only empty or resting stories.
- Negative cases: invalid scenario values, missing approval reason, disconnected AI, missing source data, disabled actions.
- Document unresolved violations and manual assistive-technology checks explicitly. Never label an untested release compliant.

## Figma status

Canonical file: [Mise_DLS](https://www.figma.com/design/OYSStcuycsv9G63w7TC1uc/Mise_DLS).

Read-only baseline captured at version `2402273576311283403`. Version-history permission failed; reauthorization did not complete. Canvas writes are unavailable through the current connector, and the connected device does not expose a browser session. The versioned importer is a preparation artifact until it is run and verified in Figma. No Figma release or library publication is claimed.

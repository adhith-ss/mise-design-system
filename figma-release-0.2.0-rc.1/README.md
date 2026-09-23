# Mise DLS 0.2.0-rc.1: Figma handoff

This is an additive import package, not evidence of an applied Figma update. Authentication failed, version-history access was unavailable, and no Figma changes have been made.

## Destination and version

Use the canonical [Mise_DLS file](https://www.figma.com/design/OYSStcuycsv9G63w7TC1uc/Mise_DLS). The recorded baseline version is `2402273576311283403`; the proposed release name is `Mise DLS 0.2.0-rc.1 · Human-led workspace refresh`.

## Package contents

- **Tokens:** Light and dark semantic colour values, plus native Figma colour-variable collections when imported.
- **Type:** Manrope styles, 13 px minimum, responsive role bounds documented next to specimens.
- **Controls:** Editable primary-button state specimens and reason-field specimens. These are not a full migration of every existing component.
- **Basil:** Native vector components for the pruned Mise set (48 glyphs), with attribution.
- **Artwork:** Approved workflow images and Plato thumbnail. Animation remains in the implementation and Storybook; static Figma artwork is not an animated prototype.

## Apply safely

1. Save a named checkpoint of the current library before importing.
2. In the Figma desktop application, import this development plugin using `manifest.json`.
3. Run it in Mise_DLS and choose “Add release candidate pages.” It appends pages with the `0.2.0-rc.1 /` prefix, creates new variables and styles, and does not change the baseline pages or publish the library.
4. Inspect the imported pages and bind production components to the new variables. Reconcile the established component properties, variants, auto-layout and instance bindings with the updated Storybook. This step remains outstanding.
5. Validate both themes and every applicable state. Measure actual on-screen pairs and test keyboard/screen-reader behaviour in code against [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/).
6. Save a named release-candidate version using the proposed name. Publish the library only after the remaining acceptance checks and owner approval.

## Recovery

The importer refuses a second import if its foundations page exists. If an import fails midway, review the partial release pages and new prefixed styles/collections before retrying; never delete baseline content. Plugin runtime execution and resulting Figma layout have not been verified because authenticated canvas access is blocked.

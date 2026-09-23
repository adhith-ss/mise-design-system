import { Title, Subtitle, Description, Primary, Controls, Stories, useOf } from '@storybook/blocks';

const guidance: Record<string, {anatomy:string; keyboard:string; usage:string}> = {
  Action:{anatomy:'Container, action label, optional Basil icon, progress indicator and supporting explanation.',keyboard:'Tab and Shift+Tab navigate. Enter or Space activates buttons; Enter follows links. Menus use arrow keys and Escape.',usage:'Use one primary action per decision area. Start labels with a precise verb. Do not use buttons for navigation or color alone for destructive meaning.'},
  'Data Input':{anatomy:'Persistent label, control, optional unit, hint, validation message and required indicator.',keyboard:'Tab visits each control; native editing keys remain available. Composite selectors support arrows, Enter and Escape. Errors reference their field.',usage:'Use visible labels, not placeholders as labels. Explain how to resolve invalid values. Require a reason for consequential target-cost changes.'},
  Navigation:{anatomy:'Navigation landmark, destination labels, current-location indicator and optional counts.',keyboard:'Tab follows destinations. Composite tab lists use arrow keys. Announce the current page with aria-current.',usage:'Keep naming stable across pages. Selected state must be visible without color alone. Collapse the rail without hiding navigation access.'},
  Overlay:{anatomy:'Trigger, named overlay, title, content, dismiss control and returned focus.',keyboard:'Escape dismisses. Modal dialogs trap Tab within the open dialog and return focus to their trigger. Non-modal content must not trap focus.',usage:'Use overlays for focused tasks. Never place an approval behind an animation. Tooltips explain; they must not contain required actions.'},
  'Table & List':{anatomy:'Caption or accessible name, column/row headers, records, status and optional row actions.',keyboard:'Use native tables for reading. Sort controls are buttons with aria-sort on headers. Interactive grids require a complete arrow-key model.',usage:'Align comparable numbers with tabular numerals. Preserve headers during local horizontal scrolling. Separate inspection from approval.'},
  'Chat & Agent':{anatomy:'Plato thumbnail, task state, message, data basis, source timestamp, composer and explicit approval controls.',keyboard:'The composer has a label; sending is deliberate. Announce completed responses politely, not token by token. Cancel remains reachable.',usage:'Page-specific tasks support the operator. Welcome once per active session, then thumbnail only. No angry shaking or winking; celebrate confirmed saves only.'},
  'Feedback & Status':{anatomy:'Text status, optional icon or illustration, supporting detail and recovery action.',keyboard:'Status messages use polite live regions without stealing focus. Urgent failures may use alerts. Actionable feedback stays keyboard reachable.',usage:'Explain what changed and the next useful action. Never claim a save or approval until it is confirmed. Pair color with a text label.'},
  Content:{anatomy:'Content container, semantic text or media, optional label, metadata and source context.',keyboard:'Static content is not tab-focusable. Links and actionable content follow native keyboard behavior.',usage:'Keep prose concise. All visible labels and metadata are at least 13 px; values use tabular numerals. Decorative images have empty alt text.'}
};
export function Documentation() {
  const meta=useOf('meta') as any;
  const title=meta.preparedMeta?.title ?? '';
  const rules=guidance[title.split('/')[0]] ?? guidance.Content;
  return <div className="dls-docs">
    <div className="dls-release">Mise DLS · 0.2.0-rc.1 · Release candidate · WCAG 2.2 AA release gate</div>
    <Title/><Subtitle/><Description/><Primary/>
    <h2>Overview</h2><p>{rules.usage}</p>
    <h2>Anatomy</h2><p>{rules.anatomy}</p>
    <h2>Properties</h2><p>Use the controls to inspect supported properties. Each named story demonstrates a configuration or state; do not infer coverage for combinations that have not been tested.</p><Controls/>
    <h2>Accessibility</h2>
    <p>{rules.keyboard}</p>
    <table><thead><tr><th>Requirement</th><th>Threshold</th><th>Check on screen</th></tr></thead><tbody>
      <tr><td>Text and supporting copy</td><td>4.5:1</td><td>Actual foreground against its rendered background in rest, hover, pressed, selected and validation states.</td></tr>
      <tr><td>Essential icon and boundary</td><td>3:1</td><td>Adjacent surface, including focus and status indicators. Decorative separators are not control boundaries.</td></tr>
      <tr><td>Disabled control</td><td>Contrast exception</td><td>Only genuinely inactive controls qualify. Keep the explanation legible.</td></tr>
      <tr><td>Typography and reflow</td><td>13 px minimum</td><td>200% text resize, 320 CSS px layout, no lost controls or clipped labels. This size floor is a Mise rule, not a WCAG minimum.</td></tr>
      <tr><td>Focus and targets</td><td>Visible; 24×24 px minimum</td><td>Not obscured, logical order; prefer 44×44 for touch. Field border touches the lighter halo without a white gap.</td></tr>
      <tr><td>Motion and semantics</td><td>Reduced motion</td><td>Text conveys status independently of animation. Names, roles and error associations remain available to assistive technology.</td></tr>
    </tbody></table>
    <p>Reference: <a href="https://www.w3.org/TR/WCAG22/">WCAG 2.2</a>. A clean automated scan is not a conformance certification. Review manual keyboard, screen-reader and zoom results before release.</p>
    <h2>Examples and states</h2><Stories/>
  </div>;
}

export type PlatoState = "ready" | "attentive" | "working" | "clarify" | "review" | "success" | "blocked" | "paused";
export const platoStates: Record<PlatoState, {label: string; emotion: string; copy: string; use: string}> = {
  ready: {label: "Ready", emotion: "Calm", copy: "What would you like to check?", use: "Chat opened, no active task."},
  attentive: {label: "Composing", emotion: "Attentive", copy: "Send when you’re ready.", use: "Text is being composed. No message has been sent."},
  working: {label: "Preparing", emotion: "Focused", copy: "Preparing your brief…", use: "An explicit task is running. Cancel stays available."},
  clarify: {label: "Needs input", emotion: "Curious", copy: "Which would you like to check?", use: "The request needs a choice or a missing detail."},
  review: {label: "Ready to review", emotion: "Interested", copy: "Ready for your review.", use: "A response or draft exists, not an approved change."},
  success: {label: "Saved", emotion: "Happy", copy: "Saved to History.", use: "A confirmed save in the current session."},
  blocked: {label: "Not connected", emotion: "Concerned", copy: "Live chat isn’t connected.", use: "A capability is unavailable. State the limit and an alternative."},
  paused: {label: "Stopped", emotion: "Resting", copy: "Stopped. Nothing changed.", use: "The user canceled preparation. Restart is optional."},
};

/** Layers extracted from the user's supplied image, on its original square tile.
 * Full-canvas layers keep the complete plate inside the thumbnail at every size. */
export function PlatoAvatar({state = "ready", size = 32, animate = true, labelled = false, celebrate = false}: {
  state?: PlatoState; variant?: "solid" | "streak"; size?: number; animate?: boolean; labelled?: boolean; celebrate?: boolean;
}) {
  return <span style={{width: size, height: size}} className={`plato-avatar plato-${state} ${animate && (state !== "success" || celebrate) ? "plato-motion" : ""}`} data-plato-state={state}
    role={labelled ? "img" : undefined} aria-label={labelled ? `Plato: ${platoStates[state].label}` : undefined} aria-hidden={labelled ? undefined : true}>
    <span className="plato-face">
      <img className="plato-eye-l" src="./plato/eye-left.png" alt="" draggable={false} />
      <img className="plato-eye-r" src="./plato/eye-right.png" alt="" draggable={false} />
      <img className="plato-plate" src="./plato/plate.png" alt="" draggable={false} />
    </span>
  </span>;
}

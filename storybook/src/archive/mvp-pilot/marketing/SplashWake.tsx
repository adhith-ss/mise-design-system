export interface SplashWakeProps {
  /** Replays the animation from its resting state on mount. Off by default —
   *  the entrance is meant to run once, when the agent actually opens. */
  autoplay?: boolean;
}

/**
 * The wake-up moment for opening the agent on mobile — **future scope**, not
 * a shipping product surface. Two resting dashes rotate into Plato's eyes
 * (1.7s), then the "Plato" wordmark fades in with a green streak sweep
 * (1.4s fade, 1.8s streak). Settles on the resting face + wordmark, full
 * white background. `key` is used to force a remount and replay the
 * animation, since CSS `animation-fill-mode: forwards` doesn't restart on
 * its own.
 */
export function SplashWake({ autoplay = false }: SplashWakeProps) {
  return (
    <div
      key={autoplay ? 'play' : 'still'}
      className="flex h-[420px] w-[320px] flex-col items-center justify-center gap-1 bg-white"
    >
      <svg viewBox="0 0 200 200" width="220" height="220" role="img" aria-label="Plato">
        {/* plate: rim, legs, bottom — static */}
        <line x1="30" y1="150" x2="170" y2="150" stroke="var(--mise-mascot-ink)" strokeWidth="16" strokeLinecap="round" />
        <line x1="50" y1="150" x2="62" y2="178" stroke="var(--mise-mascot-ink)" strokeWidth="14" strokeLinecap="round" />
        <line x1="150" y1="150" x2="138" y2="178" stroke="var(--mise-mascot-ink)" strokeWidth="14" strokeLinecap="round" />
        <line x1="62" y1="178" x2="138" y2="178" stroke="var(--mise-mascot-ink)" strokeWidth="14" strokeLinecap="round" />
        {/* two resting dashes that rotate 90° in opposite directions into open eyes */}
        <rect className="mise-wake-eye-l" x="70" y="95" width="60" height="16" rx="8" fill="var(--mise-mascot-ink)" />
        <rect className="mise-wake-eye-r" x="70" y="117" width="60" height="16" rx="8" fill="var(--mise-mascot-ink)" />
      </svg>
      <div
        className="mise-wake-name -mt-2 text-[92px] font-black tracking-[0.02em]"
        style={{ fontFamily: "'Satoshi', var(--mise-font-sans)" }}
      >
        Plato
      </div>
    </div>
  );
}

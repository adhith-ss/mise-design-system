import { cx } from '../../lib/cx';
import { TONE_DOT, type Tone } from './tone';

/**
 * The dot's own colour, not the shared TONE_DOT used by Badge/Toast — waiting
 * on a human reads as yellow specifically, distinct from the burnt-orange
 * `tone-warning-fg` used for warning *text* elsewhere in the system.
 */
const DOT_COLOR: Record<Tone, string> = { ...TONE_DOT, warning: 'bg-warn' };

export interface StatusDotProps {
  tone: Tone;
  /** Required. The state in words — the dot is never the only signal. */
  label: string;
  /** Hides the label visually, keeping it for screen readers. */
  labelHidden?: boolean;
  /** Slow pulse for a live, changing condition. */
  live?: boolean;
  size?: 'sm' | 'md';
}

/** A live condition: a connection, a shift, an agent run. */
export function StatusDot({ tone, label, labelHidden = false, live = false, size = 'md' }: StatusDotProps) {
  return (
    <span className="inline-flex items-center gap-[7px]">
      <span
        aria-hidden="true"
        className={cx(
          'shrink-0 rounded-pill',
          size === 'sm' ? 'h-[6px] w-[6px]' : 'h-2 w-2',
          DOT_COLOR[tone],
          live && 'motion-safe:animate-pulse',
        )}
      />
      <span className={cx(labelHidden ? 'sr-only' : 'text-[12.5px] text-ink-700')}>{label}</span>
    </span>
  );
}

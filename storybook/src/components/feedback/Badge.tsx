import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { TONE_SUBTLE, TONE_DOT, type Tone } from './tone';

export interface BadgeProps {
  children: string;
  /** The record's state. Never colour alone — the label always says it too. */
  tone?: Tone;
  /** Solid is reserved for one urgent state per screen. */
  appearance?: 'subtle' | 'solid' | 'outline';
  /** A leading dot, for states that map to a live condition. Mutually exclusive with `icon`. */
  dot?: boolean;
  /** A leading Lucide icon instead of a dot — e.g. a truck for "Shipped". 12px. */
  icon?: ReactNode;
  /** Trailing count, e.g. 2 variances. */
  count?: number;
  size?: 'sm' | 'md';
}

const SOLID: Record<Tone, string> = {
  success: 'bg-brand-600 text-white',
  warning: 'bg-alert text-white',
  danger: 'bg-danger text-white',
  info: 'bg-tone-info-fg text-white',
  neutral: 'bg-ink-700 text-white',
};

/**
 * A record's state, where the state changes how the operator acts on it.
 * Metadata (received Aug 22, 14 lines) is Text, not a Badge.
 */
export function Badge({
  children, tone = 'neutral', appearance = 'subtle', dot = false, icon, count, size = 'md',
}: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-[6px] rounded-pill font-semibold',
        size === 'sm' ? 'px-[7px] py-[2px] text-[11px]' : 'px-[10px] py-1 text-[12px]',
        appearance === 'subtle' && TONE_SUBTLE[tone],
        appearance === 'solid' && SOLID[tone],
        appearance === 'outline' && 'border border-line bg-surface text-ink-700',
      )}
    >
      {icon}
      {dot && <span aria-hidden="true" className={cx('h-[6px] w-[6px] rounded-pill', appearance === 'solid' ? 'bg-current' : TONE_DOT[tone])} />}
      {children}
      {count != null && (
        <span className={cx('rounded-pill px-[5px] text-[11px]', appearance === 'solid' ? 'bg-white/25' : cx(TONE_DOT[tone], 'text-white'))}>
          {count}
        </span>
      )}
    </span>
  );
}

import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { TONE_FG, TONE_ICON, TONE_BG, type Tone } from './tone';
import { Icon } from '../content/Icon';
import { X } from 'lucide-react';

export interface ToastProps {
  /** What just happened, in the past tense. */
  title: string;
  description?: string;
  tone?: Tone;
  /** One action, almost always Undo. */
  action?: ReactNode;
  onDismiss?: () => void;
  /** Timer pauses on hover and focus. Errors do not auto-dismiss. */
  duration?: number;
}

/**
 * Confirmation that something happened, for work the operator already knows
 * about. A leading icon carries the tone instead of the old status dot, and
 * the tint follows the same background/border treatment as Banner.
 */
export function Toast({ title, description, tone = 'neutral', action, onDismiss }: ToastProps) {
  const Glyph = TONE_ICON[tone];
  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cx('flex w-[380px] items-start gap-3 rounded-control border px-4 py-[13px] shadow-popover', TONE_BG[tone])}
    >
      <Icon icon={Glyph} size="md" className={cx('mt-[1px]', TONE_FG[tone])} label={tone} />
      <div className="flex flex-1 flex-col gap-[2px]">
        <span className={cx('text-[13.5px] font-semibold', TONE_FG[tone])}>{title}</span>
        {description && <span className="text-[12.5px] leading-[1.55] text-ink-500">{description}</span>}
      </div>
      {action}
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label="Dismiss" className="text-ink-500"><X size={16} strokeWidth={1.5} /></button>
      )}
    </div>
  );
}

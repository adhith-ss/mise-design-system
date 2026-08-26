import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { TONE_DOT, type Tone } from './tone';
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

/** Confirmation that something happened, for work the operator already knows about. */
export function Toast({ title, description, tone = 'neutral', action, onDismiss }: ToastProps) {
  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className="flex w-[380px] items-start gap-3 rounded-control border border-line bg-surface px-4 py-[13px] shadow-popover"
    >
      <span aria-hidden="true" className={cx('mt-[5px] h-2 w-2 shrink-0 rounded-pill', TONE_DOT[tone])} />
      <div className="flex flex-1 flex-col gap-[2px]">
        <span className="text-[13.5px] font-semibold">{title}</span>
        {description && <span className="text-[12.5px] leading-[1.55] text-ink-500">{description}</span>}
      </div>
      {action}
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label="Dismiss" className="text-ink-500"><X size={16} strokeWidth={1.5} /></button>
      )}
    </div>
  );
}

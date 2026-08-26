import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { type Tone } from './tone';

export interface BannerProps {
  /** One sentence stating the condition. */
  title: string;
  /** What it means and what to do. */
  children?: ReactNode;
  tone?: Tone;
  /** A single action. Two actions means this should be a Dialog. */
  action?: ReactNode;
  onDismiss?: () => void;
}

const BG: Record<Tone, string> = {
  success: 'border-brand-200 bg-tone-success-bg',
  warning: 'border-warn bg-tone-warning-bg',
  danger: 'border-danger-line bg-tone-danger-bg',
  info: 'border-line bg-tone-info-bg',
  neutral: 'border-line bg-tone-neutral-bg',
};

const EDGE: Record<Tone, string> = {
  success: 'border-l-brand-600',
  warning: 'border-l-alert',
  danger: 'border-l-danger',
  info: 'border-l-tone-info-fg',
  neutral: 'border-l-ink-500',
};

/**
 * A condition affecting the whole page or a whole record, staying until it is
 * resolved. Anything transient is a Toast.
 */
export function Banner({ title, children, tone = 'info', action, onDismiss }: BannerProps) {
  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cx('flex items-start gap-3 rounded-control border border-l-[3px] px-4 py-[13px]', BG[tone], EDGE[tone])}
    >
      <div className="flex flex-1 flex-col gap-[3px]">
        <span className="text-[13.5px] font-bold">{title}</span>
        {children && <span className="text-[12.5px] leading-[1.6] text-ink-700">{children}</span>}
      </div>
      {action}
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label="Dismiss" className="text-[14px] text-ink-500">×</button>
      )}
    </div>
  );
}

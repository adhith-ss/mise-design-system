import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface ProgressBarProps {
  /** Completed units. Omit for indeterminate work. */
  value?: number;
  max?: number;
  /** Names the work, e.g. "Reading invoices". */
  label?: string;
  /** Live count beside the label, e.g. "3 of 8". */
  detail?: string;
  size?: 'sm' | 'md';
  tone?: 'brand' | 'warning';
  /** Leading glyph before the label — a checkmark on Complete, an alert on Warning. 14px. */
  icon?: ReactNode;
}

/** Determinate work with a known end: reading 8 invoices, uploading 3 files. */
export function ProgressBar({
  value, max = 100, label, detail, size = 'md', tone = 'brand', icon,
}: ProgressBarProps) {
  const indeterminate = value == null;
  const pct = indeterminate ? 30 : Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="flex w-full flex-col gap-[6px]">
      {(label || detail) && (
        <div className="flex items-baseline justify-between">
          {label && (
            <span className="inline-flex items-center gap-[6px] text-[12.5px] font-medium">
              {icon}
              {label}
            </span>
          )}
          {detail && <span className="font-data text-[11.5px] text-ink-500">{detail}</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className={cx('w-full overflow-hidden rounded-pill bg-neutral-200', size === 'sm' ? 'h-[4px]' : 'h-[6px]')}
      >
        <div
          style={{ width: `${pct}%` }}
          className={cx(
            'h-full rounded-pill transition-[width] duration-base ease-mise',
            tone === 'brand' ? 'bg-brand-600' : 'bg-alert',
            indeterminate && 'motion-safe:animate-pulse',
          )}
        />
      </div>
    </div>
  );
}

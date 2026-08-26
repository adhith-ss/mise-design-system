import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface EmptyStateProps {
  /** States what is not here, in the operator's terms. */
  title: string;
  /** Why it is empty and what to do next. */
  children?: ReactNode;
  /** The one action that resolves it. */
  action?: ReactNode;
  /** 'first-run' | 'no-results' | 'all-clear' | 'error' — sets the tone of the frame. */
  kind?: 'first-run' | 'no-results' | 'all-clear' | 'error';
  size?: 'sm' | 'md';
}

/**
 * A view with nothing in it. Every empty state says which of the four reasons
 * it is: never used, nothing matched, nothing left to do, or something broke.
 */
export function EmptyState({
  title, children, action, kind = 'first-run', size = 'md',
}: EmptyStateProps) {
  return (
    <div
      className={cx(
        'flex flex-col items-center gap-[10px] rounded-lg border border-dashed text-center',
        size === 'sm' ? 'px-6 py-8' : 'px-8 py-12',
        kind === 'all-clear' ? 'border-brand-200 bg-tone-success-bg' : 'border-line bg-surface',
        kind === 'error' && 'border-danger-line bg-tone-danger-bg',
      )}
    >
      <span className="text-[15px] font-bold">{title}</span>
      {children && (
        <span className="max-w-[48ch] text-[13px] leading-[1.65] text-ink-700">{children}</span>
      )}
      {action && <span className="pt-1">{action}</span>}
    </div>
  );
}

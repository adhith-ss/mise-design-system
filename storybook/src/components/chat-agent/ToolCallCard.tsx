import { useState, type ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type ToolCallStatus = 'running' | 'done' | 'error' | 'denied';

export interface ToolCallCardProps {
  /** Machine name of the tool, e.g. "invoices.search". */
  tool: string;
  /** The human sentence. Required: it must be enough to trust or challenge the turn. */
  summary: string;
  /** Arguments the tool was called with. Shown when expanded. */
  args?: Record<string, unknown>;
  result?: ReactNode;
  status?: ToolCallStatus;
  /** Elapsed time in ms. */
  duration?: number;
  defaultExpanded?: boolean;
  onRetry?: () => void;
  /** A write shows the amber marker and must never be collapsed by default. */
  writesData?: boolean;
}

const STATUS: Record<ToolCallStatus, { label: string; className: string }> = {
  running: { label: 'Running', className: 'bg-surface-sunken text-ink-700' },
  done: { label: 'Done', className: 'bg-brand-50 text-brand-600' },
  error: { label: 'Failed', className: 'bg-danger-bg text-danger' },
  denied: { label: 'Declined', className: 'bg-warn-bg text-warn-ink' },
};

export function ToolCallCard({
  tool, summary, args, result, status = 'done', duration,
  defaultExpanded = false, onRetry, writesData = false,
}: ToolCallCardProps) {
  const [open, setOpen] = useState(defaultExpanded || writesData);
  const s = STATUS[status];

  return (
    <div
      className={cx(
        'overflow-hidden rounded-lg border border-line',
        writesData && 'border-l-[3px] border-l-warn',
      )}
      aria-busy={status === 'running' || undefined}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-[11px] bg-surface-raised px-[14px] py-[11px] text-left transition-colors duration-fast ease-mise hover:bg-surface-sunken focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-600"
      >
        <span aria-hidden="true" className="h-[18px] w-[18px] rounded-sm border border-brand-200 bg-brand-50" />
        <span className="font-data text-[13px]">{tool}</span>
        <span className="text-[12.5px] text-ink-500">{summary}</span>
        <span className="ml-auto flex items-center gap-[10px]">
          {duration != null && (
            <span className="text-[11.5px] text-ink-400">{(duration / 1000).toFixed(1)}s</span>
          )}
          <span className={cx('rounded-pill px-2 py-[3px] text-[11px] font-semibold', s.className)}>
            {s.label}
          </span>
          <span aria-hidden="true" className="text-[12px] text-ink-500">{open ? '▴' : '▾'}</span>
        </span>
      </button>

      {open && (
        <div className="flex flex-col gap-[10px] border-t border-line-soft px-[14px] py-[13px]">
          {args && (
            <span className="font-data text-[12.5px] text-ink-700">
              {JSON.stringify(args).replace(/","/g, '", "')}
            </span>
          )}
          {result}
          {status === 'error' && onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="self-start rounded-md border border-line bg-surface px-[13px] py-[7px] text-[12.5px] font-semibold text-ink-700"
            >
              Try again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

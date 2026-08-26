import { cx } from '../../lib/cx';

export type AgentState = 'idle' | 'working' | 'waiting' | 'stopped';
export type StepStatus = 'done' | 'active' | 'pending';

export interface AgentStep {
  label: string;
  status: StepStatus;
  /** Duration, count, or the reason it is blocked. */
  meta?: string;
}

export interface AgentStatusProps {
  state: AgentState;
  /** Named steps in the operator's vocabulary. Required over a spinner past 2s. */
  steps?: AgentStep[];
  /** Always present while working. */
  onStop?: () => void;
  /** Header pill instead of the full step list. */
  compact?: boolean;
  /** Shown on the idle pill, e.g. "last run 8:14 AM". */
  detail?: string;
}

const PILL: Record<AgentState, { dot: string; label: string }> = {
  idle: { dot: 'bg-ink-400', label: 'Idle' },
  working: { dot: 'bg-brand-600', label: 'Working' },
  waiting: { dot: 'bg-warn', label: 'Waiting on your approval' },
  stopped: { dot: 'bg-ink-400', label: 'Stopped' },
};

export function AgentStatus({ state, steps = [], onStop, compact = false, detail }: AgentStatusProps) {
  const pill = PILL[state];

  if (compact) {
    return (
      <div className="inline-flex items-center gap-[9px] rounded-[11px] border border-line bg-surface-raised px-3 py-[9px]">
        <span aria-hidden="true" className={cx('h-2 w-2 rounded-pill', pill.dot)} />
        <span className="text-[12.5px]">{[pill.label, detail].filter(Boolean).join(' · ')}</span>
      </div>
    );
  }

  return (
    <div className="flex min-w-[320px] flex-col gap-[11px]" role="status" aria-live="polite">
      {steps.map((s) => (
        <div key={s.label} className="flex items-center gap-[10px]">
          <span
            aria-hidden="true"
            className={cx(
              'h-[15px] w-[15px] shrink-0 rounded-pill border-[1.5px]',
              s.status === 'done' && 'border-brand-600 bg-brand-600',
              s.status === 'active' && 'border-brand-600 bg-brand-50',
              s.status === 'pending' && 'border-line bg-surface',
            )}
          />
          <span
            className={cx(
              'text-[13.5px]',
              s.status === 'active' && 'font-bold text-ink-900',
              s.status === 'done' && 'font-medium text-ink-700',
              s.status === 'pending' && 'text-ink-400',
            )}
          >
            {s.label}
          </span>
          {s.meta && <span className="ml-auto text-[11.5px] text-ink-400">{s.meta}</span>}
        </div>
      ))}
      {state === 'working' && onStop && (
        <button type="button" onClick={onStop} className="mt-1 h-8 self-start rounded-md border border-line bg-surface px-3 text-[12.5px] font-semibold text-ink-700">
          Stop
        </button>
      )}
    </div>
  );
}

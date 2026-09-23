import { Card } from '../components/content/Card';
import { Timestamp } from '../components/content/Timestamp';
import { Badge } from '../components/feedback/Badge';
import { ArrowUpRight } from '../icons/basil';
import { cx } from '../lib/cx';

export interface MetricCardProps {
  label?: string;
  value?: string;
  unit?: string;
  delta?: string;
  deltaTone?: 'up' | 'down' | 'neutral';
  foot?: string;
  freshness?: string;
  state?: 'default' | 'empty' | 'error' | 'disabled' | 'success';
  /** When true, value uses risk (danger) color. */
  atRisk?: boolean;
}

/**
 * KPI tile: value, optional delta, freshness timestamp, tabular numerals.
 */
export function MetricCard({
  label = 'Menu margin',
  value = '76.2',
  unit = '%',
  delta = '1.4 pts',
  deltaTone = 'up',
  foot = 'Above your 75% target',
  freshness = '2026-08-20T14:00:00',
  state = 'default',
  atRisk = false,
}: MetricCardProps) {
  const empty = state === 'empty';
  const errored = state === 'error';
  const disabled = state === 'disabled';

  return (
    <Card
      className={cx('w-full max-w-[280px]', disabled && 'pointer-events-none')}
      padding="md"
      edge={errored || atRisk ? 'warning' : 'none'}
      aria-disabled={disabled || undefined}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-[13px] font-semibold text-ink-700">{label}</span>
        {state === 'success' && <Badge tone="success" size="sm">On target</Badge>}
        {errored && <Badge tone="warning" size="sm">Stale</Badge>}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <strong
          className={cx(
            'font-data text-[28px] leading-none tabular-nums',
            (atRisk || errored) && 'text-danger',
            empty && 'text-ink-400',
          )}
        >
          {empty ? '—' : value}
          {!empty && unit && (
            <small className="ml-0.5 text-[15px] font-semibold text-ink-500">{unit}</small>
          )}
        </strong>
        {!empty && delta && (
          <span
            className={cx(
              'inline-flex items-center gap-0.5 text-[13px] font-semibold tabular-nums',
              deltaTone === 'up' && 'text-brand-600',
              deltaTone === 'down' && 'text-danger',
              deltaTone === 'neutral' && 'text-ink-500',
            )}
          >
            {deltaTone === 'up' && <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" />}
            {delta}
          </span>
        )}
      </div>

      <p className="mb-0 mt-2 text-[13px] leading-[1.45] text-ink-500">
        {empty ? 'No comparison available' : foot}
      </p>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-line-soft pt-2">
        <span className="text-[13px] text-ink-500">Freshness</span>
        {empty ? (
          <span className="text-[13px] text-ink-400">—</span>
        ) : (
          <Timestamp value={freshness} format="absolute" withTime size="dense" />
        )}
      </div>
    </Card>
  );
}

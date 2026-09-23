import { useMemo, useState } from 'react';
import { Button } from '../components/action/Button';
import { Field } from '../components/data-input/Field';
import { TextInput } from '../components/data-input/TextInput';
import { Selector } from '../components/data-input/Selector';
import { Card } from '../components/content/Card';
import { Badge } from '../components/feedback/Badge';
import { EmptyState } from '../components/feedback/EmptyState';
import { Check, Upload, Wrench } from '../icons/basil';

export type HistoryKind = 'All' | 'Decision' | 'Scenario' | 'Import' | 'Weekly';

export interface HistoryEntry {
  id: string;
  kind: Exclude<HistoryKind, 'All'>;
  title: string;
  detail?: string;
  time: string;
}

export interface SessionHistoryProps {
  entries?: HistoryEntry[];
  state?: 'default' | 'empty' | 'error' | 'disabled' | 'success';
  disabled?: boolean;
  onOpenDecisions?: () => void;
}

const demoEntries: HistoryEntry[] = [
  {
    id: '1',
    kind: 'Decision',
    title: 'Plate cost target $4.60 · Ahi Poke Bowl',
    detail: 'Recorded for this session. No live changes.',
    time: 'Aug 25, 9:12 AM PDT',
  },
  {
    id: '2',
    kind: 'Scenario',
    title: '4-week scenario saved',
    detail: 'Reason: Prepare for the next supplier renewal',
    time: 'Aug 25, 8:54 AM PDT',
  },
  {
    id: '3',
    kind: 'Import',
    title: 'pos-sales-sample.csv staged',
    detail: 'Validated format only. Not applied to the operational baseline.',
    time: 'Aug 24, 4:20 PM PDT',
  },
  {
    id: '4',
    kind: 'Weekly',
    title: 'Weekly snapshot saved · Aug 15–21',
    detail: 'Margin 76.2% · Contribution $19,516 · 2 open plans. Saving a snapshot does not approve plans.',
    time: 'Aug 24, 3:01 PM PDT',
  },
];

/**
 * Session activity list. Badge always says “This session” — no persistence claim.
 */
export function SessionHistory({
  entries = demoEntries,
  state = 'default',
  disabled = false,
  onOpenDecisions,
}: SessionHistoryProps) {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<HistoryKind>('All');
  const isDisabled = disabled || state === 'disabled';
  const source = state === 'empty' ? [] : entries;

  const filtered = useMemo(
    () =>
      source.filter(
        (a) =>
          (kind === 'All' || a.kind === kind) &&
          `${a.title} ${a.detail || ''}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [source, kind, query],
  );

  const iconFor = (k: HistoryEntry['kind']) => {
    if (k === 'Import') return <Upload size={17} strokeWidth={1.5} />;
    if (k === 'Scenario') return <Wrench size={17} strokeWidth={1.5} />;
    return <Check size={17} strokeWidth={1.5} />;
  };

  return (
    <div className="flex w-full max-w-[640px] flex-col gap-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[200px] flex-1">
          <Field label="Search activity" disabled={isDisabled}>
            <TextInput
              placeholder="Search activity"
              value={query}
              disabled={isDisabled}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Field>
        </div>
        <div className="w-[160px]">
          <Field label="Activity type" disabled={isDisabled}>
            <Selector
              value={kind}
              disabled={isDisabled}
              onChange={(v) => setKind(v as HistoryKind)}
              options={(['All', 'Decision', 'Scenario', 'Import', 'Weekly'] as const).map((k) => ({
                value: k,
                label: k,
              }))}
            />
          </Field>
        </div>
        <span className="pb-2 text-[13px] text-ink-500">
          {filtered.length} {filtered.length === 1 ? 'event' : 'events'} · This session
        </span>
      </div>

      {state === 'error' && (
        <EmptyState kind="error" title="Could not load activity">
          Try again in this session. Nothing was persisted.
        </EmptyState>
      )}

      {!source.length && state !== 'error' ? (
        <EmptyState
          kind="first-run"
          title="Your decisions, with context"
          action={
            <Button variant="secondary" onClick={onOpenDecisions}>
              Open decisions
            </Button>
          }
        >
          Plans, scenarios, imports and snapshots appear here.
        </EmptyState>
      ) : !filtered.length && state !== 'error' ? (
        <EmptyState
          kind="no-results"
          title="No matching activity"
          action={
            <Button
              variant="secondary"
              onClick={() => {
                setQuery('');
                setKind('All');
              }}
            >
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((a) => (
            <details
              key={a.id}
              className="rounded-lg border border-line bg-surface open:shadow-raised"
            >
              <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-3">
                <span className="mt-0.5 text-ink-500" aria-hidden="true">
                  {iconFor(a.kind)}
                </span>
                <div className="min-w-0 flex-1">
                  <span className="text-[13px] text-ink-500">
                    {a.kind} · You · {a.time}
                  </span>
                  <h3 className="m-0 mt-1 text-[14px] font-bold">{a.title}</h3>
                </div>
                <Badge size="sm">This session</Badge>
              </summary>
              <div className="border-t border-line-soft px-4 py-3 text-[13px] leading-[1.55] text-ink-700">
                <p className="m-0">{a.detail || 'Recorded for this session. No live changes.'}</p>
                <span className="mt-2 block text-ink-500">
                  Session-only record · Clears on reload
                </span>
              </div>
            </details>
          ))}
        </div>
      )}

      {state === 'success' && source.length > 0 && (
        <Card padding="sm">
          <p className="m-0 text-[13px] text-ink-700">
            Latest activity recorded for this session. No live changes.
          </p>
        </Card>
      )}
    </div>
  );
}

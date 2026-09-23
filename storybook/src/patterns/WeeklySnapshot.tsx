import { useState } from 'react';
import { Button } from '../components/action/Button';
import { Card } from '../components/content/Card';
import { Banner } from '../components/feedback/Banner';
import { Badge } from '../components/feedback/Badge';
import { CheckboxInput } from '../components/data-input/CheckboxInput';
import { Toast } from '../components/feedback/Toast';
import { Check } from '../icons/basil';
import { money } from './_shared';

export interface WeeklySnapshotProps {
  periodLabel?: string;
  contribution?: number;
  margin?: number;
  openPlans?: number;
  state?: 'default' | 'empty' | 'disabled' | 'success';
  disabled?: boolean;
  onSave?: () => void;
  onSources?: () => void;
}

const checklist = [
  { id: 'margin', label: 'Review margin movement vs prior week' },
  { id: 'plans', label: 'Scan open plans that carry forward' },
  { id: 'sources', label: 'Note sources that need an update' },
] as const;

/**
 * Weekly review checklist and snapshot save. Celebration and live-region
 * confirmation appear only after a confirmed save. Open plans stay open.
 */
export function WeeklySnapshot({
  periodLabel = 'Aug 15–21',
  contribution = 19516,
  margin = 76.2,
  openPlans = 2,
  state = 'default',
  disabled = false,
  onSave,
  onSources,
}: WeeklySnapshotProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    margin: false,
    plans: false,
    sources: false,
  });
  const [saved, setSaved] = useState(state === 'success');
  const [savedAt, setSavedAt] = useState(
    state === 'success' ? 'Aug 25, 9:00 AM PDT' : '',
  );
  const isDisabled = disabled || state === 'disabled';
  const isEmpty = state === 'empty';

  return (
    <div className="flex w-full max-w-[480px] flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge>Weekly snapshot</Badge>
        <span className="text-[13px] text-ink-500">{periodLabel}</span>
      </div>

      <section
        className="grid grid-cols-3 gap-3 rounded-lg border border-line bg-surface p-4"
        aria-label="Weekly results"
      >
        <div>
          <span className="text-[13px] text-ink-500">Weekly contribution</span>
          <strong className="mt-1 block font-data text-[20px] tabular-nums">
            {isEmpty ? '—' : money(contribution, 0)}
          </strong>
          <small className="text-[13px] text-ink-500">
            {isEmpty ? 'Previous week' : '+$674 vs prior week'}
          </small>
        </div>
        <div>
          <span className="text-[13px] text-ink-500">Menu margin</span>
          <strong className="mt-1 block font-data text-[20px] tabular-nums">
            {isEmpty ? '—' : `${margin.toFixed(1)}%`}
          </strong>
          <small className="text-[13px] text-ink-500">
            {isEmpty ? 'Previous week' : '+1.4 pts vs prior week'}
          </small>
        </div>
        <div>
          <span className="text-[13px] text-ink-500">Open decisions</span>
          <strong className="mt-1 block font-data text-[20px] tabular-nums">
            {isEmpty ? '—' : openPlans}
          </strong>
          <small className="text-[13px] text-ink-500">
            {isEmpty ? 'No comparison available' : 'Plans awaiting your review'}
          </small>
        </div>
      </section>

      {saved && (
        <section
          className="rounded-lg border border-line bg-tone-success-bg p-4"
          aria-label="Saved snapshot confirmation"
          role="status"
        >
          <span className="text-[13px] font-semibold uppercase tracking-[0.04em] text-ink-500">
            Weekly snapshot
          </span>
          <h2 className="m-0 mt-1 text-[17px] font-bold">Snapshot saved</h2>
          <p className="mb-0 mt-1 text-[13px] text-ink-700">
            {savedAt || 'Saved this session'}
          </p>
          <p className="mb-0 mt-2 text-[13px] text-ink-700">
            {periodLabel} captured. Open plans stay open.
          </p>
        </section>
      )}

      <Card
        title="This week, at a glance"
        subtitle="Auto-summary"
        action={<Badge>Auto-summary</Badge>}
      >
        {!isEmpty && (
          <>
            <p className="mb-2 mt-0 text-[13px] leading-[1.55]">
              <strong>Margin improved 1.4 pts</strong>
              <span className="block text-ink-500">Compared with the prior week.</span>
            </p>
            <p className="mb-3 mt-0 text-[13px] leading-[1.55]">
              <strong>
                {openPlans ? `${openPlans} plans remain open` : 'No open plans'}
              </strong>
              <span className="block text-ink-500">
                No decisions are required to save a snapshot.
              </span>
            </p>
          </>
        )}

        <div className="mb-4 flex flex-col gap-3">
          {checklist.map((item) => (
            <CheckboxInput
              key={item.id}
              checked={!!checked[item.id]}
              disabled={isDisabled || saved}
              label={item.label}
              onChange={(v) => setChecked((c) => ({ ...c, [item.id]: v }))}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="mb-3"
          onClick={onSources}
        >
          2 sources need an update
        </Button>

        {!saved && (
          <>
            <Button
              variant="secondary"
              fullWidth
              disabled={isDisabled || isEmpty}
              icon={<Check size={16} strokeWidth={1.5} />}
              onClick={() => {
                setSaved(true);
                setSavedAt(
                  new Date().toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    timeZoneName: 'short',
                  }),
                );
                onSave?.();
              }}
            >
              Save snapshot
            </Button>
            <p className="mb-0 mt-2 text-[13px] text-ink-500">
              Optional. Open plans stay open.
            </p>
          </>
        )}
      </Card>

      {saved && (
        <Toast
          tone="success"
          title="Snapshot saved"
          description={`${periodLabel} · Open plans stay open.`}
        />
      )}

      {!isEmpty && (
        <Banner tone="warning" title="Refresh before acting">
          POS and invoices need an update.
        </Banner>
      )}
    </div>
  );
}

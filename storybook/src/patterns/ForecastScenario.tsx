import { useMemo, useState } from 'react';
import { Button } from '../components/action/Button';
import { Field } from '../components/data-input/Field';
import { NumberInput } from '../components/data-input/NumberInput';
import { TextArea } from '../components/data-input/TextArea';
import { Selector } from '../components/data-input/Selector';
import { Card } from '../components/content/Card';
import { Banner } from '../components/feedback/Banner';
import { Badge } from '../components/feedback/Badge';
import { Dialog } from '../components/overlay/Dialog';
import { Table } from '../components/table-list/Table';
import { Check, Refresh } from '../icons/basil';
import { money, signedMoney } from './_shared';

export interface ForecastInputs {
  demand: number;
  costs: number;
  price: number;
  weeks: 1 | 4 | 12;
}

export interface ForecastScenarioProps {
  target?: number;
  state?: 'default' | 'empty' | 'error' | 'disabled' | 'success';
  disabled?: boolean;
  onSources?: () => void;
}

const baselineCategories = [
  { id: 'entrees', category: 'Entrées', baseline: 42000, contribution: 42000 },
  { id: 'bowls', category: 'Bowls', baseline: 28000, contribution: 28000 },
  { id: 'sides', category: 'Sides', baseline: 12000, contribution: 12000 },
];

function scale(inputs: ForecastInputs) {
  const factor =
    (1 + inputs.demand / 100) * (1 + inputs.price / 100) -
    (1 + inputs.costs / 100) * 0.35;
  return baselineCategories.map((row) => {
    const contribution = Math.round(row.baseline * (1 + factor * 0.08) * inputs.weeks);
    const baseline = row.baseline * inputs.weeks;
    return {
      ...row,
      id: row.id,
      baseline,
      contribution,
      delta: contribution - baseline,
    };
  });
}

/**
 * What-if scenario builder: presets, simulate, reset to baseline, save needs a
 * reason, model-assumptions disclosure, and “simulation, not a prediction.”
 */
export function ForecastScenario({
  target = 75,
  state = 'default',
  disabled = false,
  onSources,
}: ForecastScenarioProps) {
  const [inputs, setInputs] = useState<ForecastInputs>({
    demand: 0,
    costs: 0,
    price: 0,
    weeks: 4,
  });
  const [simulated, setSimulated] = useState<ForecastInputs | null>(
    state === 'empty' ? null : { demand: 0, costs: 0, price: 0, weeks: 4 },
  );
  const [presetApplied, setPresetApplied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [reason, setReason] = useState('');
  const [saved, setSaved] = useState(state === 'success');
  const isDisabled = disabled || state === 'disabled';

  const valid =
    inputs.demand >= -50 &&
    inputs.demand <= 50 &&
    inputs.costs >= -30 &&
    inputs.costs <= 30 &&
    inputs.price >= -30 &&
    inputs.price <= 30 &&
    [1, 4, 12].includes(inputs.weeks);

  const active = simulated ?? inputs;
  const rows = useMemo(() => scale(active), [active]);
  const contribution = rows.reduce((s, r) => s + r.contribution, 0);
  const baseline = rows.reduce((s, r) => s + r.baseline, 0);
  const margin = 74.8 + inputs.price * 0.2 - inputs.costs * 0.25;
  const dirty =
    simulated != null && JSON.stringify(inputs) !== JSON.stringify(simulated);

  return (
    <div className="flex w-full max-w-[720px] flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge>What-if model · 11 dishes</Badge>
        <div className="w-[140px]">
          <Field label="Horizon" disabled={isDisabled}>
            <Selector
              value={String(inputs.weeks)}
              disabled={isDisabled}
              onChange={(v) =>
                setInputs((s) => ({ ...s, weeks: Number(v) as 1 | 4 | 12 }))
              }
              options={[
                { value: '1', label: '1 week' },
                { value: '4', label: '4 weeks' },
                { value: '12', label: '12 weeks' },
              ]}
            />
          </Field>
        </div>
      </div>

      <Card
        title={simulated ? 'Your scenario' : 'Build your first scenario'}
        subtitle="Adjust, then simulate. Nothing changes live."
      >
        {presetApplied && (
          <p className="mb-3 mt-0 flex items-center gap-2 text-[13px] text-ink-700" role="status">
            <Check size={15} strokeWidth={1.5} /> Costs +3%, orders 0%, prices 0%. Adjust, then simulate.
          </p>
        )}

        <div className="mb-3 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="secondary"
            disabled={isDisabled}
            onClick={() => {
              setInputs((s) => ({ ...s, demand: 0, costs: 3, price: 0 }));
              setPresetApplied(true);
            }}
          >
            Apply +3% costs
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {(
            [
              { key: 'demand' as const, label: 'Order volume', min: -50, max: 50 },
              { key: 'costs' as const, label: 'Ingredient costs', min: -30, max: 30 },
              { key: 'price' as const, label: 'Menu prices', min: -30, max: 30 },
            ]
          ).map((field) => (
            <Field
              key={field.key}
              label={field.label}
              suffix="% change"
              disabled={isDisabled}
              hint={`${field.min}% to +${field.max}%`}
              error={
                state === 'error' && !valid
                  ? 'Enter values within the shown ranges.'
                  : undefined
              }
            >
              <NumberInput
                value={inputs[field.key]}
                min={field.min}
                max={field.max}
                steppers={false}
                disabled={isDisabled}
                onChange={(n) => {
                  setPresetApplied(false);
                  setInputs((s) => ({ ...s, [field.key]: n }));
                }}
              />
            </Field>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button
            variant="primary"
            disabled={!valid || isDisabled}
            onClick={() => {
              if (!valid) return;
              setSimulated({ ...inputs });
              setSaved(false);
            }}
          >
            Simulate
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={isDisabled}
            icon={<Refresh size={14} strokeWidth={1.5} />}
            onClick={() => {
              setInputs({ demand: 0, costs: 0, price: 0, weeks: 4 });
              setPresetApplied(false);
              setSimulated(null);
              setSaved(false);
            }}
          >
            Reset to baseline
          </Button>
        </div>

        {(state === 'error' || !valid) && (
          <p role="alert" className="mb-0 mt-3 text-[13px] text-danger">
            Enter values within the shown ranges.
          </p>
        )}
      </Card>

      {simulated && (
        <Card
          title="Simulation results"
          subtitle={dirty ? 'Inputs changed. Simulate again.' : 'Constant weekly assumptions.'}
          action={
            <Button
              size="sm"
              variant="secondary"
              disabled={isDisabled || dirty || saved}
              icon={<Check size={15} strokeWidth={1.5} />}
              onClick={() => {
                setReason('');
                setSaving(true);
              }}
            >
              {saved ? 'Saved' : 'Save scenario'}
            </Button>
          }
        >
          {saved && (
            <Banner className="mb-3" tone="success" title="Scenario saved">
              Reason recorded in History.
            </Banner>
          )}

          <div className="mb-4 grid gap-3 sm:grid-cols-3" aria-label="Scenario results">
            <div>
              <span className="text-[13px] text-ink-500">Est. contribution</span>
              <strong className="mt-1 block font-data text-[22px] tabular-nums">
                {money(contribution, 0)}
              </strong>
              <small className="text-[13px] text-ink-500">
                {signedMoney(contribution - baseline)} vs baseline
              </small>
            </div>
            <div>
              <span className="text-[13px] text-ink-500">Model margin</span>
              <strong
                className={`mt-1 block font-data text-[22px] tabular-nums ${
                  margin < target ? 'text-danger' : ''
                }`}
              >
                {margin.toFixed(1)}%
              </strong>
              <small className="text-[13px] text-ink-500">Target {target}%</small>
            </div>
            <div>
              <span className="text-[13px] text-ink-500">Horizon</span>
              <strong className="mt-1 block font-data text-[22px] tabular-nums">
                {active.weeks}
              </strong>
              <small className="text-[13px] text-ink-500">weeks</small>
            </div>
          </div>

          <Table
            label="Contribution by category"
            density="compact"
            columns={[
              { key: 'category', header: 'Category' },
              { key: 'baseline', header: 'Baseline', align: 'right', data: true, render: (r) => money(r.baseline, 0) },
              { key: 'contribution', header: 'Scenario', align: 'right', data: true, render: (r) => money(r.contribution, 0) },
              { key: 'delta', header: 'Change', align: 'right', data: true, render: (r) => signedMoney(r.delta) },
            ]}
            rows={rows}
          />

          <p className="mb-0 mt-3 text-[13px] leading-[1.55] text-ink-500">
            Constant weekly assumptions. Not a prediction or confidence interval.
          </p>

          <details className="mt-3 rounded-control border border-line-soft px-3 py-2 text-[13px] leading-[1.55] text-ink-700">
            <summary className="cursor-pointer font-semibold">Model assumptions</summary>
            <p className="mb-0 mt-2">
              Uses the 11-dish sample for Aug 15–21, not the Overview totals. Menu
              prices are inferred from rounded margins. Changes apply equally
              across dishes; weekly order counts round to whole orders. Price and
              ingredient costs round to cents. No seasonality, price elasticity,
              labor, overhead or taxes. Approved plans are not automatically
              applied.
            </p>
          </details>

          <Banner
            className="mt-4"
            tone="warning"
            title="Live sources not connected"
            action={
              <Button size="sm" variant="ghost" onClick={onSources}>
                Check sources
              </Button>
            }
          >
            Update POS and invoices before planning.
          </Banner>
        </Card>
      )}

      {state === 'empty' && !simulated && (
        <Banner tone="info" title="No simulation yet">
          Your simulations will appear here with their time and reason.
        </Banner>
      )}

      <Dialog
        open={saving}
        onOpenChange={setSaving}
        title="Provide reason for change"
        description="Keep the reason with your assumptions and results."
        size="sm"
        footer={
          <Button
            variant="primary"
            disabled={!reason.trim()}
            icon={<Check size={16} strokeWidth={1.5} />}
            onClick={() => {
              if (!reason.trim()) return;
              setSaved(true);
              setSaving(false);
            }}
          >
            Save scenario
          </Button>
        }
      >
        <Field label="Reason" required>
          <TextArea
            rows={3}
            maxLength={400}
            showCount
            placeholder="e.g. Prepare for the next supplier renewal"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Field>
      </Dialog>
    </div>
  );
}

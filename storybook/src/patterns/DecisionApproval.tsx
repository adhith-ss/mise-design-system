import { useState } from 'react';
import { Button } from '../components/action/Button';
import { Field } from '../components/data-input/Field';
import { TextInput } from '../components/data-input/TextInput';
import { TextArea } from '../components/data-input/TextArea';
import { CheckboxInput } from '../components/data-input/CheckboxInput';
import { Card } from '../components/content/Card';
import { Banner } from '../components/feedback/Banner';
import { Badge } from '../components/feedback/Badge';
import { Check } from '../icons/basil';
import { money, signedMoney } from './_shared';

export type DecisionKind = 'Pricing' | 'Supplier';

export interface DecisionApprovalProps {
  kind?: DecisionKind;
  dishName?: string;
  currentPrice?: number;
  currentCost?: number;
  currentMargin?: number;
  proposedValue?: number;
  orders?: number;
  target?: number;
  evidence?: string;
  /** Story control: force the acknowledgement checkbox off. */
  acknowledged?: boolean;
  /** Story control: force a reason string. */
  reason?: string;
  disabled?: boolean;
  /** 'error' shows an invalid amount message. */
  state?: 'default' | 'error' | 'disabled' | 'success';
  onApprove?: (summary: string) => void;
  onDefer?: () => void;
  onSources?: () => void;
}

/**
 * Proposal vs current comparison with approval guards: reason required when a
 * plate-cost target changes, acknowledgement required, approve disabled until
 * both pass. Records a plan only — refresh sources before acting.
 */
export function DecisionApproval({
  kind = 'Supplier',
  dishName = 'Ahi Poke Bowl',
  currentPrice = 18.5,
  currentCost = 4.9,
  currentMargin = 73.5,
  proposedValue,
  orders = 86,
  target = 75,
  evidence = 'Aug 15–21 sample · inferred price from rounded margin.',
  acknowledged: acknowledgedProp,
  reason: reasonProp,
  disabled = false,
  state = 'default',
  onApprove,
  onDefer,
  onSources,
}: DecisionApprovalProps) {
  const pricing = kind === 'Pricing';
  const proposed =
    proposedValue ??
    (pricing
      ? Math.ceil((currentCost / (1 - target / 100)) * 100) / 100
      : Math.floor(currentPrice * (1 - Math.max(target, currentMargin) / 100) * 100) / 100);

  const [proposal, setProposal] = useState(proposed.toFixed(2));
  const [acknowledged, setAcknowledged] = useState(acknowledgedProp ?? false);
  const [reason, setReason] = useState(reasonProp ?? '');
  const [approved, setApproved] = useState(state === 'success');

  const value = Number(proposal);
  const valid =
    proposal !== '' && Number.isFinite(value) && value > 0 && value <= 9999;
  const reasonRequired = !pricing && value !== proposed;
  const reasonValid = !reasonRequired || reason.trim().length > 0;
  const newPrice = pricing ? value : currentPrice;
  const newCost = pricing ? currentCost : value;
  const margin = valid ? (1 - newCost / newPrice) * 100 : 0;
  const delta = valid
    ? (newPrice - newCost - (currentPrice - currentCost)) * orders
    : 0;
  const isDisabled = disabled || state === 'disabled';
  const canApprove = valid && acknowledged && reasonValid && !isDisabled && !approved;

  if (approved || state === 'success') {
    return (
      <Card title="Plan approved" subtitle={dishName} className="max-w-[440px]">
        <Banner tone="success" title="Plan approved">
          Recorded for this session. Refresh sources before acting.
        </Banner>
        <p className="mt-3 text-[13px] leading-[1.6] text-ink-500">
          Approval records your plan in session History. Refresh sources before acting.
        </p>
      </Card>
    );
  }

  return (
    <Card
      className="max-w-[440px]"
      title={pricing ? 'Test a price' : 'Set a supplier target'}
      subtitle={dishName}
      action={<Badge tone="warning">Needs review</Badge>}
      footer={
        <div className="flex flex-col gap-3">
          <CheckboxInput
            checked={acknowledged}
            onChange={setAcknowledged}
            disabled={isDisabled}
            required
            label="Record a plan only. No live changes."
          />
          <div className="flex flex-wrap justify-end gap-[10px]">
            <Button variant="secondary" size="sm" disabled={isDisabled} onClick={onDefer}>
              Not now
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled={!canApprove}
              icon={<Check size={16} strokeWidth={1.5} />}
              onClick={() => {
                if (!canApprove) return;
                setApproved(true);
                onApprove?.(
                  `${pricing ? 'Price' : 'Plate cost target'} ${money(value)}${
                    reasonRequired ? ` · Reason: ${reason.trim()}` : ''
                  }`,
                );
              }}
            >
              Approve plan
            </Button>
          </div>
          <p className="m-0 text-[13px] leading-[1.55] text-ink-500">
            Approval records your plan in session History. Refresh sources before acting.
          </p>
        </div>
      }
    >
      <p className="mb-4 mt-0 text-[13px] leading-[1.6] text-ink-700">
        {pricing
          ? 'Model the price before changing your menu.'
          : 'Compare quotes against a target plate cost.'}
      </p>

      <Field
        label={pricing ? 'Proposed price' : 'Target plate cost'}
        suffix="USD"
        required
        disabled={isDisabled}
        error={
          state === 'error' || !valid
            ? 'Enter an amount from $0.01 to $9,999.'
            : undefined
        }
      >
        <TextInput
          type="number"
          min={0.01}
          max={9999}
          step={0.01}
          data
          value={proposal}
          disabled={isDisabled}
          onChange={(e) => setProposal(e.target.value)}
        />
      </Field>

      {reasonRequired && (
        <div className="mt-3">
          <Field label="Reason for change" required disabled={isDisabled} hint="Required when the target differs from the proposal.">
            <TextArea
              rows={2}
              maxLength={240}
              showCount
              placeholder="Why adjust this target?"
              value={reason}
              disabled={isDisabled}
              onChange={(e) => setReason(e.target.value)}
            />
          </Field>
        </div>
      )}

      <section aria-label="Plan comparison" className="mt-4 overflow-hidden rounded-control border border-line">
        <div className="grid grid-cols-3 gap-2 border-b border-line-soft bg-canvas px-3 py-2 text-[13px] font-semibold text-ink-500">
          <span>Estimated impact</span>
          <span className="text-right">Current</span>
          <span className="text-right">Proposed</span>
        </div>
        {[
          ['Menu price', money(currentPrice), valid ? money(newPrice) : '—'],
          ['Plate cost', money(currentCost), valid ? money(newCost) : '—'],
          [
            'Margin',
            `${currentMargin.toFixed(1)}%`,
            valid ? `${margin.toFixed(1)}%` : '—',
          ],
        ].map(([label, cur, prop]) => (
          <div
            key={label}
            className="grid grid-cols-3 gap-2 border-b border-line-soft px-3 py-[10px] text-[13px] last:border-b-0"
          >
            <span className="text-ink-700">{label}</span>
            <span className="font-data text-right text-ink-500">{cur}</span>
            <strong className="font-data text-right font-semibold tabular-nums">{prop}</strong>
          </div>
        ))}
      </section>

      <div className="mt-3 flex flex-col gap-[2px]" aria-live="polite">
        <span className="text-[13px] text-ink-500">Est. weekly contribution change</span>
        <strong className="font-data text-[18px] tabular-nums">
          {valid ? signedMoney(delta) : '—'}
        </strong>
        <small className="text-[13px] text-ink-500">
          {orders} orders · Demand unchanged
        </small>
      </div>

      <details className="mt-4 rounded-control border border-line-soft px-3 py-2 text-[13px] leading-[1.55] text-ink-700">
        <summary className="cursor-pointer font-semibold">Evidence & assumptions</summary>
        <p className="mb-0 mt-2">{evidence}</p>
        <p className="mb-0 mt-2 text-ink-500">
          Snapshot · Aug 21. Current price is inferred from rounded margin.
          Supplier targets are scenarios, not quotes. Excludes labor, overhead
          and taxes.
        </p>
      </details>

      <Banner
        className="mt-4"
        tone="warning"
        title="Sources need updating"
        action={
          <Button size="sm" variant="ghost" onClick={onSources}>
            Check
          </Button>
        }
      >
        POS · Aug 20 &nbsp; Invoices · Aug 14
      </Banner>
    </Card>
  );
}

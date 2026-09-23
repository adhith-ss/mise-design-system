import { useState } from 'react';
import { Button } from '../components/action/Button';
import { Field } from '../components/data-input/Field';
import { TextInput } from '../components/data-input/TextInput';
import { Card } from '../components/content/Card';
import { Banner } from '../components/feedback/Banner';
import { Badge } from '../components/feedback/Badge';
import { Refresh } from '../icons/basil';
import { money, signedMoney } from './_shared';

export interface DishDetailSheetProps {
  dishName?: string;
  category?: string;
  margin?: number;
  target?: number;
  orders?: number;
  cost?: number;
  price?: number;
  state?: 'default' | 'empty' | 'error' | 'disabled' | 'success';
  disabled?: boolean;
  onSources?: () => void;
  onReview?: () => void;
}

/**
 * Dish metrics sheet with performance summary, optional scenario test, and
 * sources notice.
 */
export function DishDetailSheet({
  dishName = 'Ahi Poke Bowl',
  category = 'Bowls',
  margin = 73.5,
  target = 75,
  orders = 86,
  cost = 4.9,
  price = 18.5,
  state = 'default',
  disabled = false,
  onSources,
  onReview,
}: DishDetailSheetProps) {
  const [tab, setTab] = useState<'summary' | 'scenario'>('summary');
  const [scenarioPrice, setScenarioPrice] = useState(price.toFixed(2));
  const [scenarioCost, setScenarioCost] = useState(cost.toFixed(2));
  const isDisabled = disabled || state === 'disabled';
  const atRisk = margin < target;
  const sp = Number(scenarioPrice);
  const sc = Number(scenarioCost);
  const valid =
    scenarioPrice !== '' &&
    scenarioCost !== '' &&
    Number.isFinite(sp) &&
    Number.isFinite(sc) &&
    sp > 0 &&
    sp <= 9999 &&
    sc >= 0 &&
    sc <= 9999;
  const scenarioMargin = valid ? (1 - sc / sp) * 100 : 0;
  const delta = valid ? (sp - sc - (price - cost)) * orders : 0;

  if (state === 'empty') {
    return (
      <Card className="max-w-[420px]" title="Dish details">
        <p className="m-0 text-[13px] text-ink-700">Select a dish to inspect margins and plans.</p>
      </Card>
    );
  }

  return (
    <div className="flex w-full max-w-[420px] flex-col gap-3">
      <Card
        title={dishName}
        subtitle={category}
        action={
          <Badge tone={atRisk || state === 'error' ? 'warning' : 'success'}>
            {atRisk || state === 'error' ? 'At risk' : 'Healthy'}
          </Badge>
        }
      >
        <div className="mb-1 text-[13px] text-ink-500">Aug 15–21</div>
        <div className="mb-4">
          <span className="text-[13px] text-ink-500">Ingredient margin</span>
          <div className="mt-1 flex flex-wrap items-baseline gap-2">
            <strong
              className={`font-data text-[28px] tabular-nums ${
                atRisk ? 'text-danger' : ''
              }`}
            >
              {margin.toFixed(1)}
              <small className="text-[15px]">%</small>
            </strong>
            <Badge tone={atRisk ? 'warning' : 'success'} size="sm">
              {`${Math.abs(margin - target).toFixed(1)} pts ${atRisk ? 'below' : 'above'} target`}
            </Badge>
          </div>
          <div
            className="mt-3 h-2 overflow-hidden rounded-pill bg-canvas"
            aria-label={`${margin.toFixed(1)}% margin, ${target}% target`}
          >
            <div
              className={`h-full rounded-pill ${atRisk ? 'bg-alert' : 'bg-brand-600'}`}
              style={{ width: `${Math.max(0, Math.min(margin, 100))}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between text-[13px] text-ink-500">
            <span>0%</span>
            <span>Target {target}%</span>
            <span>100%</span>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Dish details"
          className="mb-3 flex gap-1 border-b border-line"
        >
          {(['summary', 'scenario'] as const).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              disabled={isDisabled}
              className={`px-3 py-2 text-[13px] font-semibold focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand-600 focus-visible:ring-[3px] focus-visible:ring-brand-50 ${
                tab === key
                  ? 'border-b-2 border-brand-600 text-ink-900'
                  : 'text-ink-500'
              }`}
              onClick={() => setTab(key)}
            >
              {key === 'summary' ? 'Performance' : 'Test a change'}
            </button>
          ))}
        </div>

        {tab === 'summary' ? (
          <section role="tabpanel">
            <div className="mb-4 grid grid-cols-2 gap-3">
              {[
                ['Orders', String(orders)],
                ['Plate cost', money(cost)],
                ['Est. menu price', money(price)],
                ['Est. weekly contribution', money((price - cost) * orders)],
              ].map(([label, val]) => (
                <div key={label}>
                  <span className="text-[13px] text-ink-500">{label}</span>
                  <strong className="mt-1 block font-data text-[16px] tabular-nums">{val}</strong>
                </div>
              ))}
            </div>
            <div className="mb-2 flex items-baseline justify-between">
              <h3 className="m-0 text-[14px] font-bold">Next move</h3>
              <span className="text-[13px] text-ink-500">
                {state === 'success' ? 'No open plans' : '1 plan'}
              </span>
            </div>
            {state === 'success' ? (
              <p className="m-0 text-[13px] text-ink-700">
                Explore a change without editing the menu.
              </p>
            ) : (
              <Button variant="secondary" fullWidth onClick={onReview} disabled={isDisabled}>
                Compare costs
              </Button>
            )}
          </section>
        ) : (
          <section role="tabpanel">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="m-0 text-[14px] font-bold">Try a scenario</h3>
              <Button
                size="sm"
                variant="ghost"
                disabled={isDisabled}
                icon={<Refresh size={14} strokeWidth={1.5} />}
                onClick={() => {
                  setScenarioPrice(price.toFixed(2));
                  setScenarioCost(cost.toFixed(2));
                }}
              >
                Reset
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Menu price" suffix="USD" disabled={isDisabled} error={state === 'error' && !valid ? 'Enter a price above $0 and a non-negative cost, up to $9,999.' : undefined}>
                <TextInput
                  type="number"
                  data
                  min={0.01}
                  max={9999}
                  step={0.01}
                  value={scenarioPrice}
                  disabled={isDisabled}
                  onChange={(e) => setScenarioPrice(e.target.value)}
                />
              </Field>
              <Field label="Plate cost" suffix="USD" disabled={isDisabled}>
                <TextInput
                  type="number"
                  data
                  min={0}
                  max={9999}
                  step={0.01}
                  value={scenarioCost}
                  disabled={isDisabled}
                  onChange={(e) => setScenarioCost(e.target.value)}
                />
              </Field>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3" aria-live="polite">
              {valid ? (
                <>
                  <div>
                    <span className="text-[13px] text-ink-500">Scenario margin</span>
                    <strong className={`mt-1 block font-data text-[18px] tabular-nums ${scenarioMargin < target ? 'text-danger' : ''}`}>
                      {scenarioMargin.toFixed(1)}%
                    </strong>
                  </div>
                  <div>
                    <span className="text-[13px] text-ink-500">Est. weekly change</span>
                    <strong className="mt-1 block font-data text-[18px] tabular-nums">
                      {signedMoney(delta)}
                    </strong>
                  </div>
                </>
              ) : (
                <p role="alert" className="col-span-2 m-0 text-[13px] text-danger">
                  Enter a price above $0 and a non-negative cost, up to $9,999.
                </p>
              )}
            </div>
            <p className="mb-0 mt-3 text-[13px] text-ink-500">
              At {orders} orders. Demand unchanged. Nothing is saved.
            </p>
          </section>
        )}
      </Card>

      <Banner
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
    </div>
  );
}

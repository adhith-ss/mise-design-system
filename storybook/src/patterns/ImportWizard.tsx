import { useState } from 'react';
import { Button } from '../components/action/Button';
import { Field } from '../components/data-input/Field';
import { FileInput } from '../components/data-input/FileInput';
import { Selector } from '../components/data-input/Selector';
import { Card } from '../components/content/Card';
import { Banner } from '../components/feedback/Banner';
import { Badge } from '../components/feedback/Badge';
import { Stepper } from '../components/navigation/Stepper';
import { Table } from '../components/table-list/Table';
import { Check, Upload } from '../icons/basil';

type Step = 'upload' | 'map' | 'review' | 'done';

export interface ImportWizardProps {
  source?: 'POS sales' | 'Supplier invoices' | 'Recipes';
  state?: 'default' | 'empty' | 'error' | 'disabled' | 'success';
  disabled?: boolean;
  onStage?: (rows: number) => void;
}

const fields = [
  { key: 'date', label: 'Sale date' },
  { key: 'item', label: 'Menu item' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'revenue', label: 'Net sales (USD)' },
];

const sampleRows = [
  { id: '1', date: '2026-08-21', item: 'Grilled Ribeye', quantity: '10', revenue: '400' },
  { id: '2', date: '2026-08-21', item: 'Classic Cheeseburger', quantity: '20', revenue: '320' },
  { id: '3', date: '2026-08-20', item: 'Ahi Poke Bowl', quantity: '14', revenue: '259' },
];

/**
 * CSV import: choose file → map columns → check rows. Staging does not apply
 * to live data. “Not applied to the operational baseline.”
 */
export function ImportWizard({
  source = 'POS sales',
  state = 'default',
  disabled = false,
  onStage,
}: ImportWizardProps) {
  const initialStep: Step =
    state === 'success' ? 'done' : state === 'empty' ? 'upload' : 'upload';
  const [step, setStep] = useState<Step>(
    state === 'success' ? 'done' : initialStep,
  );
  const [fileName, setFileName] = useState(
    state === 'success' || state === 'default' ? 'pos-sales-sample.csv' : '',
  );
  const [mapping, setMapping] = useState<Record<string, string>>({
    date: 'date',
    item: 'item',
    quantity: 'quantity',
    revenue: 'revenue',
  });
  const [error, setError] = useState(
    state === 'error' ? 'Choose a CSV file smaller than 1 MB.' : '',
  );
  const [stagedRows, setStagedRows] = useState(state === 'success' ? 3 : 0);
  const isDisabled = disabled || state === 'disabled';

  const mapped =
    fields.every((f) => mapping[f.key]) &&
    new Set(fields.map((f) => mapping[f.key])).size === fields.length;

  const stepIndex = step === 'upload' ? 0 : step === 'map' ? 1 : 2;
  type StepStatus = 'done' | 'current' | 'upcoming' | 'error';
  const steps: Array<{ label: string; status: StepStatus }> = [
    { label: 'Choose file', status: stepIndex > 0 ? 'done' : 'current' },
    {
      label: 'Map columns',
      status: stepIndex > 1 ? 'done' : stepIndex === 1 ? 'current' : 'upcoming',
    },
    {
      label: 'Check rows',
      status:
        step === 'done' ? 'done' : step === 'review' ? 'current' : 'upcoming',
    },
  ];

  return (
    <div className="flex w-full max-w-[640px] flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge>Session imports</Badge>
        <Badge tone="neutral">Not connected</Badge>
      </div>

      <Card
        title={`Import ${source === 'POS sales' ? source : source.toLowerCase()}`}
        subtitle="CSV · Up to 1 MB / 5,000 rows · USD"
      >
        <div className="mb-4 overflow-x-auto">
          <Stepper steps={steps} />
        </div>

        {step === 'upload' && (
          <div className="flex flex-col gap-3">
            <h3 className="m-0 text-[15px] font-bold">
              {error ? 'Check your file' : fileName ? 'Add another file.' : 'Add your first data.'}
            </h3>
            <p className="m-0 text-[13px] text-ink-700">
              Start with a CSV. Map the columns next.
            </p>
            <FileInput
              accept=".csv,text/csv"
              multiple={false}
              disabled={isDisabled}
              prompt="Choose CSV"
              constraint="CSV · Up to 1 MB / 5,000 rows · USD"
              files={
                fileName
                  ? [{ name: fileName, size: '2 KB', status: 'done' }]
                  : []
              }
              onAdd={(list) => {
                const file = list[0];
                if (!file) return;
                if (!file.name.toLowerCase().endsWith('.csv') || file.size > 1024 * 1024) {
                  setError('Choose a CSV file smaller than 1 MB.');
                  return;
                }
                setError('');
                setFileName(file.name);
                setStep('map');
              }}
              onRemove={() => {
                setFileName('');
                setStep('upload');
              }}
            />
            <Button
              size="sm"
              variant="ghost"
              disabled={isDisabled}
              onClick={() => {
                setError('');
                setFileName('pos-sales-sample.csv');
                setStep('map');
              }}
            >
              Use example CSV
            </Button>
            <small className="text-[13px] text-ink-500">
              Files stay in this session. Live data is unchanged.
            </small>
          </div>
        )}

        {(error || state === 'error') && step === 'upload' && (
          <p role="alert" className="mb-0 mt-3 text-[13px] text-danger">
            {error || 'Choose a CSV file smaller than 1 MB.'}
          </p>
        )}

        {step === 'map' && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <strong className="text-[14px]">{fileName}</strong>
              <span className="text-[13px] text-ink-500">
                {sampleRows.length} rows · 4 columns
              </span>
              <Button size="sm" variant="ghost" onClick={() => { setFileName(''); setStep('upload'); }}>
                Replace file
              </Button>
            </div>
            <p className="m-0 text-[13px] text-ink-700">
              Header matches suggested. Confirm each field.
            </p>
            <div className="flex flex-col gap-3">
              {fields.map((f) => (
                <Field key={f.key} label={f.label} required disabled={isDisabled} suffix="Required">
                  <Selector
                    value={mapping[f.key] || ''}
                    disabled={isDisabled}
                    placeholder="Select column"
                    onChange={(v) => setMapping((m) => ({ ...m, [f.key]: v }))}
                    options={fields.map((h) => ({ value: h.key, label: h.key }))}
                  />
                </Field>
              ))}
            </div>
            {!mapped && (
              <p className="mb-0 text-[13px] text-ink-500">
                Map each required field to a different column.
              </p>
            )}
            <Button
              variant="primary"
              disabled={!mapped || isDisabled}
              onClick={() => setStep('review')}
            >
              Check rows
            </Button>
          </div>
        )}

        {step === 'review' && (
          <div className="flex flex-col gap-3">
            <Banner tone="success" title="Rows checked">
              All required values passed format checks. Item matching is not verified.
            </Banner>
            <Table
              label="Import row preview"
              density="compact"
              columns={fields.map((f) => ({
                key: f.key,
                header: f.label,
                data: f.key !== 'item',
              }))}
              rows={sampleRows}
            />
            <p className="mb-0 text-[13px] text-ink-500">
              First 5 rows · Scroll for all columns. Staging does not refresh KPIs or Forecast.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => { setFileName(''); setStep('upload'); }}>
                Replace file
              </Button>
              <Button
                variant="primary"
                disabled={isDisabled || !mapped}
                icon={<Check size={15} strokeWidth={1.5} />}
                onClick={() => {
                  setStagedRows(sampleRows.length);
                  setStep('done');
                  onStage?.(sampleRows.length);
                }}
              >
                Stage {sampleRows.length} rows
              </Button>
            </div>
          </div>
        )}

        {step === 'done' && (
          <div className="flex flex-col items-start gap-3" role="status">
            <h3 className="m-0 text-[15px] font-bold">
              {stagedRows || sampleRows.length} rows staged
            </h3>
            <p className="m-0 text-[13px] text-ink-700">
              Mapping saved for this session. Live data is unchanged.
            </p>
            <Banner tone="info" title="Not applied to live data">
              Validated format only. Not applied to the operational baseline.
            </Banner>
            <Button
              variant="secondary"
              icon={<Upload size={15} strokeWidth={1.5} />}
              onClick={() => {
                setFileName('');
                setStagedRows(0);
                setStep('upload');
              }}
            >
              Import another file
            </Button>
          </div>
        )}
      </Card>

      <Banner tone="warning" title="Sources not connected">
        Live supplier quotes, POS history, recipes and market data are not connected.
      </Banner>
    </div>
  );
}

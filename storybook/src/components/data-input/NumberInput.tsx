import { useField } from './Field';
import { cx } from '../../lib/cx';
import { Minus, Plus } from 'lucide-react';

export interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Unit shown inside the control, e.g. "cs". */
  unit?: string;
  /** Hides the stepper buttons for large free-entry numbers. */
  steppers?: boolean;
  disabled?: boolean;
  invalid?: boolean;
}

export function NumberInput({
  value, onChange, min = 0, max, step = 1, unit,
  steppers = true, disabled, invalid,
}: NumberInputProps) {
  const field = useField();
  const off = disabled ?? field?.disabled;
  const bad = invalid ?? field?.invalid;
  const clamp = (n: number) => Math.min(max ?? Infinity, Math.max(min, n));

  return (
    <div
      className={cx(
        'inline-flex h-md items-center overflow-hidden rounded-control border bg-surface',
        bad ? 'border-danger' : 'border-line',
        off && 'bg-canvas',
        'focus-within:border-brand-600 focus-within:ring-[3px] focus-within:ring-brand-50',
      )}
    >
      {steppers && (
        <button
          type="button"
          aria-label="Decrease"
          disabled={off || value <= min}
          onClick={() => onChange(clamp(value - step))}
          className="h-full w-8 border-r border-line bg-canvas text-[15px] text-ink-700 disabled:text-ink-300"
        >
          <Minus size={14} strokeWidth={1.5} />
        </button>
      )}
      <input
        id={field?.id}
        type="number"
        inputMode="numeric"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={off}
        aria-describedby={field?.describedBy}
        aria-invalid={bad ? true : undefined}
        onChange={(e) => onChange(clamp(Number(e.target.value)))}
        className="font-data w-[64px] border-0 bg-transparent text-center text-[14px] text-ink-900 outline-none [appearance:textfield] disabled:text-ink-400 [&::-webkit-inner-spin-button]:appearance-none"
      />
      {unit && <span className="font-data pr-2 text-[12.5px] text-ink-400">{unit}</span>}
      {steppers && (
        <button
          type="button"
          aria-label="Increase"
          disabled={off || (max != null && value >= max)}
          onClick={() => onChange(clamp(value + step))}
          className="h-full w-8 border-l border-line bg-canvas text-[15px] text-ink-700 disabled:text-ink-300"
        >
          <Plus size={14} strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
}

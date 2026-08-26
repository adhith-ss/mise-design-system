import { controlClass, useField } from './Field';
import { cx } from '../../lib/cx';

export interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  /** Earliest allowed date, ISO. */
  min?: string;
  max?: string;
  /** 'date' | 'range' — a range renders two bound inputs. */
  mode?: 'date' | 'range';
  /** Range end, when mode is 'range'. */
  endValue?: string;
  onEndChange?: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
}

/**
 * A delivery date, an invoice date, a period. Uses the native picker so the
 * platform's own locale and keyboard behaviour apply.
 */
export function DateInput({
  value, onChange, min, max, mode = 'date', endValue, onEndChange, disabled, invalid,
}: DateInputProps) {
  const field = useField();
  const bad = invalid ?? field?.invalid;
  const off = disabled ?? field?.disabled;

  if (mode === 'range') {
    return (
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={value}
          min={min}
          max={endValue || max}
          disabled={off}
          aria-label="From"
          aria-invalid={bad ? true : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={cx(controlClass(bad), 'font-data flex-1')}
        />
        <span aria-hidden="true" className="text-[13px] text-ink-400">to</span>
        <input
          type="date"
          value={endValue ?? ''}
          min={value || min}
          max={max}
          disabled={off}
          aria-label="To"
          aria-invalid={bad ? true : undefined}
          onChange={(e) => onEndChange?.(e.target.value)}
          className={cx(controlClass(bad), 'font-data flex-1')}
        />
      </div>
    );
  }

  return (
    <input
      id={field?.id}
      type="date"
      value={value}
      min={min}
      max={max}
      disabled={off}
      aria-describedby={field?.describedBy}
      aria-invalid={bad ? true : undefined}
      onChange={(e) => onChange(e.target.value)}
      className={cx(controlClass(bad), 'font-data')}
    />
  );
}

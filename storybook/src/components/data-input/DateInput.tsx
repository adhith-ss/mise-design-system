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
  /**
   * Callout shown below the input when invalid — states what's wrong with
   * *this* date specifically, e.g. "That date is before the order was
   * placed" or "A delivery date is required." Falls back to a generic
   * message so `invalid` alone still renders something.
   */
  error?: string;
}

/**
 * A delivery date, an invoice date, a period. Uses the native picker so the
 * platform's own locale and keyboard behaviour apply.
 */
export function DateInput({
  value, onChange, min, max, mode = 'date', endValue, onEndChange, disabled, invalid, error,
}: DateInputProps) {
  const field = useField();
  const bad = invalid ?? field?.invalid;
  const off = disabled ?? field?.disabled;
  const callout = bad ? (error ?? (value ? "That date isn't valid." : 'A date is required.')) : undefined;
  const calloutId = callout ? `${field?.id ?? 'date'}-callout` : undefined;

  if (mode === 'range') {
    return (
      <div className="flex flex-col gap-[6px]">
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={value}
            min={min}
            max={endValue || max}
            disabled={off}
            aria-label="From"
            aria-invalid={bad ? true : undefined}
            aria-describedby={calloutId}
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
            aria-describedby={calloutId}
            onChange={(e) => onEndChange?.(e.target.value)}
            className={cx(controlClass(bad), 'font-data flex-1')}
          />
        </div>
        {callout && <span id={calloutId} className="text-[12px] leading-[1.5] text-danger">{callout}</span>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[6px]">
      <div className="relative">
        <input
          id={field?.id}
          type="date"
          value={value}
          min={min}
          max={max}
          disabled={off}
          aria-describedby={cx(field?.describedBy, calloutId) || undefined}
          aria-invalid={bad ? true : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={cx(controlClass(bad), 'font-data', !value && 'text-transparent')}
        />
        {/* Native date inputs ignore `placeholder` and show the browser's own
            locale format instead, so it has to be hidden (text-transparent
            above) for this overlay to be the only visible prompt — otherwise
            our "DD/MM/YYYY" would sit on top of the browser's own mm/dd/yyyy
            segments. */}
        {!value && (
          <span aria-hidden="true" className="font-data pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-ink-400">
            DD/MM/YYYY
          </span>
        )}
      </div>
      {callout && <span id={calloutId} className="text-[12px] leading-[1.5] text-danger">{callout}</span>}
    </div>
  );
}

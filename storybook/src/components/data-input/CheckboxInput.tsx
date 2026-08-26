import { useId } from 'react';
import { cx } from '../../lib/cx';

export interface CheckboxInputProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  /** Second line under the label — the consequence of ticking it. */
  hint?: string;
  /** Neither on nor off: some children selected. Sets aria-checked="mixed". */
  indeterminate?: boolean;
  disabled?: boolean;
  invalid?: boolean;
}

export function CheckboxInput({
  checked, onChange, label, hint, indeterminate = false, disabled, invalid,
}: CheckboxInputProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className="flex items-start gap-[9px]">
      <button
        type="button"
        id={id}
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-describedby={hintId}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cx(
          'mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-sm border transition-colors duration-fast ease-mise',
          'focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand-600 focus-visible:ring-[3px] focus-visible:ring-brand-50',
          checked || indeterminate ? 'border-brand-600 bg-brand-600 text-white' : 'border-line bg-surface',
          invalid && !checked && 'border-danger',
          disabled && 'cursor-not-allowed border-line-soft bg-canvas',
        )}
      >
        {indeterminate ? (
          <span aria-hidden="true" className="h-[2px] w-[9px] bg-current" />
        ) : (
          checked && <span aria-hidden="true" className="text-[11px] leading-none">✓</span>
        )}
      </button>
      <label htmlFor={id} className={cx('flex flex-col gap-[2px]', disabled && 'text-ink-400')}>
        <span className="text-[13.5px]">{label}</span>
        {hint && <span id={hintId} className="text-[12px] leading-[1.5] text-ink-500">{hint}</span>}
      </label>
    </div>
  );
}

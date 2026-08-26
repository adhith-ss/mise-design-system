import { useId } from 'react';
import { cx } from '../../lib/cx';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  /** What changes when it is on. */
  hint?: string;
  /** Switches apply immediately — set this while the change is in flight. */
  pending?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

/**
 * A setting that takes effect immediately. If the change needs a Save button,
 * it is a Checkbox, not a Switch.
 */
export function Switch({
  checked, onChange, label, hint, pending = false, disabled, size = 'md',
}: SwitchProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const w = size === 'sm' ? 'h-[18px] w-[32px]' : 'h-[22px] w-[38px]';
  const knob = size === 'sm' ? 'h-[14px] w-[14px]' : 'h-[18px] w-[18px]';
  const shift = size === 'sm' ? 'translate-x-[14px]' : 'translate-x-[16px]';

  return (
    <div className="flex items-start justify-between gap-4">
      <label htmlFor={id} className={cx('flex flex-col gap-[2px]', disabled && 'text-ink-400')}>
        <span className="text-[13.5px] font-medium">{label}</span>
        {hint && <span id={hintId} className="text-[12px] leading-[1.5] text-ink-500">{hint}</span>}
      </label>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        aria-describedby={hintId}
        aria-busy={pending || undefined}
        disabled={disabled || pending}
        onClick={() => onChange(!checked)}
        className={cx(
          'relative shrink-0 rounded-pill border transition-colors duration-base ease-mise',
          'focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand-600 focus-visible:ring-[3px] focus-visible:ring-brand-50',
          w,
          checked ? 'border-brand-600 bg-brand-600' : 'border-line bg-neutral-200',
          disabled && 'cursor-not-allowed opacity-60',
        )}
      >
        <span
          aria-hidden="true"
          className={cx(
            'absolute left-[1px] top-[1px] rounded-pill bg-surface shadow-raised transition-transform duration-base ease-mise',
            knob,
            checked && shift,
          )}
        />
      </button>
    </div>
  );
}

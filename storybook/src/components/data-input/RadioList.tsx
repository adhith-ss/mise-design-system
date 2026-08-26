import { useId } from 'react';
import { cx } from '../../lib/cx';

export interface RadioOption {
  value: string;
  label: string;
  /** The consequence of picking this one. */
  hint?: string;
  disabled?: boolean;
}

export interface RadioListProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  /** Required. Names the choice being made. */
  label: string;
  /** 'card' gives each option its own bordered row — for consequential choices. */
  appearance?: 'plain' | 'card';
}

/** One choice from two to five visible options, all consequences on screen. */
export function RadioList({ options, value, onChange, label, appearance = 'plain' }: RadioListProps) {
  const name = useId();

  return (
    <div role="radiogroup" aria-label={label} className={cx('flex flex-col', appearance === 'card' ? 'gap-[10px]' : 'gap-[11px]')}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <label
            key={o.value}
            className={cx(
              'flex items-start gap-[9px]',
              appearance === 'card' && 'cursor-pointer rounded-control border px-[14px] py-3',
              appearance === 'card' && (on ? 'border-brand-600 bg-brand-50' : 'border-line bg-surface'),
              o.disabled && 'cursor-not-allowed opacity-60',
            )}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={on}
              disabled={o.disabled}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={cx(
                'mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-pill border',
                on ? 'border-brand-600' : 'border-line',
              )}
            >
              {on && <span className="h-[9px] w-[9px] rounded-pill bg-brand-600" />}
            </span>
            <span className="flex flex-col gap-[2px]">
              <span className="text-[13.5px] font-medium">{o.label}</span>
              {o.hint && <span className="text-[12px] leading-[1.5] text-ink-500">{o.hint}</span>}
            </span>
          </label>
        );
      })}
    </div>
  );
}

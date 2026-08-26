import { useState } from 'react';
import { cx } from '../../lib/cx';
import { useField } from './Field';

export interface MultiOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectorProps {
  options: MultiOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  /** Collapses past this many chips into "+n more". */
  maxVisible?: number;
  disabled?: boolean;
  invalid?: boolean;
}

/** Several choices from one list, shown back as removable chips. */
export function MultiSelector({
  options, value, onChange, placeholder = 'Choose…', maxVisible = 4, disabled, invalid,
}: MultiSelectorProps) {
  const [open, setOpen] = useState(false);
  const field = useField();
  const off = disabled ?? field?.disabled;
  const chosen = options.filter((o) => value.includes(o.value));
  const shown = chosen.slice(0, maxVisible);
  const rest = chosen.length - shown.length;

  return (
    <div className="relative">
      <button
        type="button"
        id={field?.id}
        disabled={off}
        aria-expanded={open}
        aria-describedby={field?.describedBy}
        onClick={() => setOpen((v) => !v)}
        className={cx(
          'flex min-h-md w-full flex-wrap items-center gap-[6px] rounded-control border bg-surface px-[10px] py-[6px] text-left transition-colors duration-fast ease-mise',
          invalid ?? field?.invalid ? 'border-danger' : 'border-line',
          'focus-visible:border-brand-600 focus-visible:ring-[3px] focus-visible:ring-brand-50',
          off && 'cursor-not-allowed bg-canvas',
        )}
      >
        {chosen.length === 0 && <span className="text-[14px] text-ink-400">{placeholder}</span>}
        {shown.map((o) => (
          <span key={o.value} className="inline-flex items-center gap-[6px] rounded-sm border border-brand-200 bg-brand-50 px-[7px] py-[2px] text-[12.5px] text-brand-600">
            {o.label}
            <span
              role="button"
              aria-label={`Remove ${o.label}`}
              onClick={(e) => { e.stopPropagation(); onChange(value.filter((v) => v !== o.value)); }}
              className="text-[13px] leading-none"
            >
              ×
            </span>
          </span>
        ))}
        {rest > 0 && <span className="font-data text-[12px] text-ink-500">+{rest} more</span>}
        <span aria-hidden="true" className="ml-auto text-[12px] text-ink-500">▾</span>
      </button>

      {open && !off && (
        <div className="absolute z-30 mt-[6px] w-full overflow-hidden rounded-control border border-line bg-surface p-[6px] shadow-popover">
          {options.map((o) => {
            const on = value.includes(o.value);
            return (
              <button
                key={o.value}
                type="button"
                role="checkbox"
                aria-checked={on}
                disabled={o.disabled}
                onClick={() => onChange(on ? value.filter((v) => v !== o.value) : [...value, o.value])}
                className="flex h-8 w-full items-center gap-[9px] rounded-md px-[10px] text-left text-[13.5px] hover:bg-canvas disabled:text-ink-300"
              >
                <span
                  aria-hidden="true"
                  className={cx('h-4 w-4 rounded-sm border', on ? 'border-brand-600 bg-brand-600' : 'border-line')}
                />
                {o.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

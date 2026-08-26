import { useField, controlClass } from './Field';
import { cx } from '../../lib/cx';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  /** Optional group heading. */
  group?: string;
}

export interface SelectorProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  /** Shown as the first, unselectable option. Never used as the label. */
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
}

/** One choice from a known, short list. Past about fifteen options, use Typeahead. */
export function Selector({
  options, value, onChange, placeholder, disabled, invalid,
}: SelectorProps) {
  const field = useField();
  const groups = [...new Set(options.map((o) => o.group))];

  return (
    <div className="relative">
      <select
        id={field?.id}
        value={value}
        disabled={disabled ?? field?.disabled}
        aria-describedby={field?.describedBy}
        aria-invalid={invalid ?? field?.invalid ? true : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={cx(controlClass(invalid ?? field?.invalid), 'appearance-none pr-9')}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {groups[0] === undefined && groups.length === 1
          ? options.map((o) => (
              <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
            ))
          : groups.map((g) => (
              <optgroup key={g ?? 'ungrouped'} label={g ?? ''}>
                {options.filter((o) => o.group === g).map((o) => (
                  <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
                ))}
              </optgroup>
            ))}
      </select>
      <ChevronDown size={16} strokeWidth={1.5} aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-500" />
    </div>
  );
}

import { cx } from '../../lib/cx';

export interface ToggleOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ToggleButtonGroupProps {
  options: ToggleOption[];
  /** Single-select behaves like a filter switch; multi-select like a set of flags. */
  multiple?: boolean;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  /** Required. Names the set. */
  label: string;
  size?: 'sm' | 'md';
}

export function ToggleButtonGroup({
  options, multiple = false, value, onChange, label, size = 'md',
}: ToggleButtonGroupProps) {
  const selected = Array.isArray(value) ? value : [value];

  const toggle = (v: string) => {
    if (!multiple) return onChange(v);
    onChange(selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v]);
  };

  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex overflow-hidden rounded-control border border-line bg-surface"
    >
      {options.map((o) => {
        const on = selected.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            disabled={o.disabled}
            onClick={() => toggle(o.value)}
            className={cx(
              'border-line font-semibold transition-colors duration-fast ease-mise [&+&]:border-l',
              size === 'sm' ? 'h-sm px-3 text-[13px]' : 'h-md px-[14px] text-[14px]',
              on ? 'bg-brand-50 text-brand-600' : 'bg-surface text-ink-700 hover:bg-canvas',
              o.disabled && 'cursor-not-allowed text-ink-300',
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

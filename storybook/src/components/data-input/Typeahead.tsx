import { useMemo, useState } from 'react';
import { controlClass, useField } from './Field';
import { cx } from '../../lib/cx';

export interface TypeaheadItem {
  value: string;
  label: string;
  /** Secondary line — the detail that tells two similar records apart. */
  meta?: string;
}

export interface TypeaheadProps {
  items: TypeaheadItem[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Shown while results are being fetched. */
  loading?: boolean;
  emptyMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
}

/** Search across a list too long to show at once — vendors, items, invoices. */
export function Typeahead({
  items, value, onChange, placeholder = 'Search…', loading = false,
  emptyMessage = 'No matches', disabled, invalid,
}: TypeaheadProps) {
  const field = useField();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const selected = items.find((i) => i.value === value);

  const results = useMemo(
    () => items.filter((i) => (i.label + (i.meta ?? '')).toLowerCase().includes(query.toLowerCase())),
    [items, query],
  );

  return (
    <div className="relative">
      <input
        id={field?.id}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-describedby={field?.describedBy}
        aria-invalid={invalid ?? field?.invalid ? true : undefined}
        disabled={disabled ?? field?.disabled}
        value={open ? query : selected?.label ?? ''}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        className={controlClass(invalid ?? field?.invalid)}
      />
      {open && (
        <div role="listbox" className="absolute z-30 mt-[6px] max-h-[280px] w-full overflow-auto rounded-control border border-line bg-surface p-[6px] shadow-popover">
          {loading && <div className="px-[10px] py-3 text-[13px] text-ink-500">Searching…</div>}
          {!loading && results.length === 0 && (
            <div className="px-[10px] py-3 text-[13px] text-ink-500">{emptyMessage}</div>
          )}
          {!loading && results.map((i) => (
            <button
              key={i.value}
              type="button"
              role="option"
              aria-selected={i.value === value}
              onMouseDown={() => { onChange(i.value); setQuery(''); setOpen(false); }}
              className={cx(
                'flex w-full flex-col gap-[1px] rounded-md px-[10px] py-[7px] text-left hover:bg-canvas',
                i.value === value && 'bg-brand-50',
              )}
            >
              <span className="text-[13.5px]">{i.label}</span>
              {i.meta && <span className="font-data text-[11.5px] text-ink-500">{i.meta}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

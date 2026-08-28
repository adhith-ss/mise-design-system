import { useMemo, useState } from 'react';
import { cx } from '../../lib/cx';

export interface CommandItem {
  label: string;
  /** Right-aligned context: "vendor", "invoice · 2 variances". */
  meta?: string;
  group: string;
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
  placeholder?: string;
  emptyMessage?: string;
  /** Display only — the host app binds the real hotkey. */
  hotkey?: string;
}

/** Keyboard-first search across records and actions. */
export function CommandPalette({
  open, onOpenChange, items, placeholder = 'Search records and actions',
  emptyMessage = 'No matches', hotkey = '⌘K',
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const results = useMemo(
    () => items.filter((i) => (i.label + (i.meta ?? '')).toLowerCase().includes(query.toLowerCase())),
    [items, query],
  );
  const groups = [...new Set(results.map((r) => r.group))];
  const groupId = (g: string) => `cmd-group-${g.replace(/\s+/g, '-').toLowerCase()}`;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-6 pt-[12vh]" style={{ background: 'var(--mise-scrim)' }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onOpenChange(false); }}>
      <div role="dialog" aria-modal="true" aria-label="Command palette"
        className="w-[520px] overflow-hidden rounded-xl bg-surface shadow-overlay">
        <div className="flex items-center gap-[10px] border-b border-line-soft px-4 py-[14px]">
          <span aria-hidden="true" className="h-[15px] w-[15px] rounded-pill border-[1.5px] border-ink-400" />
          <input
            autoFocus
            role="combobox"
            aria-expanded="true"
            aria-controls="cmd-listbox"
            aria-activedescendant={`cmd-${active}`}
            value={query}
            placeholder={placeholder}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') setActive((a) => Math.min(a + 1, results.length - 1));
              if (e.key === 'ArrowUp') setActive((a) => Math.max(a - 1, 0));
              if (e.key === 'Enter') { results[active]?.onSelect?.(); onOpenChange(false); }
              if (e.key === 'Escape') onOpenChange(false);
            }}
            className="flex-1 border-0 bg-transparent text-[15px] outline-none placeholder:text-ink-400"
          />
          <span className="font-data flex h-5 items-center rounded-sm border border-line px-[6px] text-[11px] text-ink-500">esc</span>
        </div>

        <div id="cmd-listbox" role="listbox" aria-label="Results" className="max-h-[320px] overflow-auto p-[6px]">
          {results.length === 0 && <div className="px-[10px] py-4 text-[13px] text-ink-500">{emptyMessage}</div>}
          {groups.map((g) => (
            <div key={g} role="group" aria-labelledby={groupId(g)}>
              <div id={groupId(g)} className="font-data px-[10px] py-[7px] text-[11px] uppercase tracking-[0.08em] text-ink-400">{g}</div>
              {results.filter((r) => r.group === g).map((r) => {
                const i = results.indexOf(r);
                return (
                  <div
                    key={r.label}
                    id={`cmd-${i}`}
                    role="option"
                    aria-selected={i === active}
                    onMouseEnter={() => setActive(i)}
                    onMouseDown={() => { r.onSelect?.(); onOpenChange(false); }}
                    className={cx('flex cursor-default items-center gap-[11px] rounded-[9px] px-[10px] py-[9px] text-[13.5px]', i === active && 'bg-canvas')}
                  >
                    <span aria-hidden="true" className="h-4 w-4 rounded-sm border border-brand-200 bg-brand-50" />
                    {r.label}
                    {r.meta && <span className="font-data ml-auto text-[12px] text-ink-400">{r.meta}</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-[14px] border-t border-line-soft bg-surface-raised px-4 py-[9px]">
          <span className="font-data text-[11.5px] text-ink-500">↑↓ navigate</span>
          <span className="font-data text-[11.5px] text-ink-500">⏎ open</span>
          <span className="font-data text-[11.5px] text-ink-500">{hotkey} toggle</span>
        </div>
      </div>
    </div>
  );
}

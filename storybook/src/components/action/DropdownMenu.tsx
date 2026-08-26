import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface MenuItem {
  label: string;
  icon?: ReactNode;
  /** Keyboard hint, e.g. "⌘E". Display only. */
  shortcut?: string;
  onSelect?: () => void;
  disabled?: boolean;
  /** Danger text, always last, below a divider. */
  destructive?: boolean;
  /** Optional group heading — only when items span two subjects. */
  group?: string;
}

export type MenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

export interface DropdownMenuProps {
  /** Flat or grouped item list. Items act immediately. */
  items: MenuItem[];
  /** The control that opens the menu. */
  trigger: ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Preferred side; flips near a viewport edge. */
  placement?: MenuPlacement;
  matchTriggerWidth?: boolean;
  closeOnSelect?: boolean;
  /** Scrolls internally beyond this height. */
  maxHeight?: number;
}

export function DropdownMenu({
  items, trigger, defaultOpen = false, onOpenChange,
  placement = 'bottom-start', matchTriggerWidth = false,
  closeOnSelect = true, maxHeight = 320,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(defaultOpen);
  const root = useRef<HTMLDivElement>(null);

  const set = (v: boolean) => { setOpen(v); onOpenChange?.(v); };

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) set(false);
    };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') set(false); };
    document.addEventListener('mousedown', away);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', away);
      document.removeEventListener('keydown', esc);
    };
  });

  const groups = items.reduce<Array<{ group?: string; items: MenuItem[] }>>((acc, item) => {
    const last = acc[acc.length - 1];
    if (last && last.group === item.group) last.items.push(item);
    else acc.push({ group: item.group, items: [item] });
    return acc;
  }, []);

  return (
    <div ref={root} className="relative inline-block">
      <span onClick={() => set(!open)} role="presentation">{trigger}</span>
      {open && (
        <div
          role="menu"
          style={{ maxHeight }}
          className={cx(
            'absolute z-30 min-w-[200px] overflow-auto rounded-control border border-line bg-surface p-[6px] shadow-popover',
            placement.startsWith('bottom') ? 'top-[calc(100%+6px)]' : 'bottom-[calc(100%+6px)]',
            placement.endsWith('end') ? 'right-0' : 'left-0',
            matchTriggerWidth && 'w-full',
          )}
        >
          {groups.map((g, gi) => (
            <div key={g.group ?? gi}>
              {gi > 0 && <div role="separator" className="my-[5px] h-px bg-line-soft" />}
              {g.group && (
                <div className="font-data px-[10px] py-[7px] text-[11px] uppercase tracking-[0.08em] text-ink-400">
                  {g.group}
                </div>
              )}
              {g.items.map((item) => (
                <button
                  key={item.label}
                  role="menuitem"
                  type="button"
                  disabled={item.disabled}
                  onClick={() => { item.onSelect?.(); if (closeOnSelect) set(false); }}
                  className={cx(
                    'flex h-8 w-full items-center gap-[10px] rounded-md px-[10px] text-left text-[13.5px] transition-colors duration-fast ease-mise',
                    item.destructive ? 'text-danger hover:bg-tone-danger-bg' : 'text-ink-900 hover:bg-canvas',
                    item.disabled && 'cursor-not-allowed text-ink-300 hover:bg-transparent',
                  )}
                >
                  {item.icon}
                  {item.label}
                  {item.shortcut && (
                    <span className="font-data ml-auto text-[11.5px] text-ink-400">{item.shortcut}</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

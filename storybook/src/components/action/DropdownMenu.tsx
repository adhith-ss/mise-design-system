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
  const triggerWrap = useRef<HTMLSpanElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  // The trigger is an arbitrary ReactNode (usually a Button/IconButton, none
  // of which forward refs), so the actual focusable element inside it is
  // found by querying the DOM rather than cloning it with a ref.
  const triggerEl = () => triggerWrap.current?.querySelector<HTMLElement>('button, a[href], [tabindex]');

  const set = (v: boolean) => {
    setOpen(v);
    onOpenChange?.(v);
    // WAI-ARIA menu pattern: closing (Escape, outside click, or a selection)
    // returns focus to the control that opened it, not to the document body.
    if (!v) triggerEl()?.focus();
  };

  // aria-haspopup/aria-expanded belong on the trigger itself, not the
  // wrapping span — set imperatively for the same forwardRef reason above.
  useEffect(() => {
    const el = triggerEl();
    el?.setAttribute('aria-haspopup', 'menu');
    el?.setAttribute('aria-expanded', String(open));
  }, [open]);

  // Opening a menu moves focus into it — the WAI-ARIA menu pattern expects
  // the first item to be focused immediately, not left on the trigger.
  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector<HTMLElement>('[role="menuitem"]:not(:disabled)')?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) set(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { set(false); return; }
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Home' && e.key !== 'End') return;
      e.preventDefault();
      const focusable = Array.from(menu.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)') ?? []);
      if (focusable.length === 0) return;
      const at = focusable.indexOf(document.activeElement as HTMLElement);
      let next: number;
      if (e.key === 'ArrowDown') next = (at + 1) % focusable.length;
      else if (e.key === 'ArrowUp') next = (at - 1 + focusable.length) % focusable.length;
      else if (e.key === 'Home') next = 0;
      else next = focusable.length - 1;
      focusable[next]?.focus();
    };
    document.addEventListener('mousedown', away);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('mousedown', away);
      document.removeEventListener('keydown', key);
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
      <span ref={triggerWrap} onClick={() => set(!open)} role="presentation">{trigger}</span>
      {open && (
        <div
          ref={menu}
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

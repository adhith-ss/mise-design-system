import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  /** Fixed width, or 'trigger' to match the trigger. */
  width?: number | 'trigger';
  closeOnInteractOutside?: boolean;
}

/**
 * A small piece of interactive content anchored to its trigger. Opens on click,
 * never on hover, and does not block the page.
 */
export function Popover({
  trigger, children, defaultOpen = false, onOpenChange,
  placement = 'bottom-start', width, closeOnInteractOutside = true,
}: PopoverProps) {
  const [open, setOpen] = useState(defaultOpen);
  const root = useRef<HTMLDivElement>(null);

  const set = (v: boolean) => { setOpen(v); onOpenChange?.(v); };

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => {
      if (closeOnInteractOutside && !root.current?.contains(e.target as Node)) set(false);
    };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') set(false); };
    document.addEventListener('mousedown', away);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', away);
      document.removeEventListener('keydown', esc);
    };
  });

  return (
    <div ref={root} className="relative inline-block">
      <span role="presentation" onClick={() => set(!open)}>{trigger}</span>
      {open && (
        <div
          style={{ width: typeof width === 'number' ? width : undefined }}
          className={cx(
            'absolute z-30 rounded-lg border border-line bg-surface p-[14px] shadow-popover',
            placement.startsWith('bottom') ? 'top-[calc(100%+6px)]' : 'bottom-[calc(100%+6px)]',
            placement.endsWith('end') ? 'right-0' : 'left-0',
            width === 'trigger' && 'w-full',
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

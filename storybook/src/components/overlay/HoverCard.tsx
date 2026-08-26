import { useRef, useState, type ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface HoverCardProps {
  trigger: ReactNode;
  children: ReactNode;
  /** 500ms by default — long enough not to fire on a passing pointer. */
  openDelay?: number;
  /** 200ms grace so the pointer can travel into the card. */
  closeDelay?: number;
  width?: number;
  /** Skeleton content while the record is fetched. */
  loading?: boolean;
  placement?: 'bottom' | 'top';
}

/**
 * A preview of the record behind a reference. Read-only: everything in it exists
 * elsewhere, so nothing is lost if it is never opened.
 */
export function HoverCard({
  trigger, children, openDelay = 500, closeDelay = 200, width = 300, loading = false, placement = 'bottom',
}: HoverCardProps) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const show = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(true), openDelay); };
  const hide = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(false), closeDelay); };

  return (
    <span className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide}>
      {trigger}
      {open && (
        <span
          style={{ width }}
          className={cx(
            'absolute z-30 left-0 rounded-lg border border-line bg-surface p-[14px] shadow-popover',
            placement === 'bottom' ? 'top-[calc(100%+6px)]' : 'bottom-[calc(100%+6px)]',
          )}
        >
          {loading ? (
            <span aria-hidden="true" className="flex flex-col gap-2">
              <span className="h-[13px] w-2/3 rounded-sm bg-neutral-200 motion-safe:animate-pulse" />
              <span className="h-[13px] w-1/2 rounded-sm bg-neutral-200 motion-safe:animate-pulse" />
            </span>
          ) : (
            children
          )}
        </span>
      )}
    </span>
  );
}

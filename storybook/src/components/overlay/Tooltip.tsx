import { useState, type ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface TooltipProps {
  /** Short label. Maximum two lines — more means the field needs a hint. */
  content: string;
  children: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Open delay in ms. No close delay. */
  delay?: number;
  disabled?: boolean;
  maxWidth?: number;
}

/**
 * A short label for a control whose meaning is not fully visible. Never holds
 * information needed to complete a task, and never holds a control.
 */
export function Tooltip({
  content, children, placement = 'top', delay = 300, disabled = false, maxWidth = 240,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  let timer: ReturnType<typeof setTimeout>;

  const show = () => { timer = setTimeout(() => setOpen(true), delay); };
  const hide = () => { clearTimeout(timer); setOpen(false); };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onKeyDown={(e) => { if (e.key === 'Escape') hide(); }}
    >
      {children}
      {open && !disabled && (
        <span
          role="tooltip"
          style={{ maxWidth }}
          className={cx(
            'pointer-events-none absolute z-40 w-max rounded-[9px] bg-ink-900 px-[10px] py-[6px] text-[12.5px] leading-[1.45] text-white',
            placement === 'top' && 'bottom-[calc(100%+7px)] left-1/2 -translate-x-1/2',
            placement === 'bottom' && 'left-1/2 top-[calc(100%+7px)] -translate-x-1/2',
            placement === 'left' && 'right-[calc(100%+7px)] top-1/2 -translate-y-1/2',
            placement === 'right' && 'left-[calc(100%+7px)] top-1/2 -translate-y-1/2',
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}

import { useState, useRef, useId, useEffect, isValidElement, cloneElement, type ReactNode } from 'react';
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
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const id=useId();
  useEffect(()=>()=>clearTimeout(timer.current),[]);

  const show = () => { clearTimeout(timer.current);timer.current = setTimeout(() => setOpen(true), delay); };
  const hide = () => { clearTimeout(timer.current); setOpen(false); };
  const leave = () => { clearTimeout(timer.current);timer.current=setTimeout(()=>setOpen(false),150); };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={leave}
      onFocus={show}
      onBlur={hide}
      onKeyDown={(e) => { if (e.key === 'Escape') hide(); }}
    >
      {isValidElement<{ 'aria-describedby'?: string }>(children) ? cloneElement(children,{'aria-describedby':open&&!disabled ? [children.props['aria-describedby'],id].filter(Boolean).join(' ') : children.props['aria-describedby']}) : children}
      {open && !disabled && (
        <span
          role="tooltip"
          id={id}
          onMouseEnter={()=>{clearTimeout(timer.current);setOpen(true);}}
          style={{ maxWidth }}
          className={cx(
            'dls-inverse absolute z-40 w-max rounded-[9px] bg-ink-900 px-[10px] py-[6px] text-[13px] font-bold leading-[1.45] text-white',
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

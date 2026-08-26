import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface ButtonGroupProps {
  /** Buttons, in DOM order. The primary action goes last. */
  children: ReactNode;
  /** 'attached' welds the buttons into one unit; 'spaced' keeps them separate. */
  attached?: boolean;
  orientation?: 'horizontal' | 'vertical';
  /** Required when the group is attached — names the unit for assistive tech. */
  label?: string;
}

export function ButtonGroup({
  children, attached = true, orientation = 'horizontal', label,
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cx(
        'inline-flex',
        orientation === 'vertical' && 'flex-col',
        attached
          ? '[&>*]:rounded-none [&>*:first-child]:rounded-l-control [&>*:last-child]:rounded-r-control [&>*+*]:-ml-px'
          : 'gap-[10px]',
      )}
    >
      {children}
    </div>
  );
}

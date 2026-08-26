import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface CardProps {
  children: ReactNode;
  /** Heading row. */
  title?: string;
  /** Second line under the title. */
  subtitle?: string;
  /** Right-aligned control in the header — a More Menu, a link. */
  action?: ReactNode;
  /** Footer row, separated and on the raised surface. */
  footer?: ReactNode;
  padding?: 'none' | 'sm' | 'md';
  /** Raises the card and makes the whole surface interactive. */
  onClick?: () => void;
  /** Amber or red left edge for a card that needs attention. */
  edge?: 'none' | 'warning' | 'danger';
}

/** The default container for a group of related content about one subject. */
export function Card({
  children, title, subtitle, action, footer, padding = 'md', onClick, edge = 'none',
}: CardProps) {
  const pad = padding === 'none' ? '' : padding === 'sm' ? 'px-[14px] py-3' : 'px-4 py-4';

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      className={cx(
        'overflow-hidden rounded-lg border border-line bg-surface',
        edge === 'warning' && 'border-l-[3px] border-l-warn',
        edge === 'danger' && 'border-l-[3px] border-l-danger',
        onClick && 'cursor-pointer transition-shadow duration-fast ease-mise hover:shadow-raised',
      )}
    >
      {(title || action) && (
        <div className={cx('flex items-start justify-between gap-3', padding === 'none' ? 'px-4 pb-3 pt-4' : pad, 'pb-0')}>
          <div className="flex flex-col gap-[2px]">
            {title && <span className="text-[15px] font-bold">{title}</span>}
            {subtitle && <span className="text-[12.5px] text-ink-500">{subtitle}</span>}
          </div>
          {action}
        </div>
      )}
      <div className={pad}>{children}</div>
      {footer && (
        <div className="border-t border-line-soft bg-surface-raised px-4 py-3">{footer}</div>
      )}
    </div>
  );
}

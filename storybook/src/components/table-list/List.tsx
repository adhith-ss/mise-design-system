import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface ListItem {
  id: string;
  /** The one thing that identifies the record. */
  title: string;
  /** Everything else, one line. */
  meta?: string;
  /** Right-aligned figure or badge. */
  trailing?: ReactNode;
  /** Leading avatar, thumbnail, or status marker. */
  leading?: ReactNode;
  href?: string;
}

export interface ListProps {
  items: ListItem[];
  /** Required. Names the collection. */
  label: string;
  density?: 'default' | 'compact';
  /** Removes the card border, for lists inside a card. */
  bare?: boolean;
  onSelect?: (id: string) => void;
}

/** Records with one thing worth comparing. More than one, and it is a Table. */
export function List({ items, label, density = 'default', bare = false, onSelect }: ListProps) {
  return (
    <ul
      aria-label={label}
      className={cx('m-0 flex list-none flex-col p-0', !bare && 'overflow-hidden rounded-lg border border-line bg-surface')}
    >
      {items.map((i) => (
        <li key={i.id} className="border-b border-line-soft last:border-b-0">
          <div
            role={onSelect || i.href ? 'button' : undefined}
            tabIndex={onSelect || i.href ? 0 : undefined}
            onClick={() => onSelect?.(i.id)}
            className={cx(
              'flex items-center gap-3 px-[14px] transition-colors duration-fast ease-mise',
              density === 'compact' ? 'py-[9px]' : 'py-3',
              (onSelect || i.href) && 'cursor-pointer hover:bg-surface-raised',
            )}
          >
            {i.leading}
            <div className="flex min-w-0 flex-col gap-[1px]">
              <span className="truncate text-[13.5px] font-medium">{i.title}</span>
              {i.meta && <span className="truncate text-[12px] text-ink-500">{i.meta}</span>}
            </div>
            {i.trailing && <span className="ml-auto shrink-0">{i.trailing}</span>}
          </div>
        </li>
      ))}
    </ul>
  );
}

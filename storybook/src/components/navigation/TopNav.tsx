import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface TopNavItem {
  label: string;
  href: string;
  current?: boolean;
  /** Count of things needing attention, e.g. unmatched invoices. */
  count?: number;
  /** Leading glyph, 16px. */
  icon?: ReactNode;
}

export interface TopNavProps {
  /** The product mark and location switcher live here. */
  brand?: ReactNode;
  items: TopNavItem[];
  /** Search, agent status, account — right-aligned. */
  actions?: ReactNode;
}

/** The app's top-level places. One row, never more than seven items. */
export function TopNav({ brand, items, actions }: TopNavProps) {
  return (
    <header className="flex h-[56px] items-center gap-6 border-b border-line bg-surface px-5">
      {brand}
      <nav aria-label="Main" className="flex items-center gap-1">
        {items.map((i) => (
          <a
            key={i.href}
            href={i.href}
            aria-current={i.current ? 'page' : undefined}
            className={cx(
              'flex h-8 items-center gap-[7px] rounded-md px-[11px] text-[13.5px] no-underline transition-colors duration-fast ease-mise',
              i.current ? 'bg-brand-50 font-semibold text-brand-600' : 'text-ink-700 hover:bg-canvas',
            )}
          >
            {i.icon}
            {i.label}
            {i.count != null && (
              <span className="font-data rounded-pill bg-tone-warning-bg px-[6px] text-[11px] text-tone-warning-fg">
                {i.count}
              </span>
            )}
          </a>
        ))}
      </nav>
      {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
    </header>
  );
}

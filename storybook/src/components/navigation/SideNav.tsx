import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface SideNavItem {
  label: string;
  href: string;
  current?: boolean;
  count?: number;
  disabled?: boolean;
  /** Shown in place of the label's first letter when the rail is collapsed. 16px. */
  icon?: ReactNode;
}

export interface SideNavGroup {
  /** Uppercase label above the group. Omit for the first, unlabelled group. */
  label?: string;
  items: SideNavItem[];
}

export interface SideNavProps {
  groups: SideNavGroup[];
  header?: ReactNode;
  /** Swapped in for `header` when collapsed — a mark alone, not the full wordmark. */
  collapsedHeader?: ReactNode;
  footer?: ReactNode;
  /** Icons-only rail at 64px. */
  collapsed?: boolean;
  width?: number;
}

/** The persistent left rail: where the operator is, and everything one click away. */
export function SideNav({ groups, header, collapsedHeader, footer, collapsed = false, width = 264 }: SideNavProps) {
  return (
    <nav
      aria-label="Sections"
      style={{ width: collapsed ? 64 : width }}
      className="flex h-full flex-col gap-6 border-r border-line bg-surface px-5 py-6"
    >
      {collapsed ? (collapsedHeader ?? header) : header}
      <div className="flex flex-col gap-1">
        {groups.map((g, gi) => (
          <div key={g.label ?? gi} className="flex flex-col gap-1">
            {g.label && !collapsed && (
              <div className="font-data px-2 pb-[6px] pt-[10px] text-[11px] uppercase tracking-[0.12em] text-ink-400">
                {g.label}
              </div>
            )}
            {g.items.map((i) => (
              <a
                key={i.href + i.label}
                href={i.disabled ? undefined : i.href}
                aria-current={i.current ? 'page' : undefined}
                aria-disabled={i.disabled || undefined}
                title={collapsed ? i.label : undefined}
                className={cx(
                  'flex items-center gap-[9px] rounded-[8px] px-2 py-[7px] text-[13px] no-underline transition-colors duration-fast ease-mise',
                  collapsed && 'justify-center',
                  i.current ? 'bg-brand-50 font-semibold text-brand-600' : 'text-ink-700 hover:bg-canvas',
                  i.disabled && 'pointer-events-none text-ink-300',
                )}
              >
                {collapsed ? (
                  <>
                    {i.icon ?? <span aria-hidden="true">{i.label.slice(0, 1)}</span>}
                    <span className="sr-only">{i.label}</span>
                  </>
                ) : (
                  i.label
                )}
                {i.count != null && !collapsed && (
                  <span className={cx('font-data ml-auto text-[11.5px]', i.current ? 'font-semibold text-brand-600' : 'text-ink-400')}>
                    {i.count}
                  </span>
                )}
              </a>
            ))}
          </div>
        ))}
      </div>
      {footer && <div className="mt-auto">{footer}</div>}
    </nav>
  );
}

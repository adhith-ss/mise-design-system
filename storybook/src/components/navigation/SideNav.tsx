import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface SideNavItem {
  label: string;
  href: string;
  current?: boolean;
  count?: number;
  disabled?: boolean;
  /** Shown in place of the label's first letter when the rail is collapsed.
   *  Also shown beside the label when `showIcons` is on. 16px. */
  icon?: ReactNode;
  /** Renders `count` as a solid pill instead of quiet text — for the one or
   *  two items that genuinely want attention (an agent suggestion, an
   *  unread review), not a general count style. */
  highlightCount?: boolean;
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
  /** 'dark' is the persistent-chrome rail — a dark surface that stays put
   *  while the rest of the product is light. Not a general dark mode. */
  tone?: 'light' | 'dark';
  /** Shows each item's icon beside its label even when not collapsed. Off
   *  by default so every existing light-rail story keeps its current,
   *  label-only look — opt in per instance. */
  showIcons?: boolean;
}

/** The persistent left rail: where the operator is, and everything one click away. */
export function SideNav({
  groups, header, collapsedHeader, footer, collapsed = false, width = 264, tone = 'light', showIcons = false,
}: SideNavProps) {
  const dark = tone === 'dark';
  return (
    <nav
      aria-label="Sections"
      style={{ width: collapsed ? 64 : width }}
      className={cx(
        'flex h-full flex-col gap-6 px-5 py-6',
        dark ? 'border-r border-rail-border bg-rail-bg' : 'border-r border-line bg-surface',
      )}
    >
      {collapsed ? (collapsedHeader ?? header) : header}
      <div className="flex flex-col gap-1">
        {groups.map((g, gi) => (
          <div key={g.label ?? gi} className="flex flex-col gap-1">
            {g.label && !collapsed && (
              <div
                className={cx(
                  'font-data px-2 pb-[6px] pt-[10px] text-[11px] uppercase tracking-[0.12em]',
                  dark ? 'text-rail-text-muted' : 'text-ink-400',
                )}
              >
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
                  dark
                    ? cx(
                        i.current ? 'bg-rail-current-bg font-semibold text-brand-400' : 'text-rail-text hover:bg-rail-bg-hover',
                        i.disabled && 'pointer-events-none text-rail-text-muted',
                      )
                    : cx(
                        i.current ? 'bg-brand-50 font-semibold text-brand-600' : 'text-ink-700 hover:bg-canvas',
                        i.disabled && 'pointer-events-none text-ink-300',
                      ),
                )}
              >
                {collapsed ? (
                  <>
                    {i.icon ?? <span aria-hidden="true">{i.label.slice(0, 1)}</span>}
                    <span className="sr-only">{i.label}</span>
                  </>
                ) : showIcons ? (
                  <>
                    {i.icon && <span aria-hidden="true" className="shrink-0">{i.icon}</span>}
                    {i.label}
                  </>
                ) : (
                  i.label
                )}
                {i.count != null && !collapsed && (
                  i.highlightCount && dark ? (
                    // rail-mark is scoped to the dark rail — no light-mode
                    // equivalent exists yet, so highlightCount only changes
                    // the light rail's rendering once one is designed.
                    <span className="font-data ml-auto rounded-pill bg-rail-mark px-[7px] py-[1px] text-[11px] font-bold text-rail-mark-ink">
                      {i.count}
                    </span>
                  ) : (
                    <span
                      className={cx(
                        'font-data ml-auto text-[11.5px]',
                        dark
                          ? i.current ? 'font-semibold text-brand-400' : 'text-rail-text-muted'
                          : i.current ? 'font-semibold text-brand-600' : 'text-ink-400',
                      )}
                    >
                      {i.count}
                    </span>
                  )
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

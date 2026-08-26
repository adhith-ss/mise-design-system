import { cx } from '../../lib/cx';

export interface Crumb {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  /** Ancestors first, current record last. The last item is never a link. */
  items: Crumb[];
  /** Collapses the middle past this many items. */
  maxItems?: number;
}

/** Where the operator is in a hierarchy, and one click back up it. */
export function Breadcrumbs({ items, maxItems = 4 }: BreadcrumbsProps) {
  const shown =
    items.length > maxItems
      ? [items[0], { label: '…' } as Crumb, ...items.slice(-2)]
      : items;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex list-none flex-wrap items-center gap-[7px] p-0 text-[12.5px]">
        {shown.map((c, i) => {
          const last = i === shown.length - 1;
          return (
            <li key={c.label + i} className="flex items-center gap-[7px]">
              {c.href && !last ? (
                <a href={c.href} className="text-ink-500 no-underline hover:text-brand-600">{c.label}</a>
              ) : (
                <span className={cx(last ? 'font-semibold text-ink-900' : 'text-ink-400')} aria-current={last ? 'page' : undefined}>
                  {c.label}
                </span>
              )}
              {!last && <span aria-hidden="true" className="text-ink-300">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

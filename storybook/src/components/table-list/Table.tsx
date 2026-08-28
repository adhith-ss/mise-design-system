import { useEffect, useRef, type ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface Column<Row> {
  key: string;
  header: string;
  /** Right-align numbers; they compare down a column, not across. */
  align?: 'left' | 'right';
  width?: string;
  /** Renders in General Sans Light — amounts, counts, IDs. */
  data?: boolean;
  render?: (row: Row) => ReactNode;
}

export interface TableProps<Row extends { id: string }> {
  columns: Array<Column<Row>>;
  rows: Row[];
  /** Required. Names what the table holds. */
  label: string;
  /** 40px rows instead of 48px — for tables over about 20 rows. */
  density?: 'default' | 'compact';
  selectable?: boolean;
  selected?: string[];
  onSelectedChange?: (ids: string[]) => void;
  /** Sticks the header while the body scrolls. */
  stickyHeader?: boolean;
  onRowClick?: (row: Row) => void;
  /** Shown in place of the body when there are no rows. */
  empty?: ReactNode;
  /** Row-level footer, e.g. totals. */
  footer?: ReactNode;
}

export function Table<Row extends { id: string }>({
  columns, rows, label, density = 'default', selectable = false,
  selected = [], onSelectedChange, stickyHeader = false, onRowClick, empty, footer,
}: TableProps<Row>) {
  const h = density === 'compact' ? 'h-10' : 'h-12';
  const allOn = rows.length > 0 && selected.length === rows.length;
  const someOn = selected.length > 0 && !allOn;
  const headerCheckbox = useRef<HTMLInputElement>(null);
  // `indeterminate` is a DOM property, not an HTML attribute — there is no
  // JSX prop for it, it has to be set imperatively after every render.
  useEffect(() => {
    if (headerCheckbox.current) headerCheckbox.current.indeterminate = someOn;
  }, [someOn]);

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">{label}</caption>
        <thead className={cx('bg-canvas', stickyHeader && 'sticky top-0 z-10')}>
          <tr>
            {selectable && (
              <th scope="col" className="w-10 border-b border-line px-3">
                <input
                  ref={headerCheckbox}
                  type="checkbox"
                  aria-label={allOn ? 'Deselect all rows' : 'Select all rows'}
                  checked={allOn}
                  onChange={() => onSelectedChange?.(allOn ? [] : rows.map((r) => r.id))}
                  className="h-4 w-4 accent-[var(--mise-brand-600)]"
                />
              </th>
            )}
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                style={{ width: c.width }}
                className={cx(
                  'border-b border-line px-[14px] py-[11px] text-[11px] font-semibold uppercase tracking-[0.05em] text-ink-500',
                  c.align === 'right' && 'text-right',
                )}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-[14px] py-10 text-center">
                {empty}
              </td>
            </tr>
          )}
          {rows.map((row) => {
            const on = selected.includes(row.id);
            return (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={cx(
                  h,
                  'border-b border-line-soft last:border-b-0 transition-colors duration-fast ease-mise',
                  on ? 'bg-brand-50' : 'hover:bg-surface-raised',
                  onRowClick && 'cursor-pointer',
                )}
              >
                {selectable && (
                  <td className="px-3">
                    <input
                      type="checkbox"
                      aria-label={`Select ${row.id}`}
                      checked={on}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => onSelectedChange?.(on ? selected.filter((s) => s !== row.id) : [...selected, row.id])}
                      className="h-4 w-4 accent-[var(--mise-brand-600)]"
                    />
                  </td>
                )}
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cx(
                      'px-[14px] text-[13px]',
                      c.align === 'right' && 'text-right',
                      c.data && 'font-data',
                    )}
                  >
                    {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? '')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
        {footer && (
          <tfoot>
            <tr className="border-t border-line bg-surface-raised">
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-[14px] py-[11px]">{footer}</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

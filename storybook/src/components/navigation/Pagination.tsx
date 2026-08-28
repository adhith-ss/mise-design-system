import { cx } from '../../lib/cx';

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Total records, shown as "34 invoices". */
  total?: number;
  /** Noun for the total, singular. */
  unit?: string;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
}

/** Moves through a list too long for one screen. The count is the useful part. */
export function Pagination({
  page, pageCount, onPageChange, total, unit = 'record',
  pageSize, onPageSizeChange, pageSizeOptions = [25, 50, 100],
}: PaginationProps) {
  const from = pageSize ? (page - 1) * pageSize + 1 : undefined;
  const to = pageSize && total ? Math.min(page * pageSize, total) : undefined;

  const btn = 'flex h-8 min-w-8 items-center justify-center rounded-md border border-line bg-surface px-[9px] text-[12.5px] font-semibold text-ink-700 disabled:text-ink-300';

  return (
    <div className="flex flex-wrap items-center gap-3">
      {total != null && (
        <span className="text-[12.5px] text-ink-500">
          {from && to ? (
            <>
              <span className="font-data">{from}–{to}</span> of <span className="font-data">{total}</span> {unit}
              {total === 1 ? '' : 's'}
            </>
          ) : (
            <>
              <span className="font-data">{total}</span> {unit}{total === 1 ? '' : 's'}
            </>
          )}
        </span>
      )}

      <nav aria-label="Pagination" className="ml-auto flex items-center gap-[6px]">
        {pageCount > 1 && (
          <button type="button" className={btn} disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
            Previous
          </button>
        )}
        <span className="font-data px-1 text-[12.5px] text-ink-500">
          Page {page} of {pageCount}
        </span>
        {pageCount > 1 && (
          <button type="button" className={btn} disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>
            Next
          </button>
        )}
      </nav>

      {pageSize && onPageSizeChange && (
        <label className="flex items-center gap-2 text-[12.5px] text-ink-500">
          Rows
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className={cx('font-data h-8 rounded-md border border-line bg-surface px-2 text-[12.5px] outline-none')}
          >
            {pageSizeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
      )}
    </div>
  );
}

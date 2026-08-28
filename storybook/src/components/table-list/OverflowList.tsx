import { useState, type ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface OverflowListProps {
  /** Items in priority order — the first ones stay visible. */
  items: ReactNode[];
  /** How many to show before collapsing. */
  visibleCount?: number;
  /** Label for the collapsed group, e.g. "vendors". */
  unit?: string;
  /** 'expand' reveals behind a bordered pill; 'count' is a bold brand-coloured "+n" that expands the same way. */
  behaviour?: 'expand' | 'count';
}

/**
 * A row of items that will not always fit. The overflow is counted, never
 * silently clipped.
 */
export function OverflowList({
  items, visibleCount = 3, unit, behaviour = 'expand',
}: OverflowListProps) {
  const [open, setOpen] = useState(false);
  const shown = open ? items : items.slice(0, visibleCount);
  const hidden = items.length - shown.length;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {shown.map((item, i) => <span key={i}>{item}</span>)}
      {hidden > 0 && (
        behaviour === 'expand' ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cx('font-data rounded-pill border border-line bg-surface px-[9px] py-[3px] text-[12px] text-ink-700 hover:bg-canvas')}
          >
            +{hidden} more{unit ? ` ${unit}` : ''}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            // `.font-data` hardcodes font-weight:300 and wins the cascade over
            // `.font-bold` regardless of class order (it's declared later in
            // tailwind.css) — `!font-bold` forces the override.
            className="font-data text-[12px] !font-bold text-brand-600 hover:text-brand-800"
          >
            +{hidden}
          </button>
        )
      )}
      {open && items.length > visibleCount && (
        <button type="button" onClick={() => setOpen(false)} className="text-[12px] font-semibold text-brand-600">
          Show less
        </button>
      )}
    </div>
  );
}

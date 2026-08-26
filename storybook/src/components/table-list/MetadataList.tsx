import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface MetadataEntry {
  label: string;
  value: ReactNode;
  /** Renders the value in General Sans Light. */
  data?: boolean;
  /** Spans both columns in a two-column layout. */
  wide?: boolean;
}

export interface MetadataListProps {
  entries: MetadataEntry[];
  /** 'rows' stacks label over value; 'inline' puts them side by side. */
  layout?: 'rows' | 'inline';
  columns?: 1 | 2 | 3;
}

/** A record's attributes, read but not compared. */
export function MetadataList({ entries, layout = 'rows', columns = 2 }: MetadataListProps) {
  return (
    <dl
      className={cx(
        'm-0 grid gap-x-6 gap-y-3',
        columns === 1 && 'grid-cols-1',
        columns === 2 && 'grid-cols-2',
        columns === 3 && 'grid-cols-3',
      )}
    >
      {entries.map((e) => (
        <div
          key={e.label}
          className={cx(
            'flex',
            layout === 'rows' ? 'flex-col gap-[2px]' : 'items-baseline justify-between gap-3',
            e.wide && 'col-span-full',
          )}
        >
          <dt className="text-[11.5px] text-ink-500">{e.label}</dt>
          <dd className={cx('m-0 text-[13px]', e.data && 'font-data')}>{e.value}</dd>
        </div>
      ))}
    </dl>
  );
}

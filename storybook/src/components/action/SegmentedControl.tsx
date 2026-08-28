import { cx } from '../../lib/cx';

export interface Segment {
  value: string;
  label: string;
  /** Count or badge shown after the label. */
  meta?: string;
}

export interface SegmentedControlProps {
  /** Two to four short options, always visible. */
  segments: Segment[];
  value: string;
  onChange: (value: string) => void;
  /** Required. Names what is being switched. */
  label: string;
  size?: 'sm' | 'md';
  fullWidth?: boolean;
}

export function SegmentedControl({
  segments, value, onChange, label, size = 'md', fullWidth = false,
}: SegmentedControlProps) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cx(
        'inline-flex gap-1 rounded-control bg-surface-sunken p-1',
        fullWidth && 'flex w-full',
      )}
    >
      {segments.map((s) => {
        const on = s.value === value;
        return (
          <button
            key={s.value}
            role="tab"
            type="button"
            aria-selected={on}
            onClick={() => onChange(s.value)}
            className={cx(
              'inline-flex items-center gap-2 rounded-md font-semibold transition-colors duration-fast ease-mise',
              size === 'sm' ? 'h-[26px] px-[10px] text-[12.5px]' : 'h-8 px-3 text-[13px]',
              fullWidth && 'flex-1 justify-center',
              on ? 'bg-surface text-ink-900 shadow-raised' : 'text-ink-500 hover:text-ink-700',
            )}
          >
            {s.label}
            {s.meta && (
              <span className={cx('font-data text-[11.5px]', on ? 'text-ink-900' : 'text-ink-400')}>
                {s.meta}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

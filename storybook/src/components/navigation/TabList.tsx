import { cx } from '../../lib/cx';

export interface Tab {
  value: string;
  label: string;
  count?: number;
  disabled?: boolean;
}

export interface TabListProps {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
  /** Required. Names what the tabs divide. */
  label: string;
  /** 'underline' inside a page; 'enclosed' inside a card. */
  appearance?: 'underline' | 'enclosed';
  size?: 'sm' | 'md';
}

/**
 * Views of one record. Tabs never navigate between records — that is Side Nav —
 * and never lose the operator's place when they come back.
 */
export function TabList({ tabs, value, onChange, label, appearance = 'underline', size = 'md' }: TabListProps) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cx('flex items-end gap-1', appearance === 'underline' && 'border-b border-line')}
    >
      {tabs.map((t) => {
        const on = t.value === value;
        return (
          <button
            key={t.value}
            role="tab"
            type="button"
            aria-selected={on}
            disabled={t.disabled}
            onClick={() => onChange(t.value)}
            className={cx(
              'inline-flex items-center gap-[7px] font-semibold transition-colors duration-fast ease-mise',
              size === 'sm' ? 'h-8 px-[10px] text-[12.5px]' : 'h-[38px] px-3 text-[13.5px]',
              appearance === 'underline' && 'border-b-2 -mb-px',
              appearance === 'underline' && (on ? 'border-brand-600 text-brand-600' : 'border-transparent text-ink-500 hover:text-ink-700'),
              appearance === 'enclosed' && 'rounded-t-md border border-b-0',
              appearance === 'enclosed' && (on ? 'border-line bg-surface text-ink-900' : 'border-transparent text-ink-500 hover:text-ink-700'),
              t.disabled && 'cursor-not-allowed text-ink-300',
            )}
          >
            {t.label}
            {t.count != null && (
              <span className={cx('font-data rounded-pill px-[6px] text-[11px]', on ? 'bg-brand-50 text-brand-600' : 'bg-canvas text-ink-500')}>
                {t.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

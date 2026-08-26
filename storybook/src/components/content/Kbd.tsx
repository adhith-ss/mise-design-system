import { cx } from '../../lib/cx';

export interface KbdProps {
  /** Keys in press order, e.g. ['⌘','K'] — or a single string. */
  keys: string | string[];
  size?: 'sm' | 'md';
}

/** A keyboard shortcut, shown where the operator can act on it. */
export function Kbd({ keys, size = 'md' }: KbdProps) {
  const list = Array.isArray(keys) ? keys : [keys];
  return (
    <span className="inline-flex items-center gap-[3px]">
      {list.map((k, i) => (
        <kbd
          key={k + i}
          className={cx(
            'font-data inline-flex items-center rounded-sm border border-line bg-surface text-ink-700',
            size === 'sm' ? 'h-[18px] px-[5px] text-[10.5px]' : 'h-5 px-[6px] text-[11px]',
          )}
        >
          {k}
        </kbd>
      ))}
    </span>
  );
}

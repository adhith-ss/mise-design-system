import { cx } from '../../lib/cx';

export interface CodeProps {
  children: string;
  /** Highlights the value as changed or problematic. */
  tone?: 'neutral' | 'danger';
}

/** An inline literal — a field name, an API value, an id. */
export function Code({ children, tone = 'neutral' }: CodeProps) {
  return (
    <code
      className={cx(
        'font-data rounded-sm border px-[5px] py-[1px] text-[12.5px]',
        tone === 'neutral' ? 'border-line bg-canvas text-ink-900' : 'border-danger-border bg-tone-danger-bg text-tone-danger-fg',
      )}
    >
      {children}
    </code>
  );
}

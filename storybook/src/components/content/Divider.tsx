import { cx } from '../../lib/cx';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  /** Optional label sitting in the line. */
  label?: string;
  /** 'soft' inside a card, 'default' between sections. */
  weight?: 'soft' | 'default';
  /** Vertical space above and below. */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

const SPACE = { none: '', sm: 'my-3', md: 'my-5', lg: 'my-8' } as const;

/** A rule between groups of content. Decorative unless it carries a label. */
export function Divider({ orientation = 'horizontal', label, weight = 'default', spacing = 'md' }: DividerProps) {
  if (orientation === 'vertical') {
    return <span aria-hidden="true" className={cx('inline-block h-5 w-px shrink-0', weight === 'soft' ? 'bg-line-soft' : 'bg-line')} />;
  }

  if (label) {
    return (
      <div className={cx('flex items-center gap-3', SPACE[spacing])}>
        <span aria-hidden="true" className={cx('h-px flex-1', weight === 'soft' ? 'bg-line-soft' : 'bg-line')} />
        <span className="font-data text-[11px] uppercase tracking-[0.1em] text-ink-400">{label}</span>
        <span aria-hidden="true" className={cx('h-px flex-1', weight === 'soft' ? 'bg-line-soft' : 'bg-line')} />
      </div>
    );
  }

  return <hr className={cx('h-px border-0', weight === 'soft' ? 'bg-line-soft' : 'bg-line', SPACE[spacing])} />;
}

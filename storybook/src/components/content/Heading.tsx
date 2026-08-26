import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type HeadingLevel = 1 | 2 | 3 | 4;

export interface HeadingProps {
  /** Semantic level. Never skipped — pick size separately if you need to. */
  level: HeadingLevel;
  children: ReactNode;
  /** Overrides the visual size without changing the semantic level. */
  size?: HeadingLevel;
  /** Quiet line above the heading — a record type, a section kicker. */
  eyebrow?: string;
  /** Quiet line below. */
  sub?: string;
}

const SIZE: Record<HeadingLevel, string> = {
  1: 'text-[40px] leading-[1.08] font-extrabold tracking-[-0.03em]',
  2: 'text-[30px] leading-[1.1] font-bold tracking-[-0.025em]',
  3: 'text-[24px] font-bold tracking-[-0.02em]',
  4: 'text-[17px] font-bold',
};

export function Heading({ level, children, size, eyebrow, sub }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';
  return (
    <div className="flex flex-col gap-[6px]">
      {eyebrow && (
        <span className="font-data text-[11px] uppercase tracking-[0.12em] text-ink-400">{eyebrow}</span>
      )}
      <Tag className={cx('m-0', SIZE[size ?? level])}>{children}</Tag>
      {sub && <span className="text-[13.5px] leading-[1.6] text-ink-500">{sub}</span>}
    </div>
  );
}

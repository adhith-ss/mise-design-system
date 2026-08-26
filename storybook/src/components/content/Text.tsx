import type { ElementType, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface TextProps {
  children: ReactNode;
  /** 14 / 13 / 12px — body, dense, meta. */
  size?: 'body' | 'dense' | 'meta';
  tone?: 'default' | 'muted' | 'quiet' | 'danger' | 'brand';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  /** General Sans Light — for amounts, counts, IDs. */
  data?: boolean;
  /** Caps the measure at 64 characters for readability. */
  measure?: boolean;
  as?: ElementType;
}

const SIZE = {
  body: 'text-[14px] leading-[1.68]',
  dense: 'text-[13px] leading-[1.6]',
  meta: 'text-[12px] leading-[1.5]',
} as const;

const TONE = {
  default: 'text-ink-900',
  muted: 'text-ink-700',
  quiet: 'text-ink-500',
  danger: 'text-danger',
  brand: 'text-brand-600',
} as const;

const WEIGHT = {
  regular: 'font-normal', medium: 'font-medium', semibold: 'font-semibold', bold: 'font-bold',
} as const;

export function Text({
  children, size = 'body', tone = 'default', weight = 'regular',
  data = false, measure = false, as,
}: TextProps) {
  const Tag = (as ?? 'p') as ElementType;
  return (
    <Tag
      className={cx('m-0', SIZE[size], TONE[tone], WEIGHT[weight], data && 'font-data', measure && 'max-w-[64ch]')}
      style={measure ? { textWrap: 'pretty' } : undefined}
    >
      {children}
    </Tag>
  );
}

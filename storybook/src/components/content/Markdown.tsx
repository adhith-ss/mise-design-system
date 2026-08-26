import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface MarkdownProps {
  /** Rendered markdown output. The host app supplies the parser. */
  children: ReactNode;
  /** Caps the measure at 70 characters. */
  measure?: boolean;
  size?: 'body' | 'dense';
}

/**
 * The typographic frame for rendered markdown — agent answers, vendor notes,
 * policy text. Owns the vertical rhythm so a parsed document matches the system.
 */
export function Markdown({ children, measure = true, size = 'body' }: MarkdownProps) {
  return (
    <div
      className={cx(
        'flex flex-col',
        size === 'body' ? 'text-[14px] leading-[1.68]' : 'text-[13px] leading-[1.6]',
        measure && 'max-w-[70ch]',
        '[&>*]:m-0 [&>*+*]:mt-[14px]',
        '[&_h2]:text-[17px] [&_h2]:font-bold [&_h2]:tracking-[-0.01em] [&_h2+*]:mt-2',
        '[&_h3]:text-[14px] [&_h3]:font-bold',
        '[&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-[6px] [&_ul]:pl-5',
        '[&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-[6px] [&_ol]:pl-5',
        '[&_li::marker]:text-ink-400',
        '[&_a]:font-semibold [&_a]:text-brand-600 [&_a]:underline [&_a]:decoration-brand-200 [&_a]:underline-offset-2',
        '[&_strong]:font-semibold',
        '[&_code]:font-data [&_code]:rounded-sm [&_code]:border [&_code]:border-line [&_code]:bg-canvas [&_code]:px-[5px] [&_code]:py-px [&_code]:text-[12.5px]',
        '[&_table]:w-full [&_table]:border-collapse [&_table]:text-[13px]',
        '[&_th]:border-b [&_th]:border-line [&_th]:pb-2 [&_th]:text-left [&_th]:text-[11px] [&_th]:uppercase [&_th]:tracking-[0.05em] [&_th]:text-ink-500',
        '[&_td]:border-b [&_td]:border-line-soft [&_td]:py-2',
        '[&_hr]:h-px [&_hr]:border-0 [&_hr]:bg-line',
      )}
      style={{ textWrap: 'pretty' }}
    >
      {children}
    </div>
  );
}

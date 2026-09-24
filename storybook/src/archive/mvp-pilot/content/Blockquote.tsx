import type { ReactNode } from 'react';

export interface BlockquoteProps {
  children: ReactNode;
  /** Who said or wrote it. */
  attribution?: string;
  /** Where it came from — an email, a vendor agreement clause. */
  source?: string;
}

/** Quoted material from outside the product — a vendor's reply, a policy clause. */
export function Blockquote({ children, attribution, source }: BlockquoteProps) {
  return (
    <figure className="m-0 flex max-w-[64ch] flex-col gap-[10px] border-l-[3px] border-line pl-4">
      <blockquote className="m-0 text-[14px] leading-[1.7] text-ink-700">{children}</blockquote>
      {(attribution || source) && (
        <figcaption className="text-[12px] text-ink-500">
          {attribution}
          {attribution && source && ' · '}
          {source && <cite className="font-data not-italic">{source}</cite>}
        </figcaption>
      )}
    </figure>
  );
}

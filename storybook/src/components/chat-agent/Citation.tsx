import { cx } from '../../lib/cx';

export type RecordType = 'invoice' | 'order' | 'item' | 'vendor' | 'policy';

export interface CitationProps {
  /** The record's real identifier — never a bare number. */
  label: string;
  recordType: RecordType;
  href: string;
  /** 'inferred' renders in ink outline rather than brand green. */
  confidence?: 'exact' | 'inferred';
}

export function Citation({ label, recordType, href, confidence = 'exact' }: CitationProps) {
  return (
    <a
      href={href}
      aria-label={`${recordType} ${label}`}
      className={cx(
        'font-data align-[2px] rounded-sm border px-[5px] py-px text-[11.5px] no-underline',
        confidence === 'exact'
          ? 'border-brand-200 bg-brand-50 text-brand-600'
          : 'border-line bg-surface text-ink-500',
      )}
    >
      {label}
    </a>
  );
}

import { cx } from '../../lib/cx';

export interface ThumbnailProps {
  /** Required. Describes the document or photo, from the upload record. */
  alt: string;
  src?: string;
  /** 40 / 56 / 80px. */
  size?: 'sm' | 'md' | 'lg';
  /** Shown at the corner for documents, e.g. "PDF". */
  kind?: string;
  /** Page count for multi-page scans. */
  pages?: number;
  onClick?: () => void;
}

const DIM = { sm: 'h-10 w-10', md: 'h-14 w-14', lg: 'h-20 w-20' } as const;

/** A preview of an attached document or photo, opening into a Lightbox. */
export function Thumbnail({ alt, src, size = 'md', kind, pages, onClick }: ThumbnailProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${alt}${pages ? `, ${pages} pages` : ''}`}
      className={cx(
        'relative overflow-hidden rounded-md border border-line bg-surface-sunken',
        DIM[size],
        onClick && 'cursor-zoom-in hover:border-brand-200',
      )}
    >
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-full w-full items-center justify-center"
          style={{ background: 'repeating-linear-gradient(135deg,#F1EFE9 0 6px,#EAE7DE 6px 12px)' }}
        >
          {kind && <span className="font-data text-[10px] uppercase text-ink-500">{kind}</span>}
        </span>
      )}
      {pages && pages > 1 && (
        <span className="font-data absolute bottom-[2px] right-[2px] rounded-sm bg-ink-900/80 px-[4px] text-[9px] text-white">
          {pages}
        </span>
      )}
    </button>
  );
}

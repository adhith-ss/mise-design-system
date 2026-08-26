import { cx } from '../../lib/cx';
import { X } from 'lucide-react';

export interface LightboxItem {
  /** Image or PDF preview source. */
  src?: string;
  alt: string;
  caption?: string;
}

export interface LightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: LightboxItem[];
  index: number;
  onIndexChange: (index: number) => void;
  /** File name, used as the dialog's label. */
  name: string;
  /** Record the file is attached to, e.g. "INV-20841". */
  record?: string;
  download?: boolean;
  thumbnails?: boolean;
}

/** Full-size view of an invoice scan or delivery photo, with paging through the set. */
export function Lightbox({
  open, onOpenChange, items, index, onIndexChange, name, record, download = true, thumbnails = true,
}: LightboxProps) {
  if (!open) return null;
  const item = items[index];

  return (
    <div role="dialog" aria-modal="true" aria-label={name}
      className="flex flex-col gap-[14px] rounded-lg bg-ink-900 p-5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[2px]">
          <span className="text-[13.5px] font-semibold text-white">{name}</span>
          <span className="font-data text-[11.5px] text-ink-300">
            Page {index + 1} of {items.length}{record ? ` · ${record}` : ''}
          </span>
        </div>
        <div className="flex gap-2">
          {download && (
            <button type="button" className="h-[30px] rounded-[9px] border border-ink-700/60 px-[11px] text-[12.5px] font-semibold text-ink-300">
              Download
            </button>
          )}
          <button type="button" aria-label="Close" onClick={() => onOpenChange(false)}
            className="h-[30px] w-[30px] rounded-[9px] border border-ink-700/60 text-[14px] text-ink-300">
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="flex h-[200px] items-center justify-center rounded-lg"
        style={{ background: 'repeating-linear-gradient(135deg,#1C2822 0 10px,#202D26 10px 20px)' }}>
        {item.src ? (
          <img src={item.src} alt={item.alt} className="max-h-full max-w-full object-contain" />
        ) : (
          <span className="font-data rounded-md border border-ink-700/60 bg-ink-900 px-[11px] py-[7px] text-[12px] text-ink-400">
            {item.alt}
          </span>
        )}
      </div>

      {thumbnails && (
        <div className="flex justify-center gap-2">
          {items.map((it, i) => (
            <button
              key={it.alt}
              type="button"
              aria-label={`Page ${i + 1}`}
              aria-current={i === index || undefined}
              onClick={() => onIndexChange(i)}
              className={cx('h-6 w-[34px] rounded-[5px] border', i === index ? 'border-brand-500 bg-ink-700/40' : 'border-ink-700/60 bg-ink-900')}
            />
          ))}
        </div>
      )}
    </div>
  );
}

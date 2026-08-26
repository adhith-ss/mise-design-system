import { cx } from '../../lib/cx';
import { X } from 'lucide-react';

export interface TokenProps {
  /** The record's identifier or short value. */
  children: string;
  /** Adds a leading type marker, e.g. "PO". */
  prefix?: string;
  tone?: 'neutral' | 'brand' | 'warning' | 'danger';
  onRemove?: () => void;
  size?: 'sm' | 'md';
}

/**
 * An inline reference to a record — a PO number, an SKU, a filter value.
 * Distinct from Badge, which describes a state rather than naming a thing.
 */
export function Token({ children, prefix, tone = 'neutral', onRemove, size = 'md' }: TokenProps) {
  return (
    <span
      className={cx(
        'font-data inline-flex items-center gap-[5px] rounded-sm border',
        size === 'sm' ? 'px-[6px] py-[1px] text-[11px]' : 'px-[7px] py-[2px] text-[12.5px]',
        tone === 'neutral' && 'border-line bg-surface text-ink-700',
        tone === 'brand' && 'border-brand-200 bg-brand-50 text-brand-600',
        tone === 'warning' && 'border-warn bg-tone-warning-bg text-tone-warning-fg',
        tone === 'danger' && 'border-danger-border bg-tone-danger-bg text-tone-danger-fg',
      )}
    >
      {prefix && <span className="text-ink-400">{prefix}</span>}
      {children}
      {onRemove && (
        <button type="button" onClick={onRemove} aria-label={`Remove ${children}`} className="text-[12px] leading-none">
          <X size={12} strokeWidth={1.5} />
        </button>
      )}
    </span>
  );
}

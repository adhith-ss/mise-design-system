import type { LucideIcon } from 'lucide-react';
import { cx } from '../../lib/cx';

export interface IconProps {
  /** A Lucide icon component — the whole set is at lucide.dev. */
  icon: LucideIcon;
  /** 14 / 16 / 20px. Stroke scales with the box, as it does in the SVG. */
  size?: 'sm' | 'md' | 'lg';
  /** Decorative icons stay hidden; a label makes it role="img". */
  label?: string;
  tone?: 'current' | 'quiet' | 'brand' | 'danger';
  className?: string;
}

const DIM = { sm: 14, md: 16, lg: 20 } as const;

/**
 * Fixes size, stroke and accessibility for any Lucide icon. Lucide ships at
 * stroke-width 2; this system uses 1.5, which is the only place that decision
 * lives. An icon is never the only carrier of meaning.
 */
export function Icon({ icon: Glyph, size = 'md', label, tone = 'current', className }: IconProps) {
  return (
    <Glyph
      size={DIM[size]}
      strokeWidth={1.5}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cx(
        'shrink-0',
        tone === 'quiet' && 'text-ink-400',
        tone === 'brand' && 'text-brand-600',
        tone === 'danger' && 'text-danger',
        className,
      )}
    />
  );
}

import { cx } from '../../lib/cx';

export interface IconProps {
  /** 14 / 16 / 20px. Icons are 1.5px stroke on a 24px grid. */
  size?: 'sm' | 'md' | 'lg';
  /** Decorative icons are hidden; meaningful ones need a label. */
  label?: string;
  tone?: 'current' | 'quiet' | 'brand' | 'danger';
  children: React.ReactNode;
}

const DIM = { sm: 14, md: 16, lg: 20 } as const;

/**
 * Wrapper that fixes size, stroke, and accessibility for any 24-grid SVG path.
 * An icon is never the only carrier of meaning.
 */
export function Icon({ size = 'md', label, tone = 'current', children }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={DIM[size]}
      height={DIM[size]}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cx(
        'shrink-0',
        tone === 'quiet' && 'text-ink-400',
        tone === 'brand' && 'text-brand-600',
        tone === 'danger' && 'text-danger',
      )}
    >
      {children}
    </svg>
  );
}

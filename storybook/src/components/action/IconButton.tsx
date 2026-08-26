import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type IconButtonVariant = 'ghost' | 'outline' | 'solid' | 'danger';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required. Names the action, matching the tooltip. */
  'aria-label': string;
  /** Required. 16px at md, 14px at sm. */
  icon: ReactNode;
  /** Ghost inside toolbars and rows; outline when it stands alone. */
  variant?: IconButtonVariant;
  /** 32 / 40px square. */
  size?: 'sm' | 'md';
  /** Persistent pressed appearance; sets aria-pressed. */
  selected?: boolean;
  loading?: boolean;
  /** Convenience: renders a native title on hover and focus. Prefer a real Tooltip. */
  tooltip?: string;
}

const VARIANT: Record<IconButtonVariant, string> = {
  ghost: 'bg-transparent text-ink-700 hover:bg-canvas',
  outline: 'border border-line bg-surface text-ink-700 hover:bg-canvas',
  solid: 'bg-brand-600 text-white hover:bg-brand-800',
  danger: 'bg-transparent text-danger hover:bg-danger-bg',
};

export function IconButton({
  icon, variant = 'ghost', size = 'md', selected = false, loading = false,
  tooltip, disabled, className, ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      title={tooltip}
      aria-pressed={selected || undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-md transition-colors duration-fast ease-mise',
        'focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand-600 focus-visible:ring-[3px] focus-visible:ring-brand-50',
        'disabled:cursor-not-allowed disabled:bg-transparent disabled:text-ink-300',
        size === 'sm' ? 'h-sm w-sm text-[14px]' : 'h-md w-md text-[16px]',
        VARIANT[variant],
        selected && 'bg-brand-50 text-brand-600',
        className,
      )}
      {...rest}
    >
      {loading ? (
        <span aria-hidden="true" className="h-[14px] w-[14px] rounded-pill border-2 border-current border-r-transparent motion-safe:animate-spin" />
      ) : (
        icon
      )}
    </button>
  );
}

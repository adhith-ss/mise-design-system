import type { ButtonHTMLAttributes, ElementType, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type ButtonVariant = 'primary' | 'secondary' | 'neutral' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Visual weight. One primary per view. */
  variant?: ButtonVariant;
  /** 32 / 40 / 44px heights. lg is for marketing pages only. */
  size?: ButtonSize;
  /** The label. Verb first, sentence case, no full stop. */
  children: ReactNode;
  /** Leading icon, 16px. Never the only content — use IconButton for that. */
  icon?: ReactNode;
  /** Trailing icon; reserved for split and menu triggers. */
  trailingIcon?: ReactNode;
  /** Shows a spinner, keeps the label, blocks repeat clicks. */
  loading?: boolean;
  /** Fills the container; used in narrow panels. */
  fullWidth?: boolean;
  /** Renders an anchor styled as a button. Only for real navigation. */
  href?: string;
  /** Escape hatch for router components. */
  as?: ElementType;
}

const VARIANT: Record<ButtonVariant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-800 active:bg-brand-900',
  secondary: 'border border-brand-200 bg-surface text-brand-600 hover:bg-brand-50',
  neutral: 'border border-line bg-surface text-ink-700 hover:bg-canvas',
  danger: 'border border-danger-border bg-surface text-danger hover:bg-danger-bg',
  ghost: 'bg-transparent text-ink-700 hover:bg-canvas',
};

const SIZE: Record<ButtonSize, string> = {
  sm: 'h-sm rounded-md px-3 text-[13px]',
  md: 'h-md rounded-control px-[14px] text-[14px]',
  lg: 'h-lg rounded-control px-4 text-[15px]',
};

export function Button({
  variant = 'neutral', size = 'md', children, icon, trailingIcon,
  loading = false, fullWidth = false, href, as, disabled, className, ...rest
}: ButtonProps) {
  const Tag = (as ?? (href ? 'a' : 'button')) as ElementType;

  return (
    <Tag
      href={href}
      type={Tag === 'button' ? (rest.type ?? 'button') : undefined}
      disabled={Tag === 'button' ? disabled || loading : undefined}
      aria-busy={loading || undefined}
      className={cx(
        'inline-flex items-center justify-center gap-2 font-semibold no-underline transition-colors duration-fast ease-mise',
        'focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand-600 focus-visible:ring-[3px] focus-visible:ring-brand-50',
        'disabled:cursor-not-allowed disabled:border-transparent disabled:bg-neutral-200 disabled:text-ink-400',
        SIZE[size], VARIANT[variant], fullWidth && 'w-full', className,
      )}
      {...rest}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="h-[14px] w-[14px] shrink-0 rounded-pill border-2 border-current border-r-transparent motion-safe:animate-spin"
        />
      ) : (
        icon
      )}
      {children}
      {trailingIcon}
    </Tag>
  );
}

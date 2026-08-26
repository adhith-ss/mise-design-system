import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { ArrowUpRight } from 'lucide-react';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  /** 'inline' underlines within prose; 'standalone' sits on its own. */
  variant?: 'inline' | 'standalone' | 'quiet';
  /** Adds the external marker and the accessible hint. */
  external?: boolean;
  size?: 'sm' | 'md';
}

/**
 * Navigation to another place. If the click changes data, it is a Button,
 * whatever it looks like.
 */
export function Link({
  children, variant = 'inline', external = false, size = 'md', className, ...rest
}: LinkProps) {
  return (
    <a
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      className={cx(
        'font-semibold text-brand-600 transition-colors duration-fast ease-mise hover:text-brand-700',
        'focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand-600 focus-visible:ring-[3px] focus-visible:ring-brand-50',
        size === 'sm' ? 'text-[12.5px]' : 'text-[14px]',
        variant === 'inline' && 'underline decoration-brand-200 underline-offset-2 hover:decoration-brand-600',
        variant === 'quiet' && 'font-medium text-ink-700 no-underline hover:text-brand-600',
        variant === 'standalone' && 'no-underline hover:underline',
        className,
      )}
      {...rest}
    >
      {children}
      {external && (
        <>
          <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" className="ml-[2px] inline-block align-[-2px]" />
          <span className="sr-only"> (opens in a new tab)</span>
        </>
      )}
    </a>
  );
}

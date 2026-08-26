import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface ToggleButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Pressed state. Controlled. */
  pressed: boolean;
  onPressedChange?: (pressed: boolean) => void;
  children: ReactNode;
  icon?: ReactNode;
  size?: 'sm' | 'md';
}

export function ToggleButton({
  pressed, onPressedChange, children, icon, size = 'md', disabled, className, ...rest
}: ToggleButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      onClick={() => onPressedChange?.(!pressed)}
      className={cx(
        'inline-flex items-center gap-2 border font-semibold transition-colors duration-fast ease-mise',
        'focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand-600 focus-visible:ring-[3px] focus-visible:ring-brand-50',
        'disabled:cursor-not-allowed disabled:border-line-soft disabled:bg-canvas disabled:text-ink-300',
        size === 'sm' ? 'h-sm rounded-md px-3 text-[13px]' : 'h-md rounded-control px-[14px] text-[14px]',
        pressed
          ? 'border-brand-600 bg-brand-50 text-brand-600'
          : 'border-line bg-surface text-ink-700 hover:bg-canvas',
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}

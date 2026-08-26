import { cx } from '../../lib/cx';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  /** Required unless the spinner sits inside an element that is already labelled. */
  label?: string;
  /** Shows the label beside the spinner rather than only to screen readers. */
  showLabel?: boolean;
  tone?: 'brand' | 'ink' | 'inverse';
}

/**
 * Work under two seconds with no nameable steps. Anything longer gets a Progress
 * Bar or an Agent Status step — a spinner tells the operator nothing.
 */
export function Spinner({ size = 'md', label = 'Loading', showLabel = false, tone = 'brand' }: SpinnerProps) {
  const dim = size === 'sm' ? 'h-[14px] w-[14px] border-2' : size === 'lg' ? 'h-6 w-6 border-[3px]' : 'h-[18px] w-[18px] border-2';

  return (
    <span className="inline-flex items-center gap-[9px]" role="status">
      <span
        aria-hidden="true"
        className={cx(
          'inline-block shrink-0 rounded-pill border-r-transparent motion-safe:animate-spin',
          dim,
          tone === 'brand' && 'border-brand-600',
          tone === 'ink' && 'border-ink-500',
          tone === 'inverse' && 'border-white',
        )}
      />
      <span className={showLabel ? 'text-[12.5px] text-ink-500' : 'sr-only'}>{label}</span>
    </span>
  );
}

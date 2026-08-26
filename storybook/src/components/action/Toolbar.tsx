import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface ToolbarProps {
  /** Controls and <ToolbarDivider /> elements, in reading order. */
  children: ReactNode;
  /** Required. Names what the toolbar acts on. */
  label: string;
  orientation?: 'horizontal' | 'vertical';
  density?: 'compact' | 'default';
}

/**
 * A horizontal band of controls acting on the content below it. One tab stop:
 * arrows move between controls inside it, Tab leaves.
 */
export function Toolbar({
  children, label, orientation = 'horizontal', density = 'default',
}: ToolbarProps) {
  return (
    <div
      role="toolbar"
      aria-label={label}
      aria-orientation={orientation}
      className={cx(
        'flex items-center rounded-control border border-line bg-surface',
        orientation === 'vertical' && 'flex-col',
        density === 'compact' ? 'gap-1 p-1' : 'gap-2 p-[6px]',
      )}
    >
      {children}
    </div>
  );
}

export function ToolbarDivider({ orientation = 'horizontal' }: { orientation?: 'horizontal' | 'vertical' }) {
  return (
    <span
      aria-hidden="true"
      className={cx('bg-line-soft', orientation === 'vertical' ? 'h-px w-full' : 'h-5 w-px')}
    />
  );
}

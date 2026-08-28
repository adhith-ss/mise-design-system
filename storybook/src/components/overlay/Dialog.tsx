import { useEffect, useRef, type ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { X } from 'lucide-react';

export interface DialogProps {
  open: boolean;
  /** Fires for every route out, including Escape and the backdrop. */
  onOpenChange: (open: boolean) => void;
  /** Required. Labels the dialog for assistive tech. */
  title: string;
  /** Record context under the title. */
  description?: ReactNode;
  children: ReactNode;
  /** Action row. Primary action last in DOM order. */
  footer?: ReactNode;
  /** 400 / 520 / 680px. */
  size?: 'sm' | 'md' | 'lg';
  /** False while a save is in flight. */
  dismissible?: boolean;
  /** Set false when the dialog holds unsaved edits. */
  closeOnBackdrop?: boolean;
}

const WIDTH = { sm: 'w-[400px]', md: 'w-[520px]', lg: 'w-[680px]' } as const;

/**
 * A focused task that must finish or be abandoned. Anything longer than a
 * screenful belongs on a page instead.
 */
export function Dialog({
  open, onOpenChange, title, description, children, footer,
  size = 'md', dismissible = true, closeOnBackdrop = true,
}: DialogProps) {
  const surface = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape' && dismissible) onOpenChange(false); };
    document.addEventListener('keydown', esc);
    surface.current?.querySelector<HTMLElement>('button, input, select, textarea, a[href]')?.focus();
    return () => document.removeEventListener('keydown', esc);
  }, [open, dismissible, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'var(--mise-scrim)' }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && closeOnBackdrop && dismissible) onOpenChange(false);
      }}
    >
      <div
        ref={surface}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cx('max-h-[80vh] overflow-hidden rounded-xl bg-surface shadow-overlay', WIDTH[size])}
      >
        <div className="flex items-start justify-between gap-4 px-5 pb-[14px] pt-[18px]">
          <div className="flex flex-col gap-[3px]">
            <h2 className="m-0 text-[17px] font-bold">{title}</h2>
            {description && <span className="text-[12.5px] text-ink-500">{description}</span>}
          </div>
          {dismissible && (
            <button
              type="button"
              aria-label="Close"
              onClick={() => onOpenChange(false)}
              className="shrink-0 text-ink-500 transition-colors duration-fast ease-mise hover:text-ink-900"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          )}
        </div>
        <div className="max-h-[60vh] overflow-auto px-5 pb-[18px] pt-1">{children}</div>
        {footer && (
          <div className="flex justify-end gap-[10px] border-t border-line-soft bg-surface-raised px-5 py-[14px]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

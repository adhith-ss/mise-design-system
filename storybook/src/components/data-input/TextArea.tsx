import type { TextareaHTMLAttributes } from 'react';
import { useField } from './Field';
import { cx } from '../../lib/cx';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visible rows before it scrolls. */
  rows?: number;
  /** Shows a live character count against maxLength. */
  showCount?: boolean;
  invalid?: boolean;
}

export function TextArea({
  rows = 4, showCount = false, invalid, maxLength, value, className, ...rest
}: TextAreaProps) {
  const field = useField();
  const length = typeof value === 'string' ? value.length : undefined;

  return (
    <div className="flex flex-col gap-1">
      <textarea
        id={field?.id}
        rows={rows}
        maxLength={maxLength}
        value={value}
        aria-describedby={field?.describedBy}
        aria-invalid={invalid ?? field?.invalid ? true : undefined}
        required={field?.required}
        disabled={field?.disabled || rest.disabled}
        className={cx(
          'w-full resize-y rounded-control border bg-surface px-3 py-[10px] text-[14px] leading-[1.6] text-ink-900 outline-none transition-colors duration-fast ease-mise',
          'placeholder:text-ink-400 focus:border-brand-600 focus:ring-[3px] focus:ring-brand-50',
          'disabled:cursor-not-allowed disabled:bg-canvas disabled:text-ink-400',
          invalid ?? field?.invalid ? 'border-2 border-danger' : 'border-line',
          className,
        )}
        {...rest}
      />
      {showCount && maxLength && (
        <span className="font-data self-end text-[11.5px] text-ink-400">
          {length ?? 0} / {maxLength}
        </span>
      )}
    </div>
  );
}

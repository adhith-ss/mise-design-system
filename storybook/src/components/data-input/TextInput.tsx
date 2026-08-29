import type { InputHTMLAttributes } from 'react';
import { controlClass, useField } from './Field';
import { cx } from '../../lib/cx';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Renders in Roboto Mono Light — for IDs, codes, and amounts. */
  data?: boolean;
  invalid?: boolean;
}

export function TextInput({ data = false, invalid, className, ...rest }: TextInputProps) {
  const field = useField();

  // Read-only is a fact, not an editable field — showing the input bar around
  // it invites a click that does nothing. Render the value as plain text at
  // the same height instead, so it still lines up with editable siblings.
  if (rest.readOnly) {
    return (
      <span
        id={field?.id}
        aria-describedby={field?.describedBy}
        className={cx('flex h-md w-full items-center text-[14px] text-ink-900', data && 'font-data', className)}
      >
        {rest.value ?? rest.defaultValue}
      </span>
    );
  }

  return (
    <input
      id={field?.id}
      aria-describedby={field?.describedBy}
      aria-invalid={invalid ?? field?.invalid ? true : undefined}
      required={field?.required}
      disabled={field?.disabled || rest.disabled}
      className={cx(controlClass(invalid ?? field?.invalid), data && 'font-data', className)}
      {...rest}
    />
  );
}

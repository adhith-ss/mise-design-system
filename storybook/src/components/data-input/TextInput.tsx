import type { InputHTMLAttributes } from 'react';
import { controlClass, useField } from './Field';
import { cx } from '../../lib/cx';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Renders in General Sans Light — for IDs, codes, and amounts. */
  data?: boolean;
  invalid?: boolean;
}

export function TextInput({ data = false, invalid, className, ...rest }: TextInputProps) {
  const field = useField();
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

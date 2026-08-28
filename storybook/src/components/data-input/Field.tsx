import { createContext, useContext, useId, type ReactNode } from 'react';
import { cx } from '../../lib/cx';

interface FieldContext {
  id: string;
  describedBy?: string;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
}

const Ctx = createContext<FieldContext | null>(null);

/** Reads the surrounding Field so a control wires its own a11y attributes. */
export function useField() {
  return useContext(Ctx);
}

export interface FieldProps {
  /** Always visible. Placeholders are not labels. */
  label: string;
  children: ReactNode;
  /** Guidance shown before the operator makes a mistake. */
  hint?: string;
  /** Replaces the hint and states how to fix the problem. */
  error?: string;
  /** Marks the control required, and adds the visible marker. */
  required?: boolean;
  disabled?: boolean;
  /** Unit or count shown to the right of the label, e.g. "cases". */
  suffix?: string;
}

export function Field({
  label, children, hint, error, required = false, disabled = false, suffix,
}: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <Ctx.Provider
      value={{
        id,
        describedBy: [errorId, hintId].filter(Boolean).join(' ') || undefined,
        invalid: Boolean(error),
        required,
        disabled,
      }}
    >
      <div className="flex flex-col gap-[7px]">
        <div className="flex items-baseline gap-2">
          <label htmlFor={id} className={cx('text-[13px] font-semibold', disabled && 'text-ink-400')}>
            {label}
            {required && <span aria-hidden="true" className="ml-1 text-danger">*</span>}
          </label>
          {suffix && <span className="font-data ml-auto text-[12px] text-ink-400">{suffix}</span>}
        </div>
        {children}
        {error ? (
          <span id={errorId} className="text-[12px] leading-[1.5] text-danger">{error}</span>
        ) : (
          hint && <span id={hintId} className="text-[12px] leading-[1.5] text-ink-500">{hint}</span>
        )}
      </div>
    </Ctx.Provider>
  );
}

/** Shared control chrome, so every input in the category matches. */
export const controlClass = (invalid?: boolean) =>
  cx(
    'h-md w-full rounded-control border bg-surface px-3 text-[14px] text-ink-900 outline-none transition-colors duration-fast ease-mise',
    'placeholder:text-ink-400',
    'focus:border-brand-600 focus:ring-[3px] focus:ring-brand-50',
    'disabled:cursor-not-allowed disabled:bg-canvas disabled:text-ink-400',
    invalid ? 'border-2 border-danger' : 'border-line',
  );

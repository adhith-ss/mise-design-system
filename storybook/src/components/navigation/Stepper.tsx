import { cx } from '../../lib/cx';
import { Check } from 'lucide-react';

export interface Step {
  label: string;
  /** Short description under the label. */
  detail?: string;
  status: 'done' | 'current' | 'upcoming' | 'error';
}

export interface StepperProps {
  steps: Step[];
  orientation?: 'horizontal' | 'vertical';
  /** Lets the operator jump back to a completed step. */
  onStepClick?: (index: number) => void;
}

/** A task with a fixed order — onboarding a vendor, closing a period. */
export function Stepper({ steps, orientation = 'horizontal', onStepClick }: StepperProps) {
  const current = steps.findIndex((s) => s.status === 'current');

  return (
    <ol
      aria-label="Progress"
      className={cx('flex list-none p-0', orientation === 'vertical' ? 'flex-col' : 'items-start gap-6')}
    >
      {steps.map((s, i) => {
        const clickable = onStepClick && s.status === 'done';
        // The connector leads *into* a step — it sits before the circle, not
        // after it, so a completed step visibly reads as "arrived at" rather
        // than "about to leave." It's filled in once the step it leads into
        // has actually been completed.
        const connector = i > 0 && (
          <span
            aria-hidden="true"
            className={cx(
              s.status === 'done' ? 'bg-brand-600' : 'bg-line',
              orientation === 'horizontal' ? 'mt-[10px] h-px flex-1 self-start' : 'ml-[10px] h-[14px] w-px',
            )}
          />
        );
        const circle = (
          <span
            aria-hidden="true"
            className={cx(
              'flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-pill border text-[11px] font-bold',
              s.status === 'done' && 'border-brand-600 bg-brand-600 text-white',
              s.status === 'current' && 'border-brand-600 bg-brand-50 text-brand-600',
              s.status === 'upcoming' && 'border-line bg-surface text-ink-400',
              s.status === 'error' && 'border-danger bg-danger text-white',
            )}
          >
            {s.status === 'done' ? <Check size={12} strokeWidth={2.5} /> : s.status === 'error' ? '!' : i + 1}
          </span>
        );
        const text = (
          <span className="flex flex-col gap-[2px]">
            <span
              onClick={clickable ? () => onStepClick?.(i) : undefined}
              className={cx(
                'text-[13.5px]',
                s.status === 'current' ? 'font-bold text-ink-900' : 'font-medium',
                s.status === 'upcoming' && 'text-ink-400',
                s.status === 'error' && 'text-danger',
                clickable && 'cursor-pointer hover:text-brand-600',
              )}
            >
              {s.label}
            </span>
            {s.detail && <span className="text-[12px] leading-[1.5] text-ink-500">{s.detail}</span>}
          </span>
        );

        return (
          <li
            key={s.label}
            aria-current={s.status === 'current' ? 'step' : undefined}
            className={cx('flex gap-[10px]', orientation === 'horizontal' ? 'flex-1 items-start' : 'flex-col')}
          >
            {orientation === 'horizontal' ? (
              <>
                {connector}
                {circle}
                {text}
              </>
            ) : (
              <>
                {connector}
                <span className={cx('flex gap-[10px]', i < steps.length - 1 && 'pb-[14px]')}>
                  {circle}
                  {text}
                </span>
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}

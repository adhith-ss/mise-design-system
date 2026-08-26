import { useField } from './Field';
import { cx } from '../../lib/cx';

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Formats the live value shown beside the track. */
  format?: (value: number) => string;
  /** Labels under the ends of the track. */
  minLabel?: string;
  maxLabel?: string;
  disabled?: boolean;
}

/**
 * An approximate value where the exact number matters less than the direction —
 * a par-level threshold, a tolerance. Anything the operator must type exactly is
 * a Number Input.
 */
export function Slider({
  value, onChange, min = 0, max = 100, step = 1, format, minLabel, maxLabel, disabled,
}: SliderProps) {
  const field = useField();
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <input
          id={field?.id}
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled ?? field?.disabled}
          aria-describedby={field?.describedBy}
          aria-valuetext={format ? format(value) : undefined}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            background: `linear-gradient(to right, var(--mise-brand-600) ${pct}%, var(--mise-neutral-200) ${pct}%)`,
          }}
          className={cx(
            'h-[6px] flex-1 appearance-none rounded-pill outline-none',
            '[&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-pill [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-brand-600 [&::-webkit-slider-thumb]:bg-surface [&::-webkit-slider-thumb]:shadow-raised',
            'focus-visible:ring-[3px] focus-visible:ring-brand-50',
            (disabled ?? field?.disabled) && 'cursor-not-allowed opacity-60',
          )}
        />
        <span className="font-data w-[56px] text-right text-[13px]">
          {format ? format(value) : value}
        </span>
      </div>
      {(minLabel || maxLabel) && (
        <div className="flex justify-between text-[11.5px] text-ink-400">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}

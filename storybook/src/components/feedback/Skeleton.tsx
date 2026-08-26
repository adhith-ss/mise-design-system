import { cx } from '../../lib/cx';

export interface SkeletonProps {
  /** 'text' | 'block' | 'circle' */
  shape?: 'text' | 'block' | 'circle';
  width?: string | number;
  height?: string | number;
  /** Repeats the shape, with the last line shortened for text. */
  lines?: number;
}

/**
 * The shape of content that is about to arrive. It must match the real layout,
 * or the page jumps when data lands.
 */
export function Skeleton({ shape = 'text', width, height, lines = 1 }: SkeletonProps) {
  const base = 'bg-neutral-200 motion-safe:animate-pulse';
  const dims = (i: number) => ({
    width: shape === 'text' && lines > 1 && i === lines - 1 ? '60%' : width ?? '100%',
    height: height ?? (shape === 'text' ? 13 : shape === 'circle' ? 32 : 64),
  });

  return (
    <span aria-hidden="true" className="flex flex-col gap-[7px]">
      {Array.from({ length: lines }).map((_, i) => (
        <span
          key={i}
          style={dims(i)}
          className={cx(
            base,
            shape === 'text' && 'rounded-sm',
            shape === 'block' && 'rounded-lg',
            shape === 'circle' && 'rounded-pill',
          )}
        />
      ))}
    </span>
  );
}

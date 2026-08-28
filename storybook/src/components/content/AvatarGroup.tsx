import { Avatar, type AvatarProps } from './Avatar';
import { cx } from '../../lib/cx';

export interface AvatarGroupProps {
  people: Array<Pick<AvatarProps, 'name' | 'src'>>;
  /** Shows this many, then "+n". */
  max?: number;
  size?: AvatarProps['size'];
  shape?: AvatarProps['shape'];
  /** Names the group, e.g. "Approvers". */
  label: string;
}

/** Several people on one record — who approved, who is on shift. */
export function AvatarGroup({ people, max = 4, size = 'md', shape = 'round', label }: AvatarGroupProps) {
  const shown = people.slice(0, max);
  const rest = people.length - shown.length;
  const dim = size === 'sm' ? 'h-6 w-6 text-[10px]' : size === 'lg' ? 'h-10 w-10 text-[12px]' : 'h-[30px] w-[30px] text-[11px]';
  // Overlap scales with the circle, not a fixed 8px — at sm (24px) a flat 8px
  // covers a third of the circle and clips the second initial. The ring
  // border is a fixed 2px regardless of size, so it eats proportionally more
  // space at sm than at md/lg — 5px (not 4px) keeps the overlap looking as
  // tight at sm as it does at the larger sizes.
  const overlap = size === 'sm' ? '-ml-[5px]' : size === 'lg' ? '-ml-[8px]' : '-ml-[6px]';

  return (
    <div role="group" aria-label={`${label}: ${people.map((p) => p.name).join(', ')}`} className="flex items-center">
      {shown.map((p, i) => (
        <span key={p.name} className={cx('rounded-pill ring-2 ring-surface', i > 0 && overlap)}>
          <Avatar {...p} size={size} shape={shape} />
        </span>
      ))}
      {rest > 0 && (
        <span
          className={cx(
            'font-data flex items-center justify-center rounded-pill bg-surface-sunken text-ink-700 ring-2 ring-surface',
            overlap,
            dim,
          )}
        >
          +{rest}
        </span>
      )}
    </div>
  );
}

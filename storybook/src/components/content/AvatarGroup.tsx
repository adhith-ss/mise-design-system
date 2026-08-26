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

  return (
    <div role="group" aria-label={`${label}: ${people.map((p) => p.name).join(', ')}`} className="flex items-center">
      {shown.map((p, i) => (
        <span key={p.name} className={cx('rounded-pill ring-2 ring-surface', i > 0 && '-ml-[8px]')}>
          <Avatar {...p} size={size} shape={shape} />
        </span>
      ))}
      {rest > 0 && (
        <span
          className={cx(
            'font-data -ml-[8px] flex items-center justify-center rounded-pill bg-surface-sunken text-ink-700 ring-2 ring-surface',
            dim,
          )}
        >
          +{rest}
        </span>
      )}
    </div>
  );
}

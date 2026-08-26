import { cx } from '../../lib/cx';

export interface AvatarProps {
  /** Person or vendor name. Used for initials and the accessible name. */
  name: string;
  src?: string;
  /** 24 / 30 / 40px. */
  size?: 'sm' | 'md' | 'lg';
  /** 'square' for vendors and organisations, 'round' for people. */
  shape?: 'round' | 'square';
  /** Small status marker at the corner. */
  status?: 'online' | 'away' | 'offline';
}

const DIM = { sm: 'h-6 w-6 text-[10px]', md: 'h-[30px] w-[30px] text-[11px]', lg: 'h-10 w-10 text-[13px]' } as const;

function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('');
}

export function Avatar({ name, src, size = 'md', shape = 'round', status }: AvatarProps) {
  return (
    <span className="relative inline-flex shrink-0">
      {src ? (
        <img
          src={src}
          alt={name}
          className={cx('object-cover', DIM[size], shape === 'round' ? 'rounded-pill' : 'rounded-[9px]')}
        />
      ) : (
        <span
          role="img"
          aria-label={name}
          className={cx(
            'flex items-center justify-center bg-surface-sunken font-bold text-ink-700',
            DIM[size],
            shape === 'round' ? 'rounded-pill' : 'rounded-[9px]',
          )}
        >
          {initials(name)}
        </span>
      )}
      {status && (
        <span
          aria-hidden="true"
          className={cx(
            'absolute -bottom-[1px] -right-[1px] h-[9px] w-[9px] rounded-pill border-2 border-surface',
            status === 'online' && 'bg-brand-600',
            status === 'away' && 'bg-warn',
            status === 'offline' && 'bg-ink-300',
          )}
        />
      )}
    </span>
  );
}

import type { ReactNode, CSSProperties } from 'react';
import { cx } from '../../lib/cx';
import { TONE_FG, TONE_ICON, TONE_BG, TONE_STREAK, type Tone } from './tone';
import { Icon } from '../content/Icon';
import { X } from 'lucide-react';

export interface BannerProps {
  /** One sentence stating the condition. */
  title: string;
  /** What it means and what to do. */
  children?: ReactNode;
  tone?: Tone;
  /** A single action. Two actions means this should be a Dialog. */
  action?: ReactNode;
  onDismiss?: () => void;
  /** Host layout hook for stacked banners in workspace panels. */
  className?: string;
}

/**
 * A condition affecting the whole page or a whole record, staying until it is
 * resolved. Anything transient is a Toast. Warning, danger, success and info
 * carry a leading icon; the title reads in the tone's own dark accent so the
 * status is legible even before the icon or the streak border register.
 */
export function Banner({ title, children, tone = 'info', action, onDismiss, className }: BannerProps) {
  const Glyph = TONE_ICON[tone];
  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      style={{ '--mise-streak-color': TONE_STREAK[tone] } as CSSProperties}
      className={cx('mise-streak-border flex items-start gap-3 rounded-control border px-4 py-[13px]', TONE_BG[tone], className)}
    >
      {/* Decorative, not labelled — the banner's role (status/alert) plus the
          title text already carry the condition; a labelled icon here would
          have a screen reader announce the tone word twice. */}
      {tone !== 'neutral' && <Icon icon={Glyph} size="md" className={cx('mt-[1px]', TONE_FG[tone])} />}
      <div className="flex flex-1 flex-col gap-[3px]">
        <span className={cx('text-[13.5px] font-bold', TONE_FG[tone])}>{title}</span>
        {children && <span className="text-[12.5px] leading-[1.6] text-ink-700">{children}</span>}
      </div>
      {action}
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label="Dismiss" className="text-ink-500"><X size={16} strokeWidth={1.5} /></button>
      )}
    </div>
  );
}

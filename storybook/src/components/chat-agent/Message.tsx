import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type MessageRole = 'user' | 'agent' | 'system';

export interface MessageFooter {
  /** What the agent read, in the operator's words: "2 invoices". */
  sources?: string;
  /** Elapsed time in ms. Rendered as seconds to one decimal. */
  duration?: number;
}

export interface MessageProps {
  /** Sets alignment and surface. Operator turns bubble; agent turns do not. */
  role: MessageRole;
  children?: ReactNode;
  /** Shows the caret and sets aria-busy while tokens arrive. */
  streaming?: boolean;
  /** Shown on hover, and always on the day's first turn. */
  timestamp?: string;
  footer?: MessageFooter;
  /** Copy, retry, feedback. Hidden until hover or focus. */
  actions?: ReactNode;
  /** Renders the turn in the error treatment. */
  error?: boolean;
  /** Tightens gaps for the side-panel width. */
  compact?: boolean;
  /**
   * Optional leading mark for agent turns (e.g. Plato mascot).
   * Defaults to the brand square. Ignored for user/system roles.
   */
  avatar?: ReactNode;
  attachments?: ReactNode;
}

function hasVisibleBody(children: ReactNode, streaming: boolean, error: boolean) {
  if (streaming || error) return true;
  if (children == null || children === false || children === true) return false;
  if (typeof children === 'string' && children.trim() === '') return false;
  return true;
}

export function Message({
  role, children, streaming = false, timestamp, footer,
  actions, error = false, compact = false, avatar, attachments,
}: MessageProps) {
  const isUser = role === 'user';

  if (role === 'system') {
    return (
      <div className="py-2 text-center text-[12.5px] text-ink-500">{children}</div>
    );
  }

  const showBody = hasVisibleBody(children, streaming, error);

  return (
    <div
      className={cx('group flex', compact ? 'gap-2' : 'gap-3', isUser && 'justify-end')}
      aria-busy={streaming || undefined}
    >
      {!isUser && (
        avatar ? (
          <span className="mt-[3px] flex h-[26px] w-[26px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] [&_svg]:h-[26px] [&_svg]:w-[26px]">
            {avatar}
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="mt-[3px] h-[26px] w-[26px] shrink-0 rounded-[8px] bg-brand-600"
          />
        )
      )}
      <div className={cx('flex flex-col gap-2', isUser ? 'max-w-[70%]' : 'max-w-[78%]', compact && !isUser && 'max-w-[min(100%,22rem)]')}>
        <span className="sr-only">{isUser ? 'You said' : 'Mise agent said'}</span>
        {attachments}
        {showBody ? (
          <div
            className={cx(
              'text-[14px] leading-[1.68]',
              isUser && 'rounded-[16px_16px_6px_16px] border border-brand-100 bg-brand-50 px-[14px] py-3',
              error && 'rounded-lg bg-tone-danger-bg px-4 py-3',
            )}
          >
            {children}
            {streaming && (
              <span
                aria-hidden="true"
                className="ml-[3px] inline-block h-[15px] w-2 translate-y-[2px] bg-brand-600 motion-safe:animate-[mise-caret_1s_steps(1,end)_infinite]"
              />
            )}
          </div>
        ) : null}
        {footer && !streaming && (
          <span className="text-[12px] text-ink-400">
            {[footer.sources, footer.duration && `${(footer.duration / 1000).toFixed(1)}s`]
              .filter(Boolean)
              .join(' · ')}
          </span>
        )}
        {(actions || timestamp) && (
          <div className="flex items-center gap-3 opacity-0 transition-opacity duration-fast ease-mise focus-within:opacity-100 group-hover:opacity-100">
            {actions}
            {timestamp && <span className="text-[11.5px] text-ink-400">{timestamp}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

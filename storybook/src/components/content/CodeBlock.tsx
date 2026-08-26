import { cx } from '../../lib/cx';

export interface CodeBlockProps {
  children: string;
  /** Shown in the header, e.g. "HTML", "React", "JSON". */
  language?: string;
  /** Adds a copy affordance in the header. */
  copyable?: boolean;
  /** 'dark' for documentation, 'light' inside a form or panel. */
  appearance?: 'dark' | 'light';
}

/** A multi-line snippet: an integration payload, a component example. */
export function CodeBlock({ children, language, copyable = true, appearance = 'dark' }: CodeBlockProps) {
  return (
    <div className={cx('overflow-hidden rounded-lg', appearance === 'dark' ? 'bg-ink-900' : 'border border-line bg-canvas')}>
      {(language || copyable) && (
        <div className={cx('flex items-center justify-between px-4 py-[9px]', appearance === 'dark' ? 'border-b border-white/10' : 'border-b border-line')}>
          {language && (
            <span className={cx('font-data text-[11px] uppercase tracking-[0.08em]', appearance === 'dark' ? 'text-ink-400' : 'text-ink-500')}>
              {language}
            </span>
          )}
          {copyable && (
            <button
              type="button"
              className={cx('text-[11.5px] font-semibold', appearance === 'dark' ? 'text-ink-300' : 'text-brand-600')}
            >
              Copy
            </button>
          )}
        </div>
      )}
      <pre className={cx('m-0 overflow-auto px-5 py-[18px]', appearance === 'dark' ? 'text-white/85' : 'text-ink-900')}>
        <code className="font-data text-[12.5px] leading-[1.75]">{children}</code>
      </pre>
    </div>
  );
}

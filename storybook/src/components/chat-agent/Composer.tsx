import { useRef, type ChangeEvent, type KeyboardEvent, type ReactNode } from 'react';

export interface ComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend?: () => void;
  /** The location or period the agent acts on. Part of the field's description. */
  scope?: string;
  onScopeClick?: () => void;
  attachments?: ReactNode;
  maxRows?: number;
  disabled?: boolean;
  /** Blocks sending while an approval is unanswered. */
  pendingApproval?: boolean;
  onReviewApproval?: () => void;
  placeholder?: string;
}

export function Composer({
  value, onChange, onSend, scope, onScopeClick, attachments, maxRows = 6,
  disabled = false, pendingApproval = false, onReviewApproval,
  placeholder = 'Ask about orders, invoices, or vendors…',
}: ComposerProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const grow = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, maxRows * 22)}px`;
  };

  const keys = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) onSend?.();
    }
    if (e.key === 'Escape') ref.current?.blur();
  };

  return (
    <div className="flex max-w-[620px] flex-col gap-3">
      {pendingApproval && (
        <div className="flex items-center gap-[10px] rounded-xl border border-warn bg-surface px-[14px] py-3">
          <span className="flex-1 text-[13px] text-ink-700">
            One approval is waiting — answer it before sending a new instruction.
          </span>
          <button type="button" onClick={onReviewApproval} className="text-[12.5px] font-semibold text-brand-600">
            Review
          </button>
        </div>
      )}

      <div className="flex flex-col gap-[11px] rounded-xl border border-line bg-surface px-[14px] py-3 shadow-raised focus-within:border-brand-600">
        {attachments}
        <label className="sr-only" htmlFor="mise-composer">
          Message the Mise agent
        </label>
        <textarea
          id="mise-composer"
          ref={ref}
          rows={1}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={grow}
          onKeyDown={keys}
          aria-describedby={scope ? 'mise-composer-scope' : undefined}
          className="resize-none border-0 bg-transparent text-[14px] leading-[22px] text-ink-900 outline-none placeholder:text-ink-400"
        />
        <div className="flex items-center gap-[9px]">
          {scope && (
            <button
              type="button"
              id="mise-composer-scope"
              onClick={onScopeClick}
              className="flex items-center gap-[6px] rounded-pill border border-line px-[10px] py-1 text-[12px] text-ink-700"
            >
              {scope}
            </button>
          )}
          <button type="button" className="h-[30px] w-[30px] rounded-md border border-line bg-surface text-[14px] text-ink-700" aria-label="Attach an invoice or photo">
            +
          </button>
          <button
            type="button"
            onClick={onSend}
            disabled={disabled || !value.trim()}
            className="ml-auto h-8 rounded-md bg-brand-600 px-[14px] text-[13px] font-semibold text-white transition-colors duration-fast ease-mise hover:bg-brand-700 disabled:bg-ink-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export interface Suggestion {
  label: string;
  /** The intent handed to the agent when picked. */
  intent: string;
  disabled?: boolean;
}

export interface SuggestionChipsProps {
  items: Suggestion[];
  onSelect?: (intent: string) => void;
  /** Hard cap. Four is the maximum the operator will read. */
  max?: number;
  label?: string;
}

export function SuggestionChips({
  items, onSelect, max = 4, label = 'Suggested next steps',
}: SuggestionChipsProps) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-[9px]">
      {items.slice(0, max).map((s) => (
        <button
          key={s.label}
          type="button"
          disabled={s.disabled}
          onClick={() => onSelect?.(s.intent)}
          className="h-[34px] whitespace-nowrap rounded-pill border border-line bg-surface px-[13px] text-[13px] font-semibold text-ink-900 transition-colors duration-fast ease-mise hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:border-line-soft disabled:bg-canvas disabled:text-ink-300"
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

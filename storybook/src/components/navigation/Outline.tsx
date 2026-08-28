import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface OutlineItem {
  id: string;
  label: string;
  /** 2 or 3 — heading depth. */
  level?: 2 | 3;
  /** Leading glyph, 14px — a section's icon rather than just its heading text. */
  icon?: ReactNode;
}

export interface OutlineProps {
  items: OutlineItem[];
  /** The id currently in view. */
  activeId?: string;
  onSelect?: (id: string) => void;
  label?: string;
}

/** In-page navigation for a long document — a policy, a vendor agreement, these docs. */
export function Outline({ items, activeId, onSelect, label = 'On this page' }: OutlineProps) {
  return (
    <nav aria-label={label} className="flex flex-col gap-1">
      <span className="font-data px-2 pb-[6px] text-[11px] uppercase tracking-[0.12em] text-ink-400">{label}</span>
      {items.map((i) => (
        <a
          key={i.id}
          href={`#${i.id}`}
          aria-current={i.id === activeId ? 'true' : undefined}
          onClick={() => onSelect?.(i.id)}
          className={cx(
            'flex items-center gap-[7px] rounded-[8px] py-[7px] text-[13px] no-underline transition-colors duration-fast ease-mise',
            i.level === 3 ? 'pl-5 pr-2' : 'px-2',
            i.id === activeId ? 'bg-brand-50 font-semibold text-brand-600' : 'text-ink-700 hover:bg-canvas',
          )}
        >
          {i.icon}
          {i.label}
        </a>
      ))}
    </nav>
  );
}

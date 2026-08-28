import type { CSSProperties } from 'react';
import { cx } from '../../lib/cx';

export type ApprovalImpact = 'reversible' | 'undoable' | 'permanent';

export interface ApprovalFact {
  label: string;
  value: string;
}

export interface InlineApprovalProps {
  /** States what will happen, to whom, for how much. Never "Confirm action". */
  title: string;
  /** 2–6 pairs. The operator should be able to decide from these alone. */
  facts: ApprovalFact[];
  /** Why the agent is proposing this. */
  rationale?: string;
  impact?: ApprovalImpact;
  /** Human copy, e.g. "expires in 12 min". */
  expiresIn?: string;
  approveLabel?: string;
  onApprove?: () => void;
  onEdit?: () => void;
  onDecline?: () => void;
  /** Once resolved, the card becomes a stamp and stays in the transcript. */
  resolution?: { state: 'approved' | 'declined'; by?: string; at?: string; undoFor?: string };
  requiresRole?: string;
}

export function InlineApproval({
  title, facts, rationale, impact = 'undoable', expiresIn,
  approveLabel = 'Approve & send', onApprove, onEdit, onDecline, resolution, requiresRole,
}: InlineApprovalProps) {
  if (resolution) {
    const approved = resolution.state === 'approved';
    return (
      <div className="flex items-center gap-[9px] rounded-[11px] border border-line bg-surface px-[13px] py-[10px]">
        <span aria-hidden="true" className={cx('h-[14px] w-[14px] rounded-pill', approved ? 'bg-brand-600' : 'bg-danger')} />
        <span className="text-[12.5px]">
          {approved
            ? `Approved${resolution.by ? ` by ${resolution.by}` : ''}${resolution.at ? ` · ${resolution.at}` : ''}${resolution.undoFor ? ` · undo for ${resolution.undoFor}` : ''}`
            : 'Declined · agent will not retry without being asked'}
        </span>
      </div>
    );
  }

  return (
    <section
      aria-label={title}
      style={{ '--mise-streak-color': 'var(--mise-brand-600)' } as CSSProperties}
      className="mise-streak-border max-w-[560px] overflow-hidden rounded-lg border border-line bg-surface"
    >
      <div className="flex flex-col gap-3 px-[17px] py-[15px]">
        <div className="flex items-center gap-[9px]">
          <span className="rounded-pill bg-warn-bg px-[9px] py-[3px] text-[11px] font-bold tracking-[0.03em] text-warn-ink">
            Needs your approval
          </span>
          {expiresIn && <span className="text-[11.5px] text-ink-500">{expiresIn}</span>}
          {requiresRole && <span className="text-[11.5px] text-ink-500">{requiresRole} only</span>}
        </div>

        <h3 className="text-[15px] font-bold leading-[1.4]">{title}</h3>

        <dl className="grid grid-cols-2 gap-x-5 gap-y-[10px]">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col gap-[2px]">
              <dt className="text-[11.5px] text-ink-500">{f.label}</dt>
              <dd className="font-data m-0 text-[13px]">{f.value}</dd>
            </div>
          ))}
        </dl>

        {rationale && <p className="m-0 text-[12.5px] leading-[1.6] text-ink-700">{rationale}</p>}
        {impact === 'permanent' && (
          <p className="m-0 text-[12.5px] font-semibold text-danger">This cannot be undone.</p>
        )}
      </div>

      <div className="flex items-center gap-[10px] border-t border-line-soft bg-surface-raised px-[17px] py-3">
        <button type="button" onClick={onApprove} className="h-9 rounded-md bg-brand-600 px-[15px] text-[13px] font-semibold text-white transition-colors duration-fast ease-mise hover:bg-brand-700">
          {approveLabel}
        </button>
        <button type="button" onClick={onEdit} className="h-9 rounded-md border border-line bg-surface px-[14px] text-[13px] font-semibold text-ink-700">
          Edit draft
        </button>
        <button type="button" onClick={onDecline} className="h-9 rounded-md px-[14px] text-[13px] font-semibold text-ink-500">
          Decline
        </button>
      </div>
    </section>
  );
}

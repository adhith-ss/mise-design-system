export type AgentErrorKind = 'tool' | 'permission' | 'timeout' | 'refusal' | 'network';

export interface AgentErrorProps {
  kind: AgentErrorKind;
  /** What stopped, in plain words. No provider names or status codes. */
  title: string;
  body: string;
  /** What did land, so partial work stays visible. */
  completed?: string;
  primaryLabel?: string;
  onPrimary?: () => void;
  /** The manual route. Always offered. */
  secondaryLabel?: string;
  onSecondary?: () => void;
  reportId?: string;
}

export function AgentError({
  title, body, completed, primaryLabel, onPrimary, secondaryLabel, onSecondary, reportId,
}: AgentErrorProps) {
  return (
    <div
      role="alert"
      className="flex max-w-[620px] flex-col gap-2 rounded-lg border border-danger-line border-l-[3px] border-l-danger bg-tone-danger-bg px-4 py-[14px]"
    >
      <h3 className="m-0 text-[13.5px] font-bold">{title}</h3>
      <p className="m-0 text-[12.5px] leading-[1.65] text-ink-700">{body}</p>
      {completed && <p className="m-0 text-[12.5px] leading-[1.65] text-ink-700">{completed}</p>}
      {(primaryLabel || secondaryLabel) && (
        <div className="flex gap-[9px] pt-[2px]">
          {primaryLabel && (
            <button type="button" onClick={onPrimary} className="h-8 rounded-md bg-brand-600 px-[13px] text-[12.5px] font-semibold text-white">
              {primaryLabel}
            </button>
          )}
          {secondaryLabel && (
            <button type="button" onClick={onSecondary} className="h-8 rounded-md border border-line bg-surface px-[13px] text-[12.5px] font-semibold text-ink-700">
              {secondaryLabel}
            </button>
          )}
        </div>
      )}
      {reportId && <span className="font-data text-[11.5px] text-ink-400">{reportId}</span>}
    </div>
  );
}

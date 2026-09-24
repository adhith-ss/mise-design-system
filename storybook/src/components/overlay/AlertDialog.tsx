import { useEffect, useRef, useState } from 'react';
import { cx } from '../../lib/cx';

export interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Asks the question. */
  title: string;
  /** States the consequence. */
  description: string;
  /** Names the action — a verb, never "OK". */
  confirmLabel: string;
  cancelLabel?: string;
  tone?: 'default' | 'danger';
  onConfirm: () => void;
  loading?: boolean;
  /** For deletions that cannot be undone: the operator must type this string. */
  requireTypedConfirmation?: string;
}

/** A confirmation for something irreversible or expensive. */
export function AlertDialog({
  open, onOpenChange, title, description, confirmLabel,
  cancelLabel = 'Cancel', tone = 'default', onConfirm, loading = false, requireTypedConfirmation,
}: AlertDialogProps) {
  const cancel = useRef<HTMLButtonElement>(null);
  const [confirmation,setConfirmation] = useState('');
  const allowed = !requireTypedConfirmation || confirmation === requireTypedConfirmation;

  useEffect(() => {
    if (!open) return;
    const previous=document.activeElement as HTMLElement | null;
    setConfirmation('');
    cancel.current?.focus();
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) onOpenChange(false);
      if(e.key==='Tab') {
        const nodes=[...(cancel.current?.closest('[role=alertdialog]')?.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled)')||[])];
        const first=nodes[0],last=nodes[nodes.length-1];
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
        if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
      }
    };
    document.addEventListener('keydown', esc);
    return () => {document.removeEventListener('keydown', esc);previous?.focus();};
  }, [open, loading]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: 'var(--mise-scrim)' }}>
      <div role="alertdialog" aria-modal="true" aria-label={title}
        className="flex w-[376px] flex-col gap-3 rounded-xl bg-surface p-5 shadow-overlay">
        <h2 className="m-0 text-[17px] font-bold">{title}</h2>
        <p className="m-0 text-[13.5px] leading-[1.6] text-ink-700">{description}</p>
        {requireTypedConfirmation && (
          <label className="flex flex-col gap-[6px] pt-1">
            <span className="text-[13px] text-ink-700">
              Type <b className="font-data">{requireTypedConfirmation}</b> to confirm
            </span>
            <input value={confirmation} onChange={e=>setConfirmation(e.target.value)} className="font-data h-md rounded-control border border-line px-3 text-[13px] outline-none focus:border-brand-600" />
          </label>
        )}
        <div className="flex justify-end gap-[10px] pt-1">
          <button ref={cancel} type="button" onClick={() => onOpenChange(false)}
            className="h-9 rounded-md border border-line bg-surface px-[14px] text-[13px] font-semibold text-ink-700">
            {cancelLabel}
          </button>
          <button type="button" onClick={()=>{if(allowed&&!loading)onConfirm();}} disabled={loading || !allowed} aria-busy={loading || undefined}
            className={cx('h-9 rounded-md px-[14px] text-[13px] font-semibold disabled:opacity-50',
              tone === 'danger' ? 'bg-danger text-[var(--mise-on-danger)]' : 'bg-[var(--mise-action)] text-[var(--mise-on-action)]')}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useRef, useState } from 'react';
import { cx } from '../../lib/cx';
import { useField } from './Field';
import { X } from 'lucide-react';

export interface UploadedFile {
  name: string;
  size: string;
  status?: 'uploading' | 'done' | 'error';
  /** Shown under the name when status is 'error'. */
  error?: string;
}

export interface FileInputProps {
  files: UploadedFile[];
  onAdd?: (files: FileList) => void;
  onRemove?: (name: string) => void;
  /** Accept attribute, e.g. "image/*,.pdf". */
  accept?: string;
  multiple?: boolean;
  /** Human copy under the prompt, e.g. "PDF or photo, up to 10 MB". */
  constraint?: string;
  disabled?: boolean;
}

/** An invoice scan or a delivery photo, dropped or picked. */
export function FileInput({
  files, onAdd, onRemove, accept, multiple = true, constraint, disabled,
}: FileInputProps) {
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const field = useField();

  return (
    <div className="flex flex-col gap-[10px]">
      <button
        type="button"
        disabled={disabled ?? field?.disabled}
        onClick={() => input.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); if (e.dataTransfer.files.length) onAdd?.(e.dataTransfer.files); }}
        className={cx(
          'flex flex-col items-center gap-[6px] rounded-control border border-dashed px-4 py-6 text-center transition-colors duration-fast ease-mise',
          over ? 'border-brand-600 bg-brand-50' : 'border-line bg-surface hover:bg-canvas',
          (disabled ?? field?.disabled) && 'cursor-not-allowed bg-canvas',
        )}
      >
        <span className={cx('text-[13.5px] font-semibold', (disabled ?? field?.disabled) ? 'text-ink-400' : 'text-brand-600')}>
          Drop a file or browse
        </span>
        {constraint && <span className="text-[12px] text-ink-500">{constraint}</span>}
      </button>
      <input
        ref={input}
        id={field?.id}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => e.target.files && onAdd?.(e.target.files)}
      />

      {files.length > 0 && (
        <ul className="flex list-none flex-col gap-[6px] p-0">
          {files.map((file) => (
            <li
              key={file.name}
              className={cx(
                'flex items-center gap-[10px] rounded-md border px-3 py-[9px]',
                file.status === 'error' ? 'border-danger-line bg-tone-danger-bg' : 'border-line bg-surface',
              )}
            >
              <span aria-hidden="true" className="h-[18px] w-[14px] shrink-0 rounded-[2px] border border-line bg-canvas" />
              <span className="flex flex-col gap-[1px]">
                <span className="text-[13px]">{file.name}</span>
                {file.error ? (
                  <span className="text-[11.5px] text-danger">{file.error}</span>
                ) : (
                  <span className="font-data text-[11.5px] text-ink-400">
                    {file.status === 'uploading' ? 'Uploading…' : file.size}
                  </span>
                )}
              </span>
              <button
                type="button"
                onClick={() => onRemove?.(file.name)}
                aria-label={`Remove ${file.name}`}
                className="ml-auto text-[14px] text-ink-500"
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

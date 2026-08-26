export interface TimestampProps {
  /** ISO date-time. Drives both the display and the machine-readable value. */
  value: string;
  /** 'relative' for recent activity, 'absolute' for records, 'both' for audit trails. */
  format?: 'relative' | 'absolute' | 'both';
  /** Includes the time of day. */
  withTime?: boolean;
  size?: 'dense' | 'meta';
}

function relative(iso: string, now = new Date('2026-08-25T09:00:00')) {
  const diff = (now.getTime() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  const days = Math.floor(diff / 86400);
  return days === 1 ? 'yesterday' : `${days}d ago`;
}

function absolute(iso: string, withTime: boolean) {
  const d = new Date(iso);
  const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  if (!withTime) return date;
  return `${date}, ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
}

/**
 * A point in time. Relative for recent activity, absolute for records —
 * an invoice date is never "3 days ago" on a document someone will file.
 */
export function Timestamp({ value, format = 'absolute', withTime = false, size = 'meta' }: TimestampProps) {
  const text =
    format === 'relative' ? relative(value)
    : format === 'both' ? `${absolute(value, withTime)} · ${relative(value)}`
    : absolute(value, withTime);

  return (
    <time
      dateTime={value}
      title={absolute(value, true)}
      className={size === 'dense' ? 'font-data text-[13px] text-ink-700' : 'font-data text-[12px] text-ink-500'}
    >
      {text}
    </time>
  );
}

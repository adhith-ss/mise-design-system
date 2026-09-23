import { Banner } from '../components/feedback/Banner';
import { Button } from '../components/action/Button';
import { Badge } from '../components/feedback/Badge';
import { Card } from '../components/content/Card';

export interface SourcesStatusProps {
  /** Connected sources show healthy badges; default is disconnected. */
  state?: 'default' | 'empty' | 'error' | 'disabled' | 'success';
  disabled?: boolean;
  onCheck?: () => void;
}

const sources = [
  { name: 'POS sales', detail: 'Aug 20' },
  { name: 'Supplier invoices', detail: 'Aug 14' },
  { name: 'Recipes', detail: 'Not connected' },
  { name: 'Market data', detail: 'Not connected' },
];

/**
 * Explicit disconnected-sources notice. Preserves APP wording:
 * “Sources not connected” and the live-data sentence.
 */
export function SourcesStatus({
  state = 'default',
  disabled = false,
  onCheck,
}: SourcesStatusProps) {
  const connected = state === 'success';
  const isDisabled = disabled || state === 'disabled';

  if (state === 'empty') {
    return (
      <Card className="max-w-[480px]" title="Data sources" subtitle="This session">
        <p className="m-0 text-[13px] text-ink-700">
          No source checks yet. Open Data to review connections.
        </p>
      </Card>
    );
  }

  return (
    <div className="flex w-full max-w-[480px] flex-col gap-3">
      <Banner
        tone={connected ? 'success' : state === 'error' ? 'danger' : 'warning'}
        title={connected ? 'Sources connected' : 'Sources not connected'}
        action={
          !connected ? (
            <Button size="sm" variant="secondary" disabled={isDisabled} onClick={onCheck}>
              Check sources
            </Button>
          ) : undefined
        }
      >
        {connected
          ? 'POS, invoices, recipes and market feeds are available for this session.'
          : 'Live supplier quotes, POS history, recipes and market data are not connected.'}
      </Banner>

      <Card title="Keep your data fresh" padding="sm">
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {sources.map((s) => (
            <li
              key={s.name}
              className="flex items-center justify-between gap-3 border-b border-line-soft py-2 last:border-b-0"
            >
              <span className="text-[13.5px] font-semibold">{s.name}</span>
              <Badge tone={connected ? 'success' : 'warning'}>
                {connected ? 'Fresh' : s.detail === 'Not connected' ? 'Not connected' : 'Needs update'}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

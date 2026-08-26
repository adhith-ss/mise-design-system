import type { Meta, StoryObj } from '@storybook/react';
import { ToolCallCard } from './ToolCallCard';

const rows = [
  { id: 'INV-20841 · Aug 22', amount: '$742.10', flag: '4 cs short' },
  { id: 'INV-20902 · Aug 24', amount: '$744.00', flag: '2 cs short' },
];

const ResultTable = () => (
  <div className="overflow-hidden rounded-md border border-line-soft">
    {rows.map((r) => (
      <div key={r.id} className="grid grid-cols-[1.4fr_1fr_1fr] gap-3 border-b border-line-soft px-3 py-[9px] text-[12.5px] last:border-b-0">
        <span>{r.id}</span>
        <span className="font-data text-ink-700">{r.amount}</span>
        <span className="text-alert">{r.flag}</span>
      </div>
    ))}
  </div>
);

const meta = {
  title: 'Chat & Agent/Tool-call Card',
  component: ToolCallCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A record of one thing the agent did to the system: a query, a lookup, a draft. Collapsed it states the action and its result in one line; expanded it shows the arguments and the returned rows. Never hide a write behind a collapsed card.',
      },
    },
  },
  args: {
    tool: 'invoices.search',
    summary: '2 invoices · Harbor Produce · Aug 18–24',
    duration: 1100,
    status: 'done',
    args: { vendor: 'harbor-produce', from: '2026-08-18', to: '2026-08-24', flags: ['variance'] },
    result: <ResultTable />,
  },
} satisfies Meta<typeof ToolCallCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {};
export const Expanded: Story = { args: { defaultExpanded: true } };
export const Running: Story = { args: { status: 'running', duration: undefined, summary: 'Reading invoices · 3 of 8' } };
export const Failed: Story = { args: { status: 'error', summary: "Harbor's portal did not respond", onRetry: () => {} } };
export const Denied: Story = { args: { status: 'denied', summary: 'You declined this lookup' } };

export const Write: Story = {
  args: {
    tool: 'credits.draft',
    summary: 'Drafted a $138.00 credit request',
    writesData: true,
    args: { vendor: 'harbor-produce', amount: 13800, against: ['INV-20841', 'INV-20902'] },
    result: undefined,
  },
  parameters: {
    docs: { description: { story: 'A write is expanded from the first render and carries the amber edge, so nothing that changes a record is ever one click away from being missed.' } },
  },
};

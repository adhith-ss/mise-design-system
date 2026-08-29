import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table, type Column } from './Table';
import { Badge } from '../feedback/Badge';
import { EmptyState } from '../feedback/EmptyState';
import { MoreMenu } from '../action/MoreMenu';

interface InvoiceRow {
  id: string;
  vendor: string;
  received: string;
  amount: string;
  status: 'matched' | 'variance' | 'unmatched';
}

const rows: InvoiceRow[] = [
  { id: 'INV-20841', vendor: 'Harbor Produce', received: 'Aug 22', amount: '$742.10', status: 'variance' },
  { id: 'INV-20902', vendor: 'Harbor Produce', received: 'Aug 24', amount: '$744.00', status: 'variance' },
  { id: 'INV-20770', vendor: 'Valley Greens', received: 'Aug 21', amount: '$318.55', status: 'matched' },
  { id: 'INV-20655', vendor: 'Northside Meats', received: 'Aug 19', amount: '$1,204.80', status: 'matched' },
  { id: 'INV-20611', vendor: 'Coastal Fish', received: 'Aug 18', amount: '$486.20', status: 'unmatched' },
];

const columns: Array<Column<InvoiceRow>> = [
  { key: 'id', header: 'Invoice', data: true, width: '150px' },
  { key: 'vendor', header: 'Vendor' },
  { key: 'received', header: 'Received', data: true, width: '110px' },
  { key: 'amount', header: 'Amount', align: 'right', data: true, width: '120px' },
  {
    key: 'status',
    header: 'Status',
    width: '150px',
    render: (r) =>
      r.status === 'matched' ? <Badge tone="success" size="sm">Matched</Badge>
      : r.status === 'variance' ? <Badge tone="warning" size="sm">Variance</Badge>
      : <Badge tone="neutral" size="sm">Unmatched</Badge>,
  },
  {
    key: 'actions',
    header: '',
    srHeader: 'Row actions',
    align: 'right',
    width: '56px',
    render: (r) => <MoreMenu subject={r.id} items={[{ label: 'Open invoice' }, { label: 'Match lines' }]} />,
  },
];

const meta = {
  title: 'Table & List/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Dense records with more than one attribute worth comparing. Numbers are right-aligned and set in Roboto Mono Light so they compare down the column. This is where operators spend most of their day, so density and scanability beat decoration.',
      },
    },
  },
  args: { columns, rows, label: 'August invoices' },
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([]);
    return <Table {...args} selected={selected} onSelectedChange={setSelected} />;
  },
} satisfies Meta<typeof Table<InvoiceRow>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Compact: Story = { args: { density: 'compact' } };
export const Selectable: Story = { args: { selectable: true } };
export const WithTotals: Story = {
  args: {
    footer: (
      <div className="flex justify-between">
        <span className="text-[12.5px] text-ink-500">5 invoices</span>
        <span className="font-data text-[13px] font-semibold">$3,495.65</span>
      </div>
    ),
  },
};
export const Clickable: Story = { args: { onRowClick: () => {} } };
export const Empty: Story = {
  args: {
    rows: [],
    empty: <EmptyState kind="no-results" size="sm" title="No invoices match these filters" children="Try widening the date range." />,
  },
};

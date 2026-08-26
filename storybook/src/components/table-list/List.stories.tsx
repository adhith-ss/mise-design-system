import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';
import { Badge } from '../feedback/Badge';

const meta = {
  title: 'Table & List/List',
  component: List,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Records with one thing worth comparing. More than one attribute and it should be a Table — a list with four columns crammed into a meta line is a table in disguise.',
      },
    },
  },
  args: {
    label: 'Open orders',
    items: [
      { id: '1', title: 'Harbor Produce', meta: 'PO-4471 · delivery Tue 6:00 AM', trailing: <span className="font-data text-[13px]">$1,486.10</span> },
      { id: '2', title: 'Valley Greens', meta: 'PO-4468 · delivery Wed 7:00 AM', trailing: <span className="font-data text-[13px]">$318.55</span> },
      { id: '3', title: 'Northside Meats', meta: 'PO-4462 · draft', trailing: <Badge tone="info" size="sm">Draft</Badge> },
    ],
  },
  render: (args) => <div className="w-[480px]"><List {...args} /></div>,
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Compact: Story = { args: { density: 'compact' } };
export const Bare: Story = { args: { bare: true } };
export const Interactive: Story = { args: { onSelect: () => {} } };
export const WithLeading: Story = {
  args: {
    items: [
      { id: '1', title: 'Harbor Produce Co.', meta: 'Produce · Tue, Thu', leading: <span aria-hidden="true" className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-surface-sunken text-[11px] font-bold text-ink-700">HP</span> },
      { id: '2', title: 'Valley Greens', meta: 'Produce · Wed', leading: <span aria-hidden="true" className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-surface-sunken text-[11px] font-bold text-ink-700">VG</span> },
    ],
  },
};

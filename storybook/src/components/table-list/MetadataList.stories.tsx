import type { Meta, StoryObj } from '@storybook/react';
import { MetadataList } from './MetadataList';
import { Badge } from '../feedback/Badge';

const meta = {
  title: 'Table & List/Metadata List',
  component: MetadataList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "A record's attributes, read but not compared. A definition list, so the label–value relationship survives being read aloud. Use it in a record header or a detail panel; never as a substitute for a Table.",
      },
    },
  },
  args: {
    entries: [
      { label: 'Vendor', value: 'Harbor Produce Co.' },
      { label: 'Invoice', value: 'INV-20841', data: true },
      { label: 'Received', value: 'Aug 22, 2026', data: true },
      { label: 'Amount', value: '$742.10', data: true },
      { label: 'Status', value: <Badge tone="warning" size="sm">2 variances</Badge> },
      { label: 'Against', value: 'PO-4471', data: true },
    ],
  },
  render: (args) => <div className="w-[480px] rounded-lg border border-line bg-surface p-4"><MetadataList {...args} /></div>,
} satisfies Meta<typeof MetadataList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoColumns: Story = {};
export const OneColumn: Story = { args: { columns: 1 } };
export const ThreeColumns: Story = { args: { columns: 3 } };
export const Inline: Story = { args: { layout: 'inline', columns: 1 } };
export const WithWideEntry: Story = {
  args: {
    entries: [
      { label: 'Vendor', value: 'Harbor Produce Co.' },
      { label: 'Amount', value: '$742.10', data: true },
      { label: 'Note', value: 'Short 4 cases of romaine against the PO; credit requested Aug 25.', wide: true },
    ],
  },
};

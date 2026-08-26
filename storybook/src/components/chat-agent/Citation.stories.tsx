import type { Meta, StoryObj } from '@storybook/react';
import { Citation } from './Citation';

const meta = {
  title: 'Chat & Agent/Citation',
  component: Citation,
  parameters: {
    docs: {
      description: {
        component:
          'A pointer from a claim to the record it came from — an invoice line, a PO, a vendor agreement. Every number the agent states about money carries one. The preview is never the only path to the record.',
      },
    },
  },
  args: { label: 'INV-20841 · line 3', recordType: 'invoice', href: '#' },
} satisfies Meta<typeof Citation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Exact: Story = {};
export const Inferred: Story = { args: { confidence: 'inferred', label: 'Vendor agreement · §4' , recordType: 'policy' } };

export const InProse: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <p className="max-w-[64ch] text-[14px] leading-[1.75]">
      Harbor invoiced 24 cases but the kitchen received 20{' '}
      <Citation recordType="invoice" label="INV-20841 · line 3" href="#" />, and the same gap appears
      on Thursday <Citation recordType="invoice" label="INV-20902 · line 1" href="#" />.
    </p>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { MoreMenu } from './MoreMenu';

const meta = {
  title: 'Action/More Menu',
  component: MoreMenu,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A Dropdown Menu behind an icon trigger, for secondary actions on a row or card. Never the only place an action exists — the accessible label always names the row it belongs to, so a screen-reader user knows which record they are acting on.',
      },
    },
  },
  args: {
    subject: 'PO-4471',
    items: [
      { label: 'Open order' },
      { label: 'Duplicate' },
      { label: 'Cancel order', destructive: true, group: 'danger' },
    ],
  },
} satisfies Meta<typeof MoreMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};
export const Open: Story = { args: { defaultOpen: true } };

export const OnARow: Story = {
  render: (args) => (
    <div className="flex w-[420px] items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3">
      <span className="text-[13.5px] font-semibold">PO-4471</span>
      <span className="font-data text-[13px] text-ink-700">$1,486.10</span>
      <span className="ml-auto"><MoreMenu {...args} /></span>
    </div>
  ),
};

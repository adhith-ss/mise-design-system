import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Outline } from './Outline';

const meta = {
  title: 'Navigation/Outline',
  component: Outline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'In-page navigation for a long document — a vendor agreement, a policy, this documentation. Two levels only: a third level of nesting means the document needs splitting, not a deeper outline.',
      },
    },
  },
  args: {
    items: [
      { id: 'terms', label: 'Terms' },
      { id: 'delivery', label: 'Delivery windows', level: 3 as const },
      { id: 'credits', label: 'Credits & returns', level: 3 as const },
      { id: 'pricing', label: 'Pricing' },
      { id: 'contacts', label: 'Contacts' },
    ],
    activeId: 'delivery',
  },
  render: (args) => {
    const [active, setActive] = useState(args.activeId);
    return <div className="w-[240px]"><Outline {...args} activeId={active} onSelect={setActive} /></div>;
  },
} satisfies Meta<typeof Outline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const FlatList: Story = {
  args: { items: [{ id: 'a', label: 'Overview' }, { id: 'b', label: 'Lines' }, { id: 'c', label: 'History' }], activeId: 'a' },
};

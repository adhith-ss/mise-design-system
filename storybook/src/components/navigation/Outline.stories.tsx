import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Outline } from './Outline';
import { Icon } from '../content/Icon';
import { FileText, Truck, CreditCard, Tag, Phone } from 'lucide-react';

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
      { id: 'terms', label: 'Terms', icon: <Icon icon={FileText} size="sm" tone="quiet" /> },
      { id: 'delivery', label: 'Delivery windows', level: 3 as const },
      { id: 'credits', label: 'Credits & returns', level: 3 as const },
      { id: 'pricing', label: 'Pricing', icon: <Icon icon={Tag} size="sm" tone="quiet" /> },
      { id: 'contacts', label: 'Contacts', icon: <Icon icon={Phone} size="sm" tone="quiet" /> },
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
/** A flat, single-level list — every item can carry a leading icon since there's no nesting to compete with. */
export const Linear: Story = {
  args: {
    items: [
      { id: 'a', label: 'Overview', icon: <Icon icon={FileText} size="sm" tone="quiet" /> },
      { id: 'b', label: 'Delivery', icon: <Icon icon={Truck} size="sm" tone="quiet" /> },
      { id: 'c', label: 'Billing', icon: <Icon icon={CreditCard} size="sm" tone="quiet" /> },
    ],
    activeId: 'a',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { TopNav } from './TopNav';
import { StatusDot } from '../feedback/StatusDot';
import { Icon } from '../content/Icon';
import { Calendar, ShoppingCart, Receipt, Building2, Package } from 'lucide-react';

const meta = {
  title: 'Navigation/Top Nav',
  component: TopNav,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "The app's top-level places. One row, never more than seven items, because an eighth means the information architecture needs a level rather than another tab. Counts appear only for things that need the operator's attention.",
      },
    },
  },
  args: {
    brand: (
      <div className="flex items-center gap-[10px]">
        <span aria-hidden="true" className="h-6 w-6 rounded-[7px] bg-brand-600" />
        <span className="text-[14px] font-extrabold tracking-[-0.01em]">Mise</span>
      </div>
    ),
    items: [
      { label: 'Today', href: '#', current: true, icon: <Icon icon={Calendar} size="sm" /> },
      { label: 'Orders', href: '#', icon: <Icon icon={ShoppingCart} size="sm" /> },
      { label: 'Invoices', href: '#', count: 2, icon: <Icon icon={Receipt} size="sm" /> },
      { label: 'Vendors', href: '#', icon: <Icon icon={Building2} size="sm" /> },
      { label: 'Items', href: '#', icon: <Icon icon={Package} size="sm" /> },
    ],
    actions: <StatusDot tone="success" label="Agent idle" size="sm" />,
  },
} satisfies Meta<typeof TopNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoCounts: Story = { args: { items: [{ label: 'Today', href: '#', current: true }, { label: 'Orders', href: '#' }] } };
export const NoActions: Story = { args: { actions: undefined } };

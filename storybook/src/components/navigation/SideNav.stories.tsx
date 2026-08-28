import type { Meta, StoryObj } from '@storybook/react';
import { SideNav } from './SideNav';
import { Icon } from '../content/Icon';
import { Calendar, Bot, ShoppingCart, Receipt, Undo2, Building2, Package, Gauge } from 'lucide-react';

const meta = {
  title: 'Navigation/Side Nav',
  component: SideNav,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The persistent left rail: where the operator is, and everything one click away. Groups are labelled only when the rail holds more than about seven items. Counts are right-aligned and quiet — they inform, they do not nag.',
      },
    },
  },
  args: {
    header: (
      <div className="flex items-center gap-[10px]">
        <span aria-hidden="true" className="h-6 w-6 shrink-0 rounded-[7px] bg-brand-600" />
        <div className="flex flex-col">
          <span className="text-[15px] font-extrabold tracking-[-0.01em]">Mise</span>
          <span className="font-data text-[11px] text-ink-500">Downtown kitchen</span>
        </div>
      </div>
    ),
    // Collapsed keeps only the mark — the wordmark and location name have
    // nowhere to go at 64px, so showing half of them is worse than showing
    // neither.
    collapsedHeader: <span aria-hidden="true" className="mx-auto h-6 w-6 shrink-0 rounded-[7px] bg-brand-600" />,
    groups: [
      {
        items: [
          { label: 'Today', href: '#', current: true, icon: <Icon icon={Calendar} size="sm" /> },
          { label: 'Agent', href: '#', icon: <Icon icon={Bot} size="sm" /> },
        ],
      },
      {
        label: 'Purchasing',
        items: [
          { label: 'Orders', href: '#', count: 4, icon: <Icon icon={ShoppingCart} size="sm" /> },
          { label: 'Invoices', href: '#', count: 34, icon: <Icon icon={Receipt} size="sm" /> },
          { label: 'Credits', href: '#', count: 2, icon: <Icon icon={Undo2} size="sm" /> },
        ],
      },
      {
        label: 'Catalogue',
        items: [
          { label: 'Vendors', href: '#', icon: <Icon icon={Building2} size="sm" /> },
          { label: 'Items', href: '#', icon: <Icon icon={Package} size="sm" /> },
          { label: 'Par levels', href: '#', disabled: true, icon: <Icon icon={Gauge} size="sm" /> },
        ],
      },
    ],
  },
  render: (args) => <div className="h-[560px]"><SideNav {...args} /></div>,
} satisfies Meta<typeof SideNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Collapsed: Story = { args: { collapsed: true } };
export const CurrentWithCount: Story = {
  args: {
    groups: [{ label: 'Purchasing', items: [{ label: 'Orders', href: '#', current: true, count: 4, icon: <Icon icon={ShoppingCart} size="sm" /> }] }],
  },
  parameters: { docs: { description: { story: 'The count next to a selected item reads at the same weight as its label — it does not fall back to the quiet, unselected grey.' } } },
};
export const Flat: Story = {
  args: { groups: [{ items: [{ label: 'Today', href: '#', current: true }, { label: 'Orders', href: '#' }, { label: 'Invoices', href: '#' }] }] },
};

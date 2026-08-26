import type { Meta, StoryObj } from '@storybook/react';
import { SideNav } from './SideNav';

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
        <span aria-hidden="true" className="h-6 w-6 rounded-[7px] bg-brand-600" />
        <div className="flex flex-col">
          <span className="text-[15px] font-extrabold tracking-[-0.01em]">Mise</span>
          <span className="font-data text-[11px] text-ink-500">Downtown kitchen</span>
        </div>
      </div>
    ),
    groups: [
      { items: [{ label: 'Today', href: '#', current: true }, { label: 'Agent', href: '#' }] },
      {
        label: 'Purchasing',
        items: [
          { label: 'Orders', href: '#', count: 4 },
          { label: 'Invoices', href: '#', count: 34 },
          { label: 'Credits', href: '#', count: 2 },
        ],
      },
      {
        label: 'Catalogue',
        items: [
          { label: 'Vendors', href: '#' },
          { label: 'Items', href: '#' },
          { label: 'Par levels', href: '#', disabled: true },
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
export const Flat: Story = {
  args: { groups: [{ items: [{ label: 'Today', href: '#', current: true }, { label: 'Orders', href: '#' }, { label: 'Invoices', href: '#' }] }] },
};

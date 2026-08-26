import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';

const meta = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Where the operator is in a hierarchy, and one click back up it. The last item is the current record and never a link. Long trails collapse in the middle, keeping the root and the two nearest ancestors.',
      },
    },
  },
  args: {
    items: [
      { label: 'Invoices', href: '#' },
      { label: 'Harbor Produce', href: '#' },
      { label: 'INV-20841' },
    ],
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Collapsed: Story = {
  args: {
    items: [
      { label: 'Locations', href: '#' },
      { label: 'Downtown kitchen', href: '#' },
      { label: 'Invoices', href: '#' },
      { label: 'Harbor Produce', href: '#' },
      { label: 'INV-20841' },
    ],
  },
};
export const TwoLevels: Story = { args: { items: [{ label: 'Vendors', href: '#' }, { label: 'Harbor Produce' }] } };

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from './SegmentedControl';

const meta = {
  title: 'MVP/Action/Segmented Control',
  tags: ['archived','mvp-pilot'],
  component: SegmentedControl,
  parameters: {
    docsBanner: 'Archived · MVP (0.1.0). Reference only. Use Post-MVP components.',
    docs: {
      description: {
        component:
          'Archived · MVP (0.1.0). Reference only. Use Post-MVP components. Switches the view of the content beneath it. Two to four short options that are always visible. It changes what you are looking at, not what the data is — for that, use a filter.',
      },
    },
  },
  args: {
    label: 'Invoice view',
    value: 'all',
    segments: [
      { value: 'all', label: 'All', meta: '34' },
      { value: 'variance', label: 'Variances', meta: '2' },
      { value: 'paid', label: 'Paid' },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <SegmentedControl {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { size: 'sm' } };
export const FullWidth: Story = { args: { fullWidth: true }, parameters: { layout: 'padded' } };
export const TwoUp: Story = {
  args: { segments: [{ value: 'all', label: 'Orders' }, { value: 'variance', label: 'Deliveries' }] },
};

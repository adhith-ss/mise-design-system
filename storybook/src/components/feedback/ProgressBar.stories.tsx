import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta = {
  title: 'Feedback & Status/Progress Bar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Determinate work with a known end: reading 8 invoices, uploading 3 files. The count in the detail slot is what the operator actually reads — the bar only confirms it is moving.',
      },
    },
  },
  args: { value: 3, max: 8, label: 'Reading invoices', detail: '3 of 8' },
  render: (args) => <div className="w-[360px]"><ProgressBar {...args} /></div>,
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Determinate: Story = {};
export const Complete: Story = { args: { value: 8, detail: '8 of 8' } };
export const Indeterminate: Story = { args: { value: undefined, detail: undefined } };
export const Small: Story = { args: { size: 'sm', label: undefined, detail: undefined } };
export const Warning: Story = {
  args: { tone: 'warning', label: 'Period closes Friday', detail: '4 days left', value: 60, max: 100 },
};
export const BarOnly: Story = { args: { label: undefined, detail: undefined } };

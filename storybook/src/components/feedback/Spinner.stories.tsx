import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta = {
  title: 'Feedback & Status/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component:
          'Work under two seconds with no nameable steps. Anything longer gets a Progress Bar or an Agent Status step — a spinner tells the operator nothing about what is happening or how long it will take. Always carries a label, visible or screen-reader only.',
      },
    },
  },
  args: { label: 'Loading invoices' },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithLabel: Story = { args: { showLabel: true } };
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="sm" label="Small" />
      <Spinner size="md" label="Medium" />
      <Spinner size="lg" label="Large" />
    </div>
  ),
};
export const Inverse: Story = {
  args: { tone: 'inverse' },
  parameters: { backgrounds: { default: 'ink' } },
};

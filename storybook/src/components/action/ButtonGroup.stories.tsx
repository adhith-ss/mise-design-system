import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from './Button';

const meta = {
  title: 'Action/Button Group',
  component: ButtonGroup,
  parameters: {
    docs: {
      description: {
        component:
          'Two or more related buttons laid out as one unit. Use it to keep an action and its qualifier together — send now, or schedule. Never to line up unrelated actions.',
      },
    },
  },
  args: { label: 'Order actions' },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Attached: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Send now</Button>
      <Button variant="secondary">Schedule</Button>
    </ButtonGroup>
  ),
};

export const Spaced: Story = {
  args: { attached: false },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="neutral">Cancel</Button>
      <Button variant="primary">Send order</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical', attached: false },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary" fullWidth>Approve</Button>
      <Button variant="neutral" fullWidth>Edit draft</Button>
    </ButtonGroup>
  ),
};

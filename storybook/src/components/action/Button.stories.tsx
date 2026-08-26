import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Action/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "A labelled control that performs an action. The label names the action in the operator's words — \"Send order\", not \"Submit\". One primary per view.",
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'neutral', 'danger', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  args: { children: 'Send order', variant: 'primary', size: 'md' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary', children: 'Edit items' } };
export const Neutral: Story = { args: { variant: 'neutral', children: 'Cancel' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Cancel order' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Clear filters' } };
export const Loading: Story = { args: { loading: true, children: 'Sending' } };
export const Disabled: Story = {
  args: { disabled: true, children: 'Send order' },
  parameters: { docs: { description: { story: 'Pair a disabled button with a Tooltip that explains why. A disabled control with no explanation is a dead end.' } } },
};
export const FullWidth: Story = { args: { fullWidth: true }, parameters: { layout: 'padded' } };

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3">
      {(['primary', 'secondary', 'neutral', 'danger', 'ghost'] as const).map((v) => (
        <div key={v} className="flex items-center gap-3">
          <Button variant={v}>Default</Button>
          <Button variant={v} loading>Loading</Button>
          <Button variant={v} disabled>Disabled</Button>
        </div>
      ))}
    </div>
  ),
};

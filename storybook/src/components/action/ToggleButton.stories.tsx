import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToggleButton } from './ToggleButton';

const meta = {
  title: 'Action/Toggle Button',
  component: ToggleButton,
  parameters: {
    docs: {
      description: {
        component:
          'A button that stays pressed. Use it for a view or filter that persists — "Show variances only" — never for an action that runs once. Sets aria-pressed, so the state is read aloud rather than inferred from colour.',
      },
    },
  },
  args: { pressed: false, children: 'Show variances only' },
  render: (args) => {
    const [pressed, setPressed] = useState(args.pressed);
    return <ToggleButton {...args} pressed={pressed} onPressedChange={setPressed} />;
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unpressed: Story = {};
export const Pressed: Story = { args: { pressed: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Small: Story = { args: { size: 'sm' } };

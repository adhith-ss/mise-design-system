import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioList } from './RadioList';

const options = [
  { value: 'now', label: 'Send now', hint: 'Harbor receives it within a minute.' },
  { value: 'morning', label: 'Send at 6:00 AM', hint: 'Queued with tomorrow morning\'s orders.' },
  { value: 'draft', label: 'Keep as draft', hint: 'Nothing leaves until you send it.' },
];

const meta = {
  title: 'Data Input/Radio List',
  component: RadioList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'One choice from two to five options, all visible with their consequences on screen. Every option carries a hint, because a radio list is used where the difference between choices matters. Past five options, use a Selector.',
      },
    },
  },
  args: { options, value: 'now', label: 'When to send', onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-[400px]">
        <RadioList {...args} value={value} onChange={setValue} />
      </div>
    );
  },
} satisfies Meta<typeof RadioList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const Cards: Story = {
  args: { appearance: 'card' },
  parameters: { docs: { description: { story: 'Card appearance for a consequential choice — the whole row is the hit target, which matters on a tablet in a kitchen.' } } },
};
export const WithDisabledOption: Story = {
  args: {
    appearance: 'card',
    options: [...options, { value: 'auto', label: 'Let the agent decide', hint: 'Needs manager approval to enable.', disabled: true }],
  },
};

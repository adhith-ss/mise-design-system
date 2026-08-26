import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta = {
  title: 'Data Input/Switch',
  component: Switch,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A setting that takes effect immediately. If the change needs a Save button, it is a Checkbox, not a Switch. Role switch with aria-checked, so the state is spoken rather than inferred from the knob position.',
      },
    },
  },
  args: {
    checked: true,
    label: 'Let the agent draft credit requests',
    hint: 'Drafts still need your approval before they are sent.',
    onChange: () => {},
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return (
      <div className="w-[420px]">
        <Switch {...args} checked={checked} onChange={setChecked} />
      </div>
    );
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {};
export const Off: Story = { args: { checked: false } };
export const Pending: Story = { args: { pending: true } };
export const Disabled: Story = { args: { disabled: true, hint: 'Managers only.' } };
export const Small: Story = { args: { size: 'sm', hint: undefined } };

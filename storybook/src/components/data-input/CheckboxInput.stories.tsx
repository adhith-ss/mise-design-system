import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxInput } from './CheckboxInput';

const meta = {
  title: 'Data Input/Checkbox Input',
  component: CheckboxInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An independent on/off choice. The label is clickable, and the indeterminate state carries aria-checked="mixed" so a partially-selected parent row reads correctly rather than sounding unchecked.',
      },
    },
  },
  args: { checked: false, label: 'Variances only', onChange: () => {} },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return <CheckboxInput {...args} checked={checked} onChange={setChecked} />;
  },
} satisfies Meta<typeof CheckboxInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};
export const Checked: Story = { args: { checked: true } };
export const WithHint: Story = {
  args: { checked: true, label: 'Auto-approve credits under $50', hint: 'Applies to vendors with no open disputes.' },
};
export const Indeterminate: Story = { args: { indeterminate: true, label: 'All invoices' } };
export const Invalid: Story = { args: { invalid: true, label: 'I confirm the received counts' } };
export const Disabled: Story = { args: { disabled: true, checked: true } };

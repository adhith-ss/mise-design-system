import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';
import { Field } from './Field';

const meta = {
  title: 'Data Input/Text Area',
  component: TextArea,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Several lines of prose — a note to a vendor, a reason for a credit. Resizes vertically. A character count appears only where a downstream system actually truncates.',
      },
    },
  },
  render: (args) => (
    <div className="w-[420px]">
      <Field label="Note to vendor" hint="Included in the credit request email.">
        <TextArea {...args} />
      </Field>
    </div>
  ),
  args: { placeholder: 'Short counts on Tuesday and Thursday deliveries…' },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithCount: Story = {
  args: { showCount: true, maxLength: 280 },
  render: (args) => {
    const [value, setValue] = useState('Short counts on Tuesday and Thursday.');
    return (
      <div className="w-[420px]">
        <Field label="Note to vendor">
          <TextArea {...args} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
      </div>
    );
  },
};
export const Invalid: Story = { args: { invalid: true } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Sent 8:14 AM' } };

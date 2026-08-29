import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';
import { Field } from './Field';

const meta = {
  title: 'Data Input/Text Input',
  component: TextInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A single line of text. 40px tall, 12px radius. The data variant switches to Roboto Mono Light for anything the operator reads as a value rather than prose — invoice numbers, PO codes, SKUs.',
      },
    },
  },
  render: (args) => (
    <div className="w-[320px]">
      <Field label="Vendor reference">
        <TextInput {...args} />
      </Field>
    </div>
  ),
  args: { placeholder: 'e.g. HP-2026-08' },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: 'HP-2026-08' } };
export const DataType: Story = { args: { data: true, defaultValue: 'INV-20841' } };
export const Invalid: Story = { args: { invalid: true, defaultValue: 'INV-2084' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'HP-2026-08' } };
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: 'HP-2026-08' } };

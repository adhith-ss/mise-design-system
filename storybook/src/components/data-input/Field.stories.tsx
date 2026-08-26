import type { Meta, StoryObj } from '@storybook/react';
import { Field } from './Field';
import { TextInput } from './TextInput';

const meta = {
  title: 'Data Input/Field',
  component: Field,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The wrapper every control sits in: label, hint, error, and the required marker. It owns the ids, so a control inside it needs no aria wiring of its own. A placeholder is never a label.',
      },
    },
  },
  args: { label: 'Cases ordered' },
  render: (args) => (
    <div className="w-[320px]">
      <Field {...args}>
        <TextInput placeholder="0" />
      </Field>
    </div>
  ),
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: 'Harbor delivers in cases of 24.' } };
export const Required: Story = { args: { required: true } };
export const WithError: Story = {
  args: { error: 'Enter a whole number of cases.', hint: 'Harbor delivers in cases of 24.' },
  parameters: { docs: { description: { story: 'An error replaces the hint rather than stacking below it, and says how to fix the problem instead of naming the rule that failed.' } } },
};
export const WithSuffix: Story = { args: { suffix: 'cases' } };
export const Disabled: Story = { args: { disabled: true } };

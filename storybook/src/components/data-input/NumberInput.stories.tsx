import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput';
import { Field } from './Field';

const meta = {
  title: 'Data Input/Number Input',
  component: NumberInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A count the operator adjusts more often than they type — cases, units, days. Steppers are 32px wide and the value is centred in General Sans Light, so a column of them reads as data. Arrow keys step; the value is clamped to min and max.',
      },
    },
  },
  args: { value: 10, unit: 'cs', min: 0, max: 99, onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-[320px]">
        <Field label="Cases" hint="Harbor delivers in cases of 24.">
          <NumberInput {...args} value={value} onChange={setValue} />
        </Field>
      </div>
    );
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AtMinimum: Story = { args: { value: 0 } };
export const NoSteppers: Story = { args: { steppers: false, value: 1486, unit: undefined } };
export const Invalid: Story = { args: { invalid: true } };
export const Disabled: Story = { args: { disabled: true } };

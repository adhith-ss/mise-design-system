import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput';
import { Field } from './Field';

const meta = {
  title: 'MVP Pilot/Data Input/Number Input',
  tags: ['archived','mvp-pilot'],
  component: NumberInput,
  parameters: {
    docsBanner: 'Archived · MVP Pilot (0.1.0). Reference only. Use 0.2.0 components.',
    layout: 'padded',
    docs: {
      description: {
        component:
          'Archived · MVP Pilot (0.1.0). Reference only. Use 0.2.0 components. A count the operator adjusts more often than they type — cases, units, days. Steppers are 32px wide and the value is centred in Roboto Mono Light, so a column of them reads as data. Arrow keys step; the value is clamped to min and max.',
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

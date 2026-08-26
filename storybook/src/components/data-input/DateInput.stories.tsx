import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateInput } from './DateInput';
import { Field } from './Field';

const meta = {
  title: 'Data Input/Date Input',
  component: DateInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A delivery date, an invoice date, a period. Native picker, so the platform\'s locale and keyboard behaviour apply rather than a bespoke calendar the operator has to learn. Range mode binds the two inputs so the end can never precede the start.',
      },
    },
  },
  args: { value: '2026-08-25', onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const [end, setEnd] = useState('2026-08-31');
    return (
      <div className="w-[400px]">
        <Field label={args.mode === 'range' ? 'Period' : 'Delivery date'}>
          <DateInput {...args} value={value} onChange={setValue} endValue={end} onEndChange={setEnd} />
        </Field>
      </div>
    );
  },
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};
export const Range: Story = { args: { mode: 'range' } };
export const Bounded: Story = { args: { min: '2026-08-25', max: '2026-09-30' } };
export const Invalid: Story = { args: { invalid: true } };
export const Disabled: Story = { args: { disabled: true } };

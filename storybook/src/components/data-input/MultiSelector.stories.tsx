import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelector } from './MultiSelector';
import { Field } from './Field';

const categories = [
  { value: 'produce', label: 'Produce' },
  { value: 'protein', label: 'Protein' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'dry', label: 'Dry goods' },
  { value: 'bev', label: 'Beverage' },
  { value: 'chem', label: 'Chemicals', disabled: true },
];

const meta = {
  title: 'Data Input/Multi Selector',
  component: MultiSelector,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Several choices from one list, shown back as removable chips so the operator can see the whole selection without opening the menu. Past four chips it collapses to "+n more" rather than growing the control.',
      },
    },
  },
  args: { options: categories, value: ['produce', 'protein'], onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="h-[320px] w-[360px]">
        <Field label="Categories" hint="Applies to the vendor scorecard.">
          <MultiSelector {...args} value={value} onChange={setValue} />
        </Field>
      </div>
    );
  },
} satisfies Meta<typeof MultiSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { value: [] } };
export const Collapsed: Story = { args: { value: ['produce', 'protein', 'dairy', 'dry', 'bev'] } };
export const Invalid: Story = { args: { value: [], invalid: true } };
export const Disabled: Story = { args: { disabled: true } };

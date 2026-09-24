import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Selector } from './Selector';
import { Field } from './Field';

const vendors = [
  { value: 'harbor', label: 'Harbor Produce Co.', group: 'Produce' },
  { value: 'valley', label: 'Valley Greens', group: 'Produce' },
  { value: 'northside', label: 'Northside Meats', group: 'Protein' },
  { value: 'coastal', label: 'Coastal Fish', group: 'Protein', disabled: true },
];

const meta = {
  title: 'MVP Pilot/Data Input/Selector',
  tags: ['archived','mvp-pilot'],
  component: Selector,
  parameters: {
    docsBanner: 'Archived · MVP Pilot (0.1.0). Reference only. Use 0.2.0 components.',
    layout: 'padded',
    docs: {
      description: {
        component:
          'Archived · MVP Pilot (0.1.0). Reference only. Use 0.2.0 components. One choice from a known, short list. A native select, so it inherits the platform picker on touch devices. Past about fifteen options, use Typeahead instead.',
      },
    },
  },
  args: { options: vendors, value: 'harbor', onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-[320px]">
        <Field label="Vendor">
          <Selector {...args} value={value} onChange={setValue} />
        </Field>
      </div>
    );
  },
} satisfies Meta<typeof Selector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Grouped: Story = {};
export const Flat: Story = {
  args: { options: vendors.map(({ group, ...o }) => o), value: 'valley' },
};
export const WithPlaceholder: Story = { args: { value: '', placeholder: 'Choose a vendor' } };
export const Invalid: Story = { args: { invalid: true, value: '', placeholder: 'Choose a vendor' } };
export const Disabled: Story = { args: { disabled: true } };

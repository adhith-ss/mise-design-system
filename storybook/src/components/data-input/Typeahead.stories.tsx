import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Typeahead } from './Typeahead';
import { Field } from './Field';

const items = [
  { value: 'romaine', label: 'Romaine, 24 ct', meta: 'Harbor Produce · $23.00 / cs' },
  { value: 'romaine-hearts', label: 'Romaine hearts, 12 ct', meta: 'Harbor Produce · $18.40 / cs' },
  { value: 'spinach', label: 'Baby spinach, 4 lb', meta: 'Valley Greens · $16.10 / cs' },
  { value: 'ribeye', label: 'Ribeye, choice', meta: 'Northside Meats · $12.80 / lb' },
];

const meta = {
  title: 'Data Input/Typeahead',
  component: Typeahead,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Search across a list too long to show at once. Each result carries the detail that tells two similar records apart — vendor and unit price, not just the item name. A combobox: aria-expanded on the input, results in a listbox, matches announced with their count.',
      },
    },
  },
  args: { items, value: '', onChange: () => {}, placeholder: 'Search items' },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="h-[340px] w-[400px]">
        <Field label="Item" hint="Search by name, vendor, or SKU.">
          <Typeahead {...args} value={value} onChange={setValue} />
        </Field>
      </div>
    );
  },
} satisfies Meta<typeof Typeahead>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { value: 'romaine' } };
export const Loading: Story = { args: { loading: true } };
export const NoMatches: Story = { args: { items: [] } };
export const Invalid: Story = { args: { invalid: true } };
export const Disabled: Story = { args: { disabled: true, value: 'romaine' } };

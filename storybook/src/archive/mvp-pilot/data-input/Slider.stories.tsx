import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';
import { Field } from './Field';

const meta = {
  title: 'MVP Pilot/Data Input/Slider',
  tags: ['archived','mvp-pilot'],
  component: Slider,
  parameters: {
    docsBanner: 'Archived · MVP Pilot (0.1.0). Reference only. Use 0.2.0 components.',
    layout: 'padded',
    docs: {
      description: {
        component:
          'Archived · MVP Pilot (0.1.0). Reference only. Use 0.2.0 components. An approximate value where the direction matters more than the digit — a par-level threshold, a variance tolerance. The live value sits beside the track in Roboto Mono Light. Anything the operator must type exactly is a Number Input.',
      },
    },
  },
  args: { value: 80, min: 0, max: 100, onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-[420px]">
        <Field label="Flag variances above" hint="Applies to every vendor on this location.">
          <Slider {...args} value={value} onChange={setValue} />
        </Field>
      </div>
    );
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { format: (v: number) => `${v}% of 100` } };
export const WithEndLabels: Story = {
  args: { format: (v: number) => `${v}% of 100`, minLabel: 'Flag everything', maxLabel: 'Only large gaps' },
};
export const Currency: Story = {
  args: { min: 0, max: 500, step: 10, value: 50, format: (v: number) => `$${v}` },
};
export const Disabled: Story = { args: { disabled: true, format: (v: number) => `${v}% of 100` } };

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToggleButtonGroup } from './ToggleButtonGroup';

const options = [
  { value: 'variance', label: 'Variances' },
  { value: 'unmatched', label: 'Unmatched' },
  { value: 'credits', label: 'Credits' },
];

const meta = {
  title: 'Action/Toggle Button Group',
  component: ToggleButtonGroup,
  parameters: {
    docs: {
      description: {
        component:
          'A set of toggles sharing one container. Single-select behaves like a filter switch; multi-select behaves like a set of flags. Both announce their state through aria-pressed on each button.',
      },
    },
  },
  args: { options, label: 'Invoice filters', value: 'variance' },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <ToggleButtonGroup {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof ToggleButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSelect: Story = {};
export const MultiSelect: Story = { args: { multiple: true, value: ['variance', 'credits'] } };
export const WithDisabledOption: Story = {
  args: { options: [...options, { value: 'archived', label: 'Archived', disabled: true }] },
};

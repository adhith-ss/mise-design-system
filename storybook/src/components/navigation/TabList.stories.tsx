import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TabList } from './TabList';

const tabs = [
  { value: 'lines', label: 'Lines', count: 14 },
  { value: 'variances', label: 'Variances', count: 2 },
  { value: 'documents', label: 'Documents', count: 3 },
  { value: 'history', label: 'History' },
];

const meta = {
  title: 'Navigation/Tab List',
  component: TabList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Views of one record. Tabs never navigate between records — that is Side Nav — and never lose the operator\'s place when they come back. Arrow keys move between tabs, Tab moves into the panel.',
      },
    },
  },
  args: { tabs, value: 'lines', label: 'Invoice sections', onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <div className="w-[560px]"><TabList {...args} value={value} onChange={setValue} /></div>;
  },
} satisfies Meta<typeof TabList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Underline: Story = {};
export const Enclosed: Story = { args: { appearance: 'enclosed' } };
export const Small: Story = { args: { size: 'sm' } };
export const WithDisabled: Story = {
  args: { tabs: [...tabs, { value: 'payments', label: 'Payments', disabled: true }] },
};

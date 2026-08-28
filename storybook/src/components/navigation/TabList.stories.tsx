import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TabList } from './TabList';
import { Icon } from '../content/Icon';
import { List, AlertTriangle, FileText, Clock } from 'lucide-react';

const tabs = [
  { value: 'lines', label: 'Lines', count: 14 },
  { value: 'variances', label: 'Variances', count: 2 },
  { value: 'documents', label: 'Documents', count: 3 },
  { value: 'history', label: 'History' },
];

const tabsWithIcons = [
  { value: 'lines', label: 'Lines', count: 14, icon: <Icon icon={List} size="sm" /> },
  { value: 'variances', label: 'Variances', count: 2, icon: <Icon icon={AlertTriangle} size="sm" /> },
  { value: 'documents', label: 'Documents', count: 3, icon: <Icon icon={FileText} size="sm" /> },
  { value: 'history', label: 'History', icon: <Icon icon={Clock} size="sm" /> },
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
export const WithIcons: Story = { args: { tabs: tabsWithIcons } };
export const WithIconsEnclosed: Story = {
  args: { tabs: tabsWithIcons, appearance: 'enclosed' },
  parameters: { docs: { description: { story: "The active tab's count reads at the same ink-900 weight as its label here — 'underline' uses brand-600 instead, matching that appearance's own active colour." } } },
};

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TreeList } from './TreeList';

const nodes = [
  {
    id: 'produce',
    label: 'Produce',
    trailing: <span className="font-data text-[12px] text-ink-500">$3,806.44</span>,
    children: [
      { id: 'harbor', label: 'Harbor Produce Co.', trailing: <span className="font-data text-[12px] text-ink-500">$2,914.10</span> },
      { id: 'valley', label: 'Valley Greens', trailing: <span className="font-data text-[12px] text-ink-500">$892.34</span> },
    ],
  },
  {
    id: 'protein',
    label: 'Protein',
    trailing: <span className="font-data text-[12px] text-ink-500">$4,120.60</span>,
    children: [
      { id: 'northside', label: 'Northside Meats' },
      { id: 'coastal', label: 'Coastal Fish' },
    ],
  },
  { id: 'dry', label: 'Dry goods', trailing: <span className="font-data text-[12px] text-ink-500">$1,204.00</span> },
];

const meta = {
  title: 'Table & List/Tree List',
  component: TreeList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A hierarchy two or three levels deep — categories to vendors, locations to kitchens. Deeper than three levels and the operator loses the thread; that structure wants a Table with a group column instead.',
      },
    },
  },
  args: { nodes, label: 'Spend by category', defaultExpanded: ['produce'] },
  render: (args) => {
    const [selected, setSelected] = useState<string | undefined>('harbor');
    return <div className="w-[420px]"><TreeList {...args} selectedId={selected} onSelect={setSelected} /></div>;
  },
} satisfies Meta<typeof TreeList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllCollapsed: Story = { args: { defaultExpanded: [] } };
export const AllExpanded: Story = { args: { defaultExpanded: ['produce', 'protein'] } };

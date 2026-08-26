import type { Meta, StoryObj } from '@storybook/react';
import { OverflowList } from './OverflowList';
import { Badge } from '../feedback/Badge';

const vendors = ['Harbor Produce', 'Valley Greens', 'Northside Meats', 'Coastal Fish', 'Baker & Co.', 'Union Dairy'];

const meta = {
  title: 'Table & List/Overflow List',
  component: OverflowList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A row of items that will not always fit — vendors on an order, tags on an item. The overflow is counted rather than silently clipped, because "and 3 others" changes how the operator reads the row.',
      },
    },
  },
  args: {
    unit: 'vendors',
    items: vendors.map((v) => <Badge key={v} appearance="outline" size="sm">{v}</Badge>),
  },
  render: (args) => <div className="w-[480px]"><OverflowList {...args} /></div>,
} satisfies Meta<typeof OverflowList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Expandable: Story = {};
export const CountOnly: Story = { args: { behaviour: 'count' } };
export const FitsEntirely: Story = { args: { visibleCount: 6 } };
export const TwoVisible: Story = { args: { visibleCount: 2 } };

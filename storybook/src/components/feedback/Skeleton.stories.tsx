import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Feedback & Status/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The shape of content that is about to arrive. It must match the real layout, or the page jumps when data lands — which is worse than a blank space. Hidden from assistive tech; the container carries aria-busy instead.',
      },
    },
  },
  args: { shape: 'text', lines: 3 },
  render: (args) => <div className="w-[320px]"><Skeleton {...args} /></div>,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextLines: Story = {};
export const Block: Story = { args: { shape: 'block', lines: 1 } };
export const Circle: Story = { args: { shape: 'circle', lines: 1, width: 32 } };

export const CardLoading: Story = {
  parameters: { docs: { description: { story: 'Composed to match the vendor card it replaces — same 30px avatar, same two-line header, same figure row.' } } },
  render: () => (
    <div aria-busy="true" className="flex w-[340px] flex-col gap-3 rounded-lg border border-line bg-surface p-4">
      <div className="flex items-center gap-[10px]">
        <Skeleton shape="circle" width={30} height={30} />
        <div className="flex flex-1 flex-col gap-[6px]">
          <Skeleton width="60%" />
          <Skeleton width="40%" height={11} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Skeleton lines={2} />
        <Skeleton lines={2} />
      </div>
    </div>
  ),
};

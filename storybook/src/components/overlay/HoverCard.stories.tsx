import type { Meta, StoryObj } from '@storybook/react';
import { HoverCard } from './HoverCard';

const meta = {
  title: 'Overlay/Hover Card',
  component: HoverCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '500ms open delay, 200ms close grace so the pointer can travel into the card. Read-only: no forms, no destructive actions, at most one link. Keyboard users reach the same content by activating the reference, so the card is never the only path to it.',
      },
    },
  },
  args: {
    openDelay: 0,
    trigger: (
      <span className="cursor-default text-[14px] font-semibold text-brand-600 shadow-[inset_0_-1px_0_var(--mise-brand-200)]">
        Harbor Produce
      </span>
    ),
    children: (
      <span className="flex flex-col gap-[10px]">
        <span className="flex items-center gap-[10px]">
          <span aria-hidden="true" className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-surface-sunken text-[11px] font-bold text-ink-700">HP</span>
          <span className="flex flex-col">
            <span className="text-[13.5px] font-bold">Harbor Produce Co.</span>
            <span className="text-[12px] text-ink-500">Produce · Tue, Thu delivery</span>
          </span>
        </span>
        <span className="grid grid-cols-2 gap-[10px]">
          <span className="flex flex-col">
            <span className="text-[11.5px] text-ink-500">Period spend</span>
            <span className="font-data text-[13px]">$3,806.44</span>
          </span>
          <span className="flex flex-col">
            <span className="text-[11.5px] text-ink-500">Open variances</span>
            <span className="font-data text-[13px] text-alert">2</span>
          </span>
        </span>
      </span>
    ),
  },
  render: (args) => (
    <div className="h-[280px] pt-8 text-[14px]">
      Order sent to <HoverCard {...args} /> on Monday.
    </div>
  ),
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true } };
export const Above: Story = { args: { placement: 'top' } };

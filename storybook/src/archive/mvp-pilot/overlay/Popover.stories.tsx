import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../action/Button';
import { CheckboxInput } from '../data-input/CheckboxInput';

const meta = {
  title: 'MVP Pilot/Overlay/Popover',
  tags: ['archived','mvp-pilot'],
  component: Popover,
  parameters: {
    docsBanner: 'Archived · MVP Pilot (0.1.0). Reference only. Use 0.2.0 components.',
    layout: 'padded',
    docs: {
      description: {
        component:
          'Archived · MVP Pilot (0.1.0). Reference only. Use 0.2.0 components. A small piece of interactive content anchored to its trigger — a filter panel, a column picker, a quick edit. Opens on click, never on hover, and does not block the page. A Popover never contains another Popover; nested choices become a Dialog.',
      },
    },
  },
  args: {
    defaultOpen: true,
    width: 250,
    trigger: <Button variant="secondary" size="sm">Filter</Button>,
  },
  render: (args) => (
    <div className="h-[300px]">
      <Popover {...args}>
        <div className="flex flex-col gap-3">
          <span className="text-[13px] font-bold">Filter invoices</span>
          <CheckboxInput checked onChange={() => {}} label="Variances only" />
          <CheckboxInput checked={false} onChange={() => {}} label="Unmatched lines" />
          <div className="h-px bg-line-soft" />
          <div className="flex justify-between">
            <Button variant="ghost" size="sm">Clear</Button>
            <Button variant="primary" size="sm">Apply</Button>
          </div>
        </div>
      </Popover>
    </div>
  ),
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};
export const Closed: Story = { args: { defaultOpen: false } };
export const AlignedEnd: Story = { args: { placement: 'bottom-end' } };
export const MatchTriggerWidth: Story = { args: { width: 'trigger' } };

import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta = {
  title: 'Content/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A rule between groups of content. Decorative and hidden from assistive tech unless it carries a label, in which case the label does the dividing and the lines are the decoration. Soft weight inside a card, default between sections.',
      },
    },
  },
  args: {},
  render: (args) => (
    <div className="w-[480px]">
      <p className="m-0 text-[13px] text-ink-700">August invoices</p>
      <Divider {...args} />
      <p className="m-0 text-[13px] text-ink-700">July invoices</p>
    </div>
  ),
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Soft: Story = { args: { weight: 'soft', spacing: 'sm' } };
export const WithLabel: Story = { args: { label: 'Earlier' } };
export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-3 text-[13px] text-ink-700">
      34 invoices <Divider orientation="vertical" /> 2 variances <Divider orientation="vertical" /> $3,495.65
    </div>
  ),
};

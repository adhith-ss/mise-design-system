import type { Meta, StoryObj } from '@storybook/react';
import { DecisionApproval } from './DecisionApproval';
import { patternViewports } from './_shared';

const meta = {
  title: 'Post-MVP/Patterns/DecisionApproval',
  component: DecisionApproval,
  parameters: {
    layout: 'padded',
    ...patternViewports,
    docs: {
      description: {
        component:
          'Proposal versus current comparison for a pricing or supplier plan. Changing a plate-cost target requires a reason; acknowledgement is always required. Approve stays disabled until both pass. Approval records a plan in session History — refresh sources before acting.',
      },
    },
  },
  args: {
    kind: 'Supplier',
    dishName: 'Ahi Poke Bowl',
    state: 'default',
  },
  render: (args) => (
    <div className="w-full max-w-[460px]">
      <DecisionApproval {...args} />
    </div>
  ),
} satisfies Meta<typeof DecisionApproval>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Pricing: Story = { args: { kind: 'Pricing' } };
export const ReasonRequired: Story = {
  args: { kind: 'Supplier', proposedValue: 4.9, reason: '' },
  render: (args) => (
    <div className="w-full max-w-[460px]">
      <DecisionApproval {...args} proposedValue={4.2} />
    </div>
  ),
};
export const Disabled: Story = { args: { state: 'disabled', disabled: true } };
export const Error: Story = {
  args: { state: 'error' },
  render: (args) => (
    <div className="w-full max-w-[460px]">
      <DecisionApproval {...args} proposedValue={0} />
    </div>
  ),
};
export const Success: Story = { args: { state: 'success' } };

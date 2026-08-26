import type { Meta, StoryObj } from '@storybook/react';
import { InlineApproval } from './InlineApproval';

const meta = {
  title: 'Chat & Agent/Inline Approval',
  component: InlineApproval,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'sunken' },
    docs: {
      description: {
        component:
          'The gate between a draft and a commitment. It states exactly what will happen, to whom, and for how much, and it is the only component in the system that turns agent intent into an action against a vendor. Approve is never the default focus, and an unanswered approval is pinned rather than allowed to scroll away.',
      },
    },
  },
  args: {
    title: 'Send credit request for $138.00 to Harbor Produce',
    expiresIn: 'expires in 12 min',
    facts: [
      { label: 'Vendor', value: 'Harbor Produce Co.' },
      { label: 'Amount', value: '$138.00' },
      { label: 'Against', value: 'PO-4471 · INV-20841, 20902' },
      { label: 'Reversible', value: 'Undo for 10 minutes' },
    ],
    rationale:
      'Drafted from 2 short deliveries against PO-4471. The message quotes both invoice numbers and the received counts.',
  },
} satisfies Meta<typeof InlineApproval>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pending: Story = {};

export const Permanent: Story = {
  args: {
    title: 'Cancel PO-4471 with Harbor Produce',
    impact: 'permanent',
    approveLabel: 'Cancel order',
    facts: [
      { label: 'Vendor', value: 'Harbor Produce Co.' },
      { label: 'Order value', value: '$1,486.10' },
      { label: 'Delivery', value: 'Tue 6:00 AM' },
      { label: 'Reversible', value: 'No' },
    ],
    rationale: 'Harbor has already confirmed this order. Cancelling after 8:00 PM may still be charged.',
  },
};

export const NeedsAnotherRole: Story = {
  args: { requiresRole: 'Manager', rationale: 'Sending credits is limited to managers. Dana R. can approve this.' },
};

export const Approved: Story = {
  args: { resolution: { state: 'approved', by: 'Dana R.', at: '8:14 AM', undoFor: '10 min' } },
};

export const Declined: Story = { args: { resolution: { state: 'declined' } } };

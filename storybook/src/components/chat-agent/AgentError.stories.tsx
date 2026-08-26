import type { Meta, StoryObj } from '@storybook/react';
import { AgentError } from './AgentError';

const meta = {
  title: 'Chat & Agent/Agent Error',
  component: AgentError,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'When the agent cannot finish. It says what stopped, what it did complete, and what the operator can do — including doing it by hand. No provider names, status codes, or stack traces, and never an auto-retry on a write.',
      },
    },
  },
  args: {
    kind: 'network',
    title: "Couldn't reach Harbor Produce's ordering system",
    body: "The draft credit request is saved and nothing was sent. Harbor's portal has been unavailable since 8:02 AM.",
    primaryLabel: 'Try again',
    secondaryLabel: 'Email the request instead',
  },
} satisfies Meta<typeof AgentError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Network: Story = {};

export const Permission: Story = {
  args: {
    kind: 'permission',
    title: "You don't have permission to send credits",
    body: 'Sending credit requests is limited to managers. The draft is ready for Dana R. to approve.',
    primaryLabel: 'Ask Dana to approve',
    secondaryLabel: 'View the draft',
  },
};

export const Timeout: Story = {
  args: {
    kind: 'timeout',
    title: 'I stopped after 8 of 34 invoices',
    body: 'The period you asked about is larger than one run.',
    completed: 'The 8 checked invoices are summarised above and two variances were found.',
    primaryLabel: 'Continue from invoice 9',
    secondaryLabel: 'Narrow to Harbor only',
  },
};

export const Refusal: Story = {
  args: {
    kind: 'refusal',
    title: "I won't send a payment without an approved invoice match",
    body: 'INV-20902 has two unmatched lines. Resolve those first and I can queue the payment.',
    primaryLabel: 'Review unmatched lines',
    secondaryLabel: 'Pay by hand',
    reportId: 'ref 8f21c4',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Message } from './Message';
import { Citation } from './Citation';

const meta = {
  title: 'Chat & Agent/Message',
  component: Message,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'One turn in the conversation. Operator turns are tinted and right-aligned; agent turns sit flush left on the page surface with no bubble, so long answers read as documents rather than chat.',
      },
    },
  },
  argTypes: {
    role: { control: 'inline-radio', options: ['user', 'agent', 'system'] },
    children: { control: 'text' },
  },
  args: { role: 'agent', children: 'Yes — twice. You are owed $138.00.' },
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AgentTurn: Story = {
  args: {
    footer: { sources: '2 invoices', duration: 1400 },
    children:
      "Yes — twice. Tuesday's delivery was 4 cases short against PO-4471, and Thursday's was 2 short. Both were invoiced in full, so you are owed $138.00.",
  },
};

export const OperatorTurn: Story = {
  args: { role: 'user', footer: undefined, children: 'Did Harbor short us on romaine again this week?' },
};

export const Streaming: Story = {
  args: { streaming: true, footer: undefined, children: 'Drafting the credit request now' },
  parameters: {
    docs: { description: { story: 'Tokens stream into their final layout, so nothing reflows when the turn completes. The caret is decorative and suppressed under prefers-reduced-motion.' } },
  },
};

export const WithCitations: Story = {
  args: {
    footer: { sources: '2 invoices', duration: 1400 },
    children: (
      <>
        Harbor invoiced 24 cases but the kitchen received 20{' '}
        <Citation recordType="invoice" label="INV-20841 · line 3" href="#" />, and the same gap
        appears on Thursday <Citation recordType="invoice" label="INV-20902 · line 1" href="#" />.
      </>
    ),
  },
};

export const ErrorTurn: Story = {
  args: {
    error: true,
    footer: undefined,
    children: "I couldn't reach Harbor's ordering system. The draft is saved and nothing was sent.",
  },
};

/** Every role and state on one canvas — the visual-regression baseline. */
export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex max-w-[720px] flex-col gap-[22px]">
      <Message role="user">Did Harbor short us on romaine again this week?</Message>
      <Message role="agent" footer={{ sources: '2 invoices', duration: 1400 }}>
        Yes — twice. You are owed $138.00.
      </Message>
      <Message role="agent" streaming>Drafting the credit request now</Message>
      <Message role="system">Dana R. joined this thread</Message>
    </div>
  ),
};

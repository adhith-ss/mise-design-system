import type { Meta, StoryObj } from '@storybook/react';
import { AgentStatus } from './AgentStatus';

const meta = {
  title: 'Chat & Agent/Agent Status',
  component: AgentStatus,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'What the agent is doing right now, in the operator\'s words. Named steps replace indeterminate spinners for any task over two seconds, and every step can be interrupted. Step changes are announced politely, at most once every two seconds.',
      },
    },
  },
  args: {
    state: 'working',
    onStop: () => {},
    steps: [
      { label: "Pulled last week's Harbor invoices", status: 'done', meta: '1.1s' },
      { label: 'Matched lines against PO-4471', status: 'done', meta: '0.6s' },
      { label: 'Drafting credit request', status: 'active', meta: 'now' },
      { label: 'Send to vendor', status: 'pending', meta: 'needs approval' },
    ],
  },
} satisfies Meta<typeof AgentStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Working: Story = {};
export const Waiting: Story = { args: { state: 'waiting', compact: true } };
export const Idle: Story = { args: { state: 'idle', compact: true, detail: 'last run 8:14 AM' } };
export const CompactWorking: Story = { args: { compact: true, detail: 'Reading invoices · 3 of 8' } };

export const Stopped: Story = {
  args: {
    state: 'stopped',
    steps: [
      { label: "Pulled last week's Harbor invoices", status: 'done', meta: '1.1s' },
      { label: 'Matched lines against PO-4471', status: 'pending', meta: 'stopped by you' },
    ],
  },
};

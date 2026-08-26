import type { Meta, StoryObj } from '@storybook/react';
import { SuggestionChips } from './SuggestionChips';

const meta = {
  title: 'Chat & Agent/Suggestion Chip',
  component: SuggestionChips,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Two to four next moves offered after a turn, phrased as the operator would say them. A chip may draft but never commits — anything that spends money routes to Inline Approval. Chips are announced as a group after the answer, and disappear once the operator types.',
      },
    },
  },
  args: {
    items: [
      { label: 'Show both short deliveries side by side', intent: 'compare_deliveries' },
      { label: 'Draft the credit request', intent: 'draft_credit' },
      { label: 'Flag Harbor for the Friday vendor review', intent: 'flag_vendor' },
    ],
  },
} satisfies Meta<typeof SuggestionChips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithDisabled: Story = {
  args: {
    items: [
      { label: 'Draft the credit request', intent: 'draft_credit' },
      { label: 'Send to Harbor', intent: 'send', disabled: true },
    ],
  },
  parameters: { docs: { description: { story: 'A chip is disabled when the operator lacks the role for it — never hidden, so the path stays discoverable.' } } },
};
export const CappedAtFour: Story = {
  args: {
    items: [
      { label: 'Compare deliveries', intent: 'a' },
      { label: 'Draft credit', intent: 'b' },
      { label: 'Flag vendor', intent: 'c' },
      { label: 'Export the week', intent: 'd' },
      { label: 'This fifth chip is dropped', intent: 'e' },
    ],
  },
};

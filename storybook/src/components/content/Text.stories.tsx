import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta = {
  title: 'Content/Text',
  component: Text,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Body copy at three sizes and five tones. The data flag switches to Roboto Mono Light for values rather than prose — the single most-used option in the system.',
      },
    },
  },
  args: { children: 'Harbor invoiced 24 cases but the kitchen received 20.', measure: true },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {};
export const Dense: Story = { args: { size: 'dense', tone: 'muted' } };
export const Meta: Story = { args: { size: 'meta', tone: 'quiet', children: 'Received Aug 22 · 14 lines' } };
export const DataValue: Story = { args: { data: true, children: '$1,486.10', measure: false } };
export const Danger: Story = { args: { tone: 'danger', size: 'dense', children: 'This period is closed.' } };
export const Measured: Story = {
  args: {
    children:
      'Two short deliveries against PO-4471 this week. Both were invoiced in full, so a $138.00 credit is owed. The agent has drafted the request and it is waiting on your approval.',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Feedback & Status/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          'A record\'s state, where the state changes how the operator acts on it. If the value is metadata — received Aug 22, 14 lines — it is Text, not a Badge. A live connection state is a Status Dot.',
      },
    },
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['success', 'warning', 'danger', 'info', 'neutral'] },
    appearance: { control: 'inline-radio', options: ['subtle', 'solid', 'outline'] },
  },
  args: { children: 'Needs review', tone: 'warning' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Subtle: Story = {};
export const Solid: Story = {
  args: { appearance: 'solid', tone: 'danger', children: 'Failed' },
  parameters: { docs: { description: { story: 'Reserve solid for one urgent state per screen. Two solid badges in a table cancel each other out.' } } },
};
export const Outline: Story = { args: { appearance: 'outline', children: 'Produce' } };
export const WithDot: Story = { args: { dot: true, tone: 'success', children: 'Matched' } };
export const WithCount: Story = { args: { count: 2, children: 'Variances' } };
export const Small: Story = { args: { size: 'sm', tone: 'success', children: 'Paid' } };

export const AllTones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Badge tone="success">Approved</Badge>
        <Badge tone="warning">Needs review</Badge>
        <Badge tone="danger">Over budget</Badge>
        <Badge tone="info">Draft</Badge>
        <Badge tone="neutral">Archived</Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge tone="success" appearance="solid">Paid</Badge>
        <Badge tone="danger" appearance="solid">Failed</Badge>
      </div>
    </div>
  ),
};

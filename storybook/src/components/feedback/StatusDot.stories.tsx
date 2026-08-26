import type { Meta, StoryObj } from '@storybook/react';
import { StatusDot } from './StatusDot';

const meta = {
  title: 'Feedback & Status/Status Dot',
  component: StatusDot,
  parameters: {
    docs: {
      description: {
        component:
          'A live condition: a connection, a shift, an agent run. Distinct from a Badge, which describes a record\'s stored state. The label is required — a bare coloured dot is meaningless to anyone who cannot see it or cannot tell the colours apart.',
      },
    },
  },
  args: { tone: 'success', label: 'Connected' },
} satisfies Meta<typeof StatusDot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Connected: Story = {};
export const Live: Story = { args: { live: true, label: 'Agent working' } };
export const Waiting: Story = { args: { tone: 'warning', label: 'Waiting on approval' } };
export const Down: Story = { args: { tone: 'danger', label: "Harbor's portal is down" } };
export const Idle: Story = { args: { tone: 'neutral', label: 'Idle · last run 8:14 AM' } };
export const LabelHidden: Story = {
  args: { labelHidden: true },
  parameters: { docs: { description: { story: 'Only inside a row that already names the record in text — the label stays in the accessibility tree either way.' } } },
};

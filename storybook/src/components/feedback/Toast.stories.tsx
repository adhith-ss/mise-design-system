import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta = {
  title: 'Feedback & Status/Toast',
  component: Toast,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Confirmation that something happened, for work the operator already knows about. Past tense, one action, almost always Undo. The timer pauses on hover and focus; an error toast never auto-dismisses.',
      },
    },
  },
  args: { title: 'Order sent to Harbor Produce', tone: 'success', onDismiss: () => {} },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};
export const WithUndo: Story = {
  args: {
    description: '$1,486.10 · delivery Tue 6:00 AM',
    action: <button type="button" className="text-[12.5px] font-semibold text-brand-600">Undo</button>,
  },
};
export const Error: Story = {
  args: { tone: 'danger', title: "Couldn't send the order", description: "Harbor's portal is not responding. The draft is saved." },
  parameters: { docs: { description: { story: 'Errors carry role="alert" and stay until dismissed — a failure the operator can miss is a failure they will discover from the vendor instead.' } } },
};
export const Neutral: Story = { args: { tone: 'neutral', title: 'Draft saved', description: 'Nothing sent yet.' } };

export const Stack: Story = {
  render: () => (
    <div className="flex flex-col gap-[10px]">
      <Toast tone="success" title="Order sent to Harbor Produce" onDismiss={() => {}} />
      <Toast tone="neutral" title="Credit request drafted" description="Waiting on your approval." onDismiss={() => {}} />
    </div>
  ),
};

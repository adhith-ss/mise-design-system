import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialog } from './AlertDialog';

const meta = {
  title: 'MVP Pilot/Overlay/Alert Dialog',
  tags: ['archived','mvp-pilot'],
  component: AlertDialog,
  parameters: {
    docsBanner: 'Archived · MVP Pilot (0.1.0). Reference only. Use 0.2.0 components.',
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Archived · MVP Pilot (0.1.0). Reference only. Use 0.2.0 components. A confirmation for something irreversible or expensive. The title asks the question, the body states the consequence, and the confirm button names the action. Role alertdialog; focus lands on cancel for danger tone, and there is no backdrop dismissal.',
      },
    },
  },
  args: {
    open: true,
    title: 'Cancel PO-4471?',
    description: 'Harbor Produce has already confirmed this order. Cancelling after 8:00 PM may still be charged.',
    confirmLabel: 'Cancel order',
    cancelLabel: 'Keep order',
    tone: 'danger',
    onConfirm: () => {},
    onOpenChange: () => {},
  },
  render: (args) => <div className="h-[420px] bg-canvas"><AlertDialog {...args} /></div>,
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Danger: Story = {};
export const Default: Story = {
  args: {
    tone: 'default',
    title: 'Send PO-4471 to Harbor Produce?',
    description: '$1,486.10 · delivery Tue 6:00 AM. You can undo for 10 minutes after sending.',
    confirmLabel: 'Send order',
    cancelLabel: 'Not now',
  },
};
export const TypedConfirmation: Story = {
  args: {
    title: 'Delete Harbor Produce?',
    description: 'This removes the vendor, their catalogue, and 3 years of invoice history. It cannot be undone.',
    confirmLabel: 'Delete vendor',
    requireTypedConfirmation: 'HARBOR',
  },
};
export const Loading: Story = { args: { loading: true, tone: 'default', confirmLabel: 'Sending…' } };

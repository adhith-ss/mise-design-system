import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';

const steps = [
  { label: 'Vendor details', detail: 'Name, contact, delivery days', status: 'done' as const },
  { label: 'Catalogue', detail: '84 items imported', status: 'done' as const },
  { label: 'Par levels', detail: 'Set what to keep on hand', status: 'current' as const },
  { label: 'First order', status: 'upcoming' as const },
];

const meta = {
  title: 'Navigation/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A task with a fixed order — onboarding a vendor, closing a period. Completed steps stay clickable so the operator can go back and check; upcoming ones do not, because the order is the point.',
      },
    },
  },
  args: { steps },
  render: (args) => <div className="w-[720px]"><Stepper {...args} /></div>,
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};
export const Vertical: Story = { args: { orientation: 'vertical' } };
export const WithError: Story = {
  args: {
    orientation: 'vertical',
    steps: [
      steps[0],
      { label: 'Catalogue', detail: '3 items have no price', status: 'error' as const },
      { label: 'Par levels', status: 'upcoming' as const },
    ],
  },
};
export const Clickable: Story = { args: { onStepClick: () => {} } };

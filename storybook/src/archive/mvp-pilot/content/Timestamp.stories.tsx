import type { Meta, StoryObj } from '@storybook/react';
import { Timestamp } from './Timestamp';

const meta = {
  title: 'MVP Pilot/Content/Timestamp',
  tags: ['archived','mvp-pilot'],
  component: Timestamp,
  parameters: {
    docsBanner: 'Archived · MVP Pilot (0.1.0). Reference only. Use 0.2.0 components.',
    docs: {
      description: {
        component:
          'Archived · MVP Pilot (0.1.0). Reference only. Use 0.2.0 components. A point in time. Relative for recent activity, absolute for records — an invoice date is never "3 days ago" on a document someone will file. Always a <time> element with the ISO value, and the full date-time in the title attribute.',
      },
    },
  },
  args: { value: '2026-08-22T14:12:00' },
} satisfies Meta<typeof Timestamp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Absolute: Story = {};
export const WithTime: Story = { args: { withTime: true } };
export const Relative: Story = { args: { format: 'relative' } };
export const Both: Story = {
  args: { format: 'both', withTime: true },
  parameters: { docs: { description: { story: 'For audit trails, where the operator needs the exact moment and the sense of how long ago it was.' } } },
};
export const Dense: Story = { args: { size: 'dense', withTime: true } };

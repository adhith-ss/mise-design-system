import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Button } from '../action/Button';

const meta = {
  title: 'MVP Pilot/Feedback & Status/Empty State',
  tags: ['archived','mvp-pilot'],
  component: EmptyState,
  parameters: {
    docsBanner: 'Archived · MVP Pilot (0.1.0). Reference only. Use 0.2.0 components.',
    layout: 'padded',
    docs: {
      description: {
        component:
          'Archived · MVP Pilot (0.1.0). Reference only. Use 0.2.0 components. A view with nothing in it. Every empty state says which of four reasons it is: never used, nothing matched, nothing left to do, or something broke. "No data" is never enough — the operator needs to know whether that is good news.',
      },
    },
  },
  args: {
    kind: 'first-run',
    title: 'No vendors yet',
    children: 'Add your first vendor and the agent can start drafting orders against their catalogue.',
    action: <Button variant="primary" size="sm">Add a vendor</Button>,
  },
  render: (args) => <div className="w-[560px]"><EmptyState {...args} /></div>,
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstRun: Story = {};
export const NoResults: Story = {
  args: {
    kind: 'no-results',
    title: 'No invoices match these filters',
    children: 'Try widening the date range, or clear the variance filter.',
    action: <Button variant="neutral" size="sm">Clear filters</Button>,
  },
};
export const AllClear: Story = {
  args: {
    kind: 'all-clear',
    title: 'Nothing to review',
    children: 'All 34 invoices for August are matched. The agent will flag anything new.',
    action: undefined,
  },
  parameters: { docs: { description: { story: 'The one empty state that is good news, so it gets the success frame rather than the neutral one.' } } },
};
export const Error: Story = {
  args: {
    kind: 'error',
    title: "Couldn't load invoices",
    children: 'The connection to your accounting system dropped. Nothing has changed on your side.',
    // White on the red frame, not the usual green primary — this is a retry
    // sitting on an already-alarming surface, so the button itself stays
    // calm. Green only shows up on hover, as the invitation to act.
    action: (
      <Button
        variant="neutral"
        size="sm"
        className="!border-transparent !bg-white !text-ink-900 hover:!bg-brand-600 hover:!text-white"
      >
        Try again
      </Button>
    ),
  },
};
export const Compact: Story = { args: { size: 'sm', action: undefined } };

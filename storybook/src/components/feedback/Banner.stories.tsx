import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from './Banner';
import { Button } from '../action/Button';

const meta = {
  title: 'Feedback & Status/Banner',
  component: Banner,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A condition affecting the whole page or record, staying until it is resolved. Anything transient is a Toast. One action only — two actions means the decision deserves a Dialog.',
      },
    },
  },
  args: {
    tone: 'warning',
    title: '2 invoices have unmatched lines',
    children: 'Harbor Produce, Aug 22 and Aug 24. Match them before this period closes on Friday.',
  },
  render: (args) => <div className="w-[620px]"><Banner {...args} /></div>,
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Warning: Story = {};
export const Danger: Story = {
  args: { tone: 'danger', title: 'This period is closed', children: 'Changes to August invoices need a manager to reopen the period.' },
};
export const Success: Story = {
  args: { tone: 'success', title: 'Period closed', children: 'All 34 invoices matched. Nothing outstanding with Harbor Produce.' },
};
export const Info: Story = { args: { tone: 'info', title: 'The agent is drafting your Monday order', children: 'Based on last week and current par levels.' } };
export const WithAction: Story = {
  args: { action: <Button size="sm" variant="secondary">Match lines</Button> },
};
export const Dismissible: Story = { args: { onDismiss: () => {} } };
export const TitleOnly: Story = { args: { children: undefined } };

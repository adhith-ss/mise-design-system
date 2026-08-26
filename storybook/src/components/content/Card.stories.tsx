import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { MetadataList } from '../table-list/MetadataList';
import { MoreMenu } from '../action/MoreMenu';
import { Button } from '../action/Button';

const meta = {
  title: 'Content/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The default container for related content about one subject. 14px radius, 1px line, no shadow at rest — shadow means elevation, and a card on the page is not elevated. The left edge turns amber or red only when the card needs attention.',
      },
    },
  },
  args: {
    title: 'Harbor Produce Co.',
    subtitle: 'Produce · Tue, Thu delivery',
    children: (
      <MetadataList
        entries={[
          { label: 'Period spend', value: '$3,806.44', data: true },
          { label: 'Open variances', value: '2', data: true },
          { label: 'Terms', value: 'Net 30' },
          { label: 'Last order', value: 'Aug 24', data: true },
        ]}
      />
    ),
  },
  render: (args) => <div className="w-[380px]"><Card {...args} /></div>,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithAction: Story = {
  args: { action: <MoreMenu subject="Harbor Produce" items={[{ label: 'Open vendor' }, { label: 'New order' }]} /> },
};
export const WithFooter: Story = {
  args: { footer: <div className="flex justify-end"><Button size="sm" variant="secondary">New order</Button></div> },
};
export const NeedsAttention: Story = { args: { edge: 'warning' } };
export const Clickable: Story = { args: { onClick: () => {} } };
export const Bare: Story = { args: { title: undefined, subtitle: undefined, padding: 'sm' } };

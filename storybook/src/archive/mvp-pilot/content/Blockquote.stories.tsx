import type { Meta, StoryObj } from '@storybook/react';
import { Blockquote } from './Blockquote';

const meta = {
  title: 'MVP/Content/Blockquote',
  tags: ['archived','mvp-pilot'],
  component: Blockquote,
  parameters: {
    docsBanner: 'Archived · MVP (0.1.0). Reference only. Use Post-MVP components.',
    layout: 'padded',
    docs: {
      description: {
        component:
          'Archived · MVP (0.1.0). Reference only. Use Post-MVP components. Quoted material from outside the product — a vendor\'s reply, a clause from an agreement. A real <figure>/<blockquote>/<cite>, so the quotation and its source stay associated when read aloud. Never used for emphasis.',
      },
    },
  },
  args: {
    children: 'Credits for short deliveries must be requested within 7 days of the delivery date.',
    attribution: 'Harbor Produce Co.',
    source: 'Vendor agreement, §4.2',
  },
} satisfies Meta<typeof Blockquote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSource: Story = {};
export const AttributionOnly: Story = {
  args: { source: undefined, children: "We'll credit the 6 cases on your next invoice.", attribution: 'Ray at Harbor, Aug 25' },
};
export const QuoteOnly: Story = { args: { attribution: undefined, source: undefined } };

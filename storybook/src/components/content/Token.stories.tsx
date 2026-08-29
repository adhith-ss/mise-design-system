import type { Meta, StoryObj } from '@storybook/react';
import { Token } from './Token';

const meta = {
  title: 'Content/Token',
  component: Token,
  parameters: {
    docs: {
      description: {
        component:
          'An inline reference to a record — a PO number, an SKU, a filter value. Distinct from Badge, which describes a state rather than naming a thing. Always Roboto Mono Light, because a token is a value.',
      },
    },
  },
  args: { children: 'PO-4471' },
} satisfies Meta<typeof Token>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
export const WithPrefix: Story = { args: { prefix: 'SKU', children: '84-ROM-24' } };
export const Brand: Story = { args: { tone: 'brand', children: 'INV-20841' } };
export const Removable: Story = { args: { onRemove: () => {}, tone: 'brand', children: 'Harbor Produce' } };
export const InFilterRow: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[12.5px] text-ink-500">Filtered by</span>
      <Token tone="brand" onRemove={() => {}}>Harbor Produce</Token>
      <Token tone="brand" onRemove={() => {}}>Aug 18–24</Token>
      <Token tone="warning" onRemove={() => {}}>Variances only</Token>
    </div>
  ),
};

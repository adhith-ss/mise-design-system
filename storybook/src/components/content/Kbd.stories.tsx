import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from './Kbd';

const meta = {
  title: 'Content/Kbd',
  component: Kbd,
  parameters: {
    docs: {
      description: {
        component:
          'A keyboard shortcut, shown where the operator can act on it — in a menu item, a palette footer, a tooltip. Real <kbd> elements, one per key, so the sequence is spoken as keys rather than punctuation.',
      },
    },
  },
  args: { keys: ['⌘', 'K'] },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Combination: Story = {};
export const SingleKey: Story = { args: { keys: 'esc' } };
export const Sequence: Story = { args: { keys: ['⇧', '⌘', 'V'] } };
export const InContext: Story = {
  render: () => (
    <div className="flex w-[280px] items-center justify-between rounded-md border border-line bg-surface px-3 py-2 text-[13.5px]">
      Open command palette
      <Kbd keys={['⌘', 'K']} size="sm" />
    </div>
  ),
};

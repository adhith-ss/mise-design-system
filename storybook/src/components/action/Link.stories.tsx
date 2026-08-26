import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta = {
  title: 'Action/Link',
  component: Link,
  parameters: {
    docs: {
      description: {
        component:
          'Navigation to another place. If the click changes data, it is a Button, whatever it looks like. External links carry both a visible marker and a spoken hint.',
      },
    },
  },
  args: { children: 'Harbor Produce Co.', href: '#' },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {};
export const Standalone: Story = { args: { variant: 'standalone', children: 'Open invoice' } };
export const Quiet: Story = { args: { variant: 'quiet', children: 'View all 34 invoices' } };
export const External: Story = { args: { external: true, children: "Harbor's portal" } };

export const InProse: Story = {
  parameters: { layout: 'padded' },
  render: (args) => (
    <p className="max-w-[60ch] text-[14px] leading-[1.7]">
      This order went to <Link {...args} /> on Monday and was confirmed the same evening.
    </p>
  ),
};

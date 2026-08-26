import type { Meta, StoryObj } from '@storybook/react';
import { Code } from './Code';

const meta = {
  title: 'Content/Code',
  component: Code,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An inline literal — a field name, an API value, an id. In an operator-facing screen this is rare; it belongs in developer settings, integration screens, and this documentation.',
      },
    },
  },
  args: { children: 'vendor_external_id' },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {};
export const Danger: Story = { args: { tone: 'danger', children: 'null' } };
export const InProse: Story = {
  render: () => (
    <p className="max-w-[62ch] text-[14px] leading-[1.7]">
      Map your accounting system's <Code>vendor_id</Code> to Mise's{' '}
      <Code>vendor_external_id</Code> so invoices match automatically.
    </p>
  ),
};

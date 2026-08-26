import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from './CodeBlock';

const snippet = `<InlineApproval
  title="Send credit request for $138.00 to Harbor Produce"
  facts={facts}
  impact="undoable"
  onApprove={send}
/>`;

const meta = {
  title: 'Content/Code Block',
  component: CodeBlock,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A multi-line snippet: an integration payload, a component example. Dark for documentation, light when it sits inside a form or settings panel. Always scrolls rather than wrapping — a wrapped payload is unreadable.',
      },
    },
  },
  args: { children: snippet, language: 'React' },
  render: (args) => <div className="w-[620px]"><CodeBlock {...args} /></div>,
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {};
export const Light: Story = { args: { appearance: 'light' } };
export const NoHeader: Story = { args: { language: undefined, copyable: false } };
export const Json: Story = {
  args: {
    language: 'JSON',
    children: '{\n  "vendor": "harbor-produce",\n  "from": "2026-08-18",\n  "to": "2026-08-24",\n  "flags": ["variance"]\n}',
  },
};

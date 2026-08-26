import type { Meta, StoryObj } from '@storybook/react';
import { Markdown } from './Markdown';

const meta = {
  title: 'Content/Markdown',
  component: Markdown,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The typographic frame for rendered markdown — agent answers, vendor notes, policy text. It owns the vertical rhythm and the element styles, so a parsed document matches the rest of the system without the parser knowing anything about the design.',
      },
    },
  },
  args: {
    children: (
      <>
        <h2>Harbor Produce, week of Aug 18</h2>
        <p>
          Two short deliveries against <code>PO-4471</code>. Both were invoiced in full, so a{' '}
          <strong>$138.00</strong> credit is owed.
        </p>
        <ul>
          <li>Tuesday, Aug 22 — 4 cases short of romaine</li>
          <li>Thursday, Aug 24 — 2 cases short of romaine</li>
        </ul>
        <h3>What I did</h3>
        <p>
          Drafted the credit request quoting both invoice numbers and the received counts. It is
          waiting on your approval.
        </p>
        <table>
          <thead>
            <tr><th>Invoice</th><th>Amount</th><th>Gap</th></tr>
          </thead>
          <tbody>
            <tr><td>INV-20841</td><td>$742.10</td><td>4 cs</td></tr>
            <tr><td>INV-20902</td><td>$744.00</td><td>2 cs</td></tr>
          </tbody>
        </table>
      </>
    ),
  },
  render: (args) => <div className="w-[620px]"><Markdown {...args} /></div>,
} satisfies Meta<typeof Markdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AgentAnswer: Story = {};
export const Dense: Story = { args: { size: 'dense' } };
export const FullWidth: Story = { args: { measure: false } };

import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';

const meta = {
  title: 'Content/Heading',
  component: Heading,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Four levels, 40 / 30 / 24 / 17px. The semantic level is never skipped — if a heading needs to look smaller than its place in the outline, set size separately rather than demoting the tag.',
      },
    },
  },
  argTypes: { level: { control: 'inline-radio', options: [1, 2, 3, 4] } },
  args: { level: 1, children: 'Harbor Produce Co.' },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PageTitle: Story = { args: { eyebrow: 'Vendor', sub: 'Produce · Tue, Thu delivery · net 30' } };
export const Section: Story = { args: { level: 2, children: 'August invoices' } };
export const Subsection: Story = { args: { level: 3, children: 'Variances' } };
export const CardTitle: Story = { args: { level: 4, children: 'Line total' } };
export const DemotedSize: Story = {
  args: { level: 2, size: 4, children: 'Kept as an h2 in the outline, sized as an h4' },
};
export const Scale: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <Heading level={1}>Page title, 40px</Heading>
      <Heading level={2}>Section, 30px</Heading>
      <Heading level={3}>Subsection, 24px</Heading>
      <Heading level={4}>Card title, 17px</Heading>
    </div>
  ),
};

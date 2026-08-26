import type { Meta, StoryObj } from '@storybook/react';
import { Thumbnail } from './Thumbnail';

const meta = {
  title: 'Content/Thumbnail',
  component: Thumbnail,
  parameters: {
    docs: {
      description: {
        component:
          'A preview of an attached document or photo, opening into a Lightbox. Alt text comes from the upload record, never generated — "harbor-aug22.pdf" tells the operator which scan this is.',
      },
    },
  },
  args: { alt: 'Harbor invoice scan, Aug 22', kind: 'PDF', pages: 3, onClick: () => {} },
} satisfies Meta<typeof Thumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Document: Story = {};
export const SinglePage: Story = { args: { pages: 1 } };
export const Photo: Story = { args: { kind: 'JPG', pages: undefined, alt: 'Delivery photo, Tuesday' } };
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <Thumbnail alt="scan" kind="PDF" size="sm" />
      <Thumbnail alt="scan" kind="PDF" size="md" />
      <Thumbnail alt="scan" kind="PDF" size="lg" />
    </div>
  ),
};

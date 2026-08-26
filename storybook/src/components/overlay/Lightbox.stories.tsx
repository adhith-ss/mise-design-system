import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Lightbox } from './Lightbox';

const items = [
  { alt: 'invoice scan, page 1' },
  { alt: 'invoice scan, page 2' },
  { alt: 'invoice scan, page 3' },
];

const meta = {
  title: 'Overlay/Lightbox',
  component: Lightbox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Full-size view of an invoice scan or delivery photo, with zoom and paging through the set attached to one record. Arrows page, Escape closes and returns focus to the thumbnail that opened it. Every image carries alt text from the upload record.',
      },
    },
  },
  args: { open: true, items, index: 0, name: 'harbor-aug22.pdf', record: 'INV-20841', onOpenChange: () => {}, onIndexChange: () => {} },
  render: (args) => {
    const [index, setIndex] = useState(args.index);
    return <div className="w-[560px]"><Lightbox {...args} index={index} onIndexChange={setIndex} /></div>;
  },
} satisfies Meta<typeof Lightbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SinglePage: Story = { args: { items: [items[0]], thumbnails: false } };
export const NoDownload: Story = { args: { download: false } };

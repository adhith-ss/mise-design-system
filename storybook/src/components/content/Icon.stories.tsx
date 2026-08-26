import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const Check = () => <polyline points="4 12 9 17 20 6" />;
const Alert = () => (
  <>
    <path d="M12 4 2.5 20h19L12 4Z" />
    <line x1="12" y1="10" x2="12" y2="14" />
    <circle cx="12" cy="17" r="0.6" fill="currentColor" />
  </>
);

const meta = {
  title: 'Content/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component:
          'A wrapper that fixes size, stroke, and accessibility for any 24-grid SVG path: 1.5px stroke, round caps, 14 / 16 / 20px. Decorative icons are aria-hidden; meaningful ones take a label. An icon is never the only carrier of meaning.',
      },
    },
  },
  args: { children: <Check /> },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Decorative: Story = {};
export const Labelled: Story = { args: { label: 'Matched' } };
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Icon size="sm"><Check /></Icon>
      <Icon size="md"><Check /></Icon>
      <Icon size="lg"><Check /></Icon>
    </div>
  ),
};
export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Icon tone="current"><Check /></Icon>
      <Icon tone="quiet"><Check /></Icon>
      <Icon tone="brand"><Check /></Icon>
      <Icon tone="danger" label="Problem"><Alert /></Icon>
    </div>
  ),
};

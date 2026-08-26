import type { Meta, StoryObj } from '@storybook/react';
import { Check, TriangleAlert, ChevronDown, Search, Settings, Sparkles } from 'lucide-react';
import { Icon } from './Icon';

const meta = {
  title: 'Content/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component:
          'A wrapper that fixes size, stroke and accessibility for any Lucide icon: 14 / 16 / 20px at stroke-width 1.5. Lucide ships at 2 — this is the only place that override lives. Decorative icons are aria-hidden; meaningful ones take a label that names the meaning, not the picture. An icon is never the only carrier of meaning.',
      },
    },
  },
  args: { icon: Check },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Decorative: Story = {};
export const Labelled: Story = { args: { icon: TriangleAlert, label: 'Needs review' } };

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Icon icon={Search} size="sm" />
      <Icon icon={Search} size="md" />
      <Icon icon={Search} size="lg" />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Icon icon={TriangleAlert} tone="current" />
      <Icon icon={TriangleAlert} tone="quiet" />
      <Icon icon={TriangleAlert} tone="brand" />
      <Icon icon={TriangleAlert} tone="danger" label="Over budget" />
    </div>
  ),
};

/** The glyphs this system reaches for most. Names are Lucide's own. */
export const InUse: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={ChevronDown} />
      <Icon icon={Check} />
      <Icon icon={Search} />
      <Icon icon={Sparkles} />
      <Icon icon={Settings} />
      <Icon icon={TriangleAlert} />
    </div>
  ),
};

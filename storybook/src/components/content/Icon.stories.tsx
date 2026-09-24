import type { Meta, StoryObj } from '@storybook/react';
import { Check, TriangleAlert, ChevronDown, Search, Settings, Sparkles } from '@mise/icons/basil';
import { Icon } from './Icon';

const meta = {
  title: 'Post-MVP/Content/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component:
          'Basil icons use the original 24-unit geometry at 14 / 16 / 20px. Preserve the supplied paths rather than changing stroke weight. Decorative icons are aria-hidden; meaningful icons need an accessible label. Use the approved Plato thumbnail for the assistant, not a generic sparkle.',
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

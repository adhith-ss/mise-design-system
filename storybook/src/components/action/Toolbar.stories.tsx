import type { Meta, StoryObj } from '@storybook/react';
import { Toolbar, ToolbarDivider } from './Toolbar';
import { IconButton } from './IconButton';
import { Button } from './Button';
import { MoreMenu } from './MoreMenu';

const Glyph = () => <span aria-hidden="true" className="h-[14px] w-[14px] rounded-sm bg-current" />;

const meta = {
  title: 'Action/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A horizontal band of controls acting on the content below it. Groups are separated by dividers; overflow collapses into a More Menu. Dividers are decorative and hidden from the accessibility tree.',
      },
    },
  },
  args: { label: 'Invoice actions' },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button variant="ghost" size="sm" icon={<Glyph />}>Match lines</Button>
      <ToolbarDivider />
      <IconButton size="sm" aria-label="Filter rows" tooltip="Filter rows" icon={<Glyph />} />
      <IconButton size="sm" aria-label="Group rows" tooltip="Group rows" icon={<Glyph />} />
      <ToolbarDivider />
      <MoreMenu subject="this view" items={[{ label: 'Export CSV' }, { label: 'Print' }]} />
    </Toolbar>
  ),
};

export const Compact: Story = {
  args: { density: 'compact' },
  render: (args) => (
    <Toolbar {...args}>
      <IconButton size="sm" aria-label="Filter rows" tooltip="Filter rows" icon={<Glyph />} />
      <IconButton size="sm" aria-label="Group rows" tooltip="Group rows" icon={<Glyph />} />
      <ToolbarDivider />
      <IconButton size="sm" aria-label="Download" tooltip="Download" icon={<Glyph />} />
    </Toolbar>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <Toolbar {...args}>
      <IconButton size="sm" aria-label="Zoom in" tooltip="Zoom in" icon={<Glyph />} />
      <IconButton size="sm" aria-label="Zoom out" tooltip="Zoom out" icon={<Glyph />} />
      <ToolbarDivider orientation="vertical" />
      <IconButton size="sm" aria-label="Rotate" tooltip="Rotate" icon={<Glyph />} />
    </Toolbar>
  ),
};

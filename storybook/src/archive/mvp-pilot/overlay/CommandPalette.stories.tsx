import type { Meta, StoryObj } from '@storybook/react';
import { CommandPalette } from './CommandPalette';

const items = [
  { label: 'Harbor Produce Co.', meta: 'vendor', group: 'Records' },
  { label: 'INV-20841 · Harbor Produce', meta: 'invoice · 2 variances', group: 'Records' },
  { label: 'PO-4471 · Harbor Produce', meta: 'order · draft', group: 'Records' },
  { label: 'New order for Harbor Produce', meta: '⏎', group: 'Actions' },
  { label: 'Close August period', group: 'Actions' },
];

const meta = {
  title: 'MVP/Overlay/Command Palette',
  tags: ['archived','mvp-pilot'],
  component: CommandPalette,
  parameters: {
    docsBanner: 'Archived · MVP (0.1.0). Reference only. Use Post-MVP components.',
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Archived · MVP (0.1.0). Reference only. Use Post-MVP components. Keyboard-first search across records and actions. For an experienced operator this is the fastest route to any invoice, vendor, or task. A combobox inside a modal dialog: aria-activedescendant tracks the highlighted row, and every action in it also exists in the interface.',
      },
    },
  },
  args: { open: true, items, onOpenChange: () => {} },
  render: (args) => <div className="h-[520px] bg-canvas"><CommandPalette {...args} /></div>,
} satisfies Meta<typeof CommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};
export const RecordsOnly: Story = { args: { items: items.filter((i) => i.group === 'Records') } };
export const Empty: Story = { args: { items: [] } };

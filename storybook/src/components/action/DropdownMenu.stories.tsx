import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu';
import { Button } from './Button';

const meta = {
  title: 'Action/Dropdown Menu',
  component: DropdownMenu,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A button that opens a list of actions. Items act immediately; destructive items sit last, below a divider. The trigger carries aria-expanded, and Escape or an outside click closes it.',
      },
    },
  },
  args: {
    defaultOpen: true,
    trigger: <Button variant="neutral" trailingIcon={<span aria-hidden="true">▾</span>}>Order actions</Button>,
    items: [
      { label: 'Duplicate order', shortcut: '⌘D' },
      { label: 'Edit items', shortcut: '⌘E' },
      { label: 'Download PDF' },
      { label: 'Cancel order', destructive: true, group: 'danger' },
    ],
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};
export const Closed: Story = { args: { defaultOpen: false } };
export const Grouped: Story = {
  args: {
    items: [
      { label: 'Send now', group: 'Send' },
      { label: 'Schedule for 6:00 AM', group: 'Send' },
      { label: 'Save as draft', group: 'Save' },
      { label: 'Cancel order', destructive: true, group: 'danger' },
    ],
  },
};
export const WithDisabled: Story = {
  args: {
    items: [
      { label: 'Edit items' },
      { label: 'Send to vendor', disabled: true },
      { label: 'Cancel order', destructive: true, group: 'danger' },
    ],
  },
};
export const AlignedEnd: Story = { args: { placement: 'bottom-end' } };

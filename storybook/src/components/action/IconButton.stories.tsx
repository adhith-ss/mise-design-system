import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

const Glyph = () => <span aria-hidden="true" className="h-[14px] w-[14px] rounded-sm bg-current" />;

const meta = {
  title: 'Action/Icon Button',
  component: IconButton,
  parameters: {
    docs: {
      description: {
        component:
          'A square button carrying only an icon. Every instance needs an accessible label and a tooltip — an unlabelled icon is a guess. Ghost inside toolbars and rows; outline when it stands alone.',
      },
    },
  },
  args: { 'aria-label': 'Filter rows', tooltip: 'Filter rows', icon: <Glyph /> },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ghost: Story = {};
export const Outline: Story = { args: { variant: 'outline' } };
export const Solid: Story = { args: { variant: 'solid' } };
export const Danger: Story = { args: { variant: 'danger', 'aria-label': 'Delete line', tooltip: 'Delete line' } };
export const Selected: Story = { args: { selected: true, variant: 'outline' } };
export const Loading: Story = { args: { loading: true, variant: 'outline' } };
export const Disabled: Story = { args: { disabled: true, variant: 'outline' } };
export const Small: Story = { args: { size: 'sm', variant: 'outline' } };

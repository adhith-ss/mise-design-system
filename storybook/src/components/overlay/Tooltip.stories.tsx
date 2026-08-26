import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { IconButton } from '../action/IconButton';

const Glyph = () => <span aria-hidden="true" className="h-[14px] w-[14px] rounded-sm bg-current" />;

const meta = {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '300ms open delay, no close delay, one tooltip at a time. Appears on hover and on keyboard focus. Maximum two lines; if it needs more, the interface needs a hint under the field. Never holds a control.',
      },
    },
  },
  args: { content: 'Filter rows', delay: 0 },
  render: (args) => (
    <div className="p-12">
      <Tooltip {...args}>
        <IconButton variant="outline" aria-label="Filter rows" icon={<Glyph />} />
      </Tooltip>
    </div>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {};
export const Bottom: Story = { args: { placement: 'bottom' } };
export const Right: Story = { args: { placement: 'right' } };
export const TwoLines: Story = {
  args: { content: 'Only rows where the invoiced count differs from what was received', maxWidth: 200 },
};
export const Disabled: Story = { args: { disabled: true } };

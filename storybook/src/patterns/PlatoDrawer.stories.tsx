import type { Meta, StoryObj } from '@storybook/react';
import { PlatoDrawer } from './PlatoDrawer';
import { patternViewports } from './_shared';

const meta = {
  title: 'Post-MVP/Patterns/PlatoDrawer',
  component: PlatoDrawer,
  parameters: {
    layout: 'padded',
    ...patternViewports,
    docs: {
      description: {
        component:
          'Plato companion drawer. Welcome animates once per session, then docks to the thumbnail. Page-context chip, task chips, motion pause toggle, and reduced-motion respect. Celebration only after a confirmed save.',
      },
    },
  },
  args: {
    pageLabel: 'Overview',
    showWelcome: true,
    motionEnabled: true,
    state: 'default',
  },
  render: (args) => (
    <div className="flex justify-end">
      <PlatoDrawer {...args} />
    </div>
  ),
} satisfies Meta<typeof PlatoDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ThumbnailOnly: Story = {
  args: { showWelcome: false, state: 'empty' },
};
export const Empty: Story = { args: { showWelcome: false, state: 'empty', tasks: [] } };
export const Error: Story = { args: { showWelcome: false, state: 'error' } };
export const Disabled: Story = { args: { state: 'disabled', disabled: true, showWelcome: false } };
export const Success: Story = {
  args: { showWelcome: false, state: 'success', chatState: 'success' },
};
export const MotionPaused: Story = {
  args: { showWelcome: false, motionEnabled: false },
};

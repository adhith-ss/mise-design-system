import type { Meta, StoryObj } from '@storybook/react';
import { WeeklySnapshot } from './WeeklySnapshot';
import { patternViewports } from './_shared';

const meta = {
  title: 'Post-MVP/Patterns/WeeklySnapshot',
  component: WeeklySnapshot,
  parameters: {
    layout: 'padded',
    ...patternViewports,
    docs: {
      description: {
        component:
          'Weekly review checklist and optional snapshot save. Live-region confirmation and celebration appear only after a confirmed save. Open plans stay open.',
      },
    },
  },
  args: { state: 'default', openPlans: 2 },
} satisfies Meta<typeof WeeklySnapshot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { state: 'empty' } };
export const Disabled: Story = { args: { state: 'disabled', disabled: true } };
export const Success: Story = { args: { state: 'success' } };

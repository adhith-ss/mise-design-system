import type { Meta, StoryObj } from '@storybook/react';
import { SessionHistory } from './SessionHistory';
import { patternViewports } from './_shared';

const meta = {
  title: 'Patterns/SessionHistory',
  component: SessionHistory,
  parameters: {
    layout: 'padded',
    ...patternViewports,
    docs: {
      description: {
        component:
          'Session activity list for decisions, scenarios, imports and weekly snapshots. Always labelled “This session” — no persistence claim.',
      },
    },
  },
  args: { state: 'default' },
} satisfies Meta<typeof SessionHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { state: 'empty' } };
export const Error: Story = { args: { state: 'error' } };
export const Disabled: Story = { args: { state: 'disabled', disabled: true } };
export const Success: Story = { args: { state: 'success' } };

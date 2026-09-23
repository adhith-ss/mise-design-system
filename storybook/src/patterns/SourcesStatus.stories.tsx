import type { Meta, StoryObj } from '@storybook/react';
import { SourcesStatus } from './SourcesStatus';
import { patternViewports } from './_shared';

const meta = {
  title: 'Patterns/SourcesStatus',
  component: SourcesStatus,
  parameters: {
    layout: 'padded',
    ...patternViewports,
    docs: {
      description: {
        component:
          'Disconnected-sources banner with the exact APP wording. Lists POS, invoices, recipes and market data freshness.',
      },
    },
  },
  args: { state: 'default' },
} satisfies Meta<typeof SourcesStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { state: 'empty' } };
export const Error: Story = { args: { state: 'error' } };
export const Disabled: Story = { args: { state: 'disabled', disabled: true } };
export const Success: Story = { args: { state: 'success' } };

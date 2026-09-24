import type { Meta, StoryObj } from '@storybook/react';
import { ImportWizard } from './ImportWizard';
import { patternViewports } from './_shared';

const meta = {
  title: 'Post-MVP/Patterns/ImportWizard',
  component: ImportWizard,
  parameters: {
    layout: 'padded',
    ...patternViewports,
    docs: {
      description: {
        component:
          'CSV import wizard: choose file, map columns, check rows. Staging is session-only and not applied to live or operational baseline data.',
      },
    },
  },
  args: { state: 'default', source: 'POS sales' },
} satisfies Meta<typeof ImportWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { state: 'empty' } };
export const Error: Story = { args: { state: 'error' } };
export const Disabled: Story = { args: { state: 'disabled', disabled: true } };
export const Success: Story = { args: { state: 'success' } };

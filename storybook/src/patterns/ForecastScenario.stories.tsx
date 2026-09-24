import type { Meta, StoryObj } from '@storybook/react';
import { ForecastScenario } from './ForecastScenario';
import { patternViewports } from './_shared';

const meta = {
  title: 'Post-MVP/Patterns/ForecastScenario',
  component: ForecastScenario,
  parameters: {
    layout: 'padded',
    ...patternViewports,
    docs: {
      description: {
        component:
          'What-if scenario builder with presets, simulate, reset to baseline, and a save dialog that requires a reason. Model assumptions stay disclosed. Copy states this is a simulation, not a prediction.',
      },
    },
  },
  args: { state: 'default', target: 75 },
} satisfies Meta<typeof ForecastScenario>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { state: 'empty' } };
export const Error: Story = { args: { state: 'error' } };
export const Disabled: Story = { args: { state: 'disabled', disabled: true } };
export const Success: Story = { args: { state: 'success' } };

import type { Meta, StoryObj } from '@storybook/react';
import { DishDetailSheet } from './DishDetailSheet';
import { patternViewports } from './_shared';

const meta = {
  title: 'Patterns/DishDetailSheet',
  component: DishDetailSheet,
  parameters: {
    layout: 'padded',
    ...patternViewports,
    docs: {
      description: {
        component:
          'Dish metrics sheet with performance summary, scenario test, and sources notice. Nothing is saved from the scenario tab.',
      },
    },
  },
  args: { state: 'default', dishName: 'Ahi Poke Bowl', margin: 73.5 },
} satisfies Meta<typeof DishDetailSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Healthy: Story = { args: { margin: 78.2, state: 'success' } };
export const Empty: Story = { args: { state: 'empty' } };
export const Error: Story = { args: { state: 'error' } };
export const Disabled: Story = { args: { state: 'disabled', disabled: true } };

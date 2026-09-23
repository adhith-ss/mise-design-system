import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from './MetricCard';
import { patternViewports } from './_shared';

const meta = {
  title: 'Patterns/MetricCard',
  component: MetricCard,
  parameters: {
    layout: 'padded',
    ...patternViewports,
    docs: {
      description: {
        component:
          'KPI tile with tabular numerals, optional delta, and a freshness timestamp. Used on Overview and Weekly review.',
      },
    },
  },
  args: {
    label: 'Menu margin',
    value: '76.2',
    unit: '%',
    delta: '1.4 pts',
    foot: 'Above your 75% target',
  },
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Contribution: Story = {
  args: {
    label: 'Weekly contribution',
    value: '$19,516',
    unit: undefined,
    delta: '+$674',
    foot: 'Revenue less ingredient costs',
  },
};
export const AtRisk: Story = {
  args: {
    label: 'Dishes at risk',
    value: '3',
    unit: undefined,
    delta: undefined,
    foot: 'Below your margin target',
    atRisk: true,
  },
};
export const Empty: Story = { args: { state: 'empty' } };
export const Error: Story = { args: { state: 'error', foot: 'Source data needs an update' } };
export const Disabled: Story = { args: { state: 'disabled' } };
export const Success: Story = { args: { state: 'success' } };

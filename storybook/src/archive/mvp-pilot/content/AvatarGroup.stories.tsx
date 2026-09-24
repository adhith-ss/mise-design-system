import type { Meta, StoryObj } from '@storybook/react';
import { AvatarGroup } from './AvatarGroup';

const people = [
  { name: 'Dana Reyes' }, { name: 'Marc Oyelaran' }, { name: 'Priya Shah' },
  { name: 'Tom Beck' }, { name: 'Ana Ruiz' }, { name: 'Sam Cole' },
];

const meta = {
  title: 'MVP/Content/Avatar Group',
  tags: ['archived','mvp-pilot'],
  component: AvatarGroup,
  parameters: {
    docsBanner: 'Archived · MVP (0.1.0). Reference only. Use Post-MVP components.',
    docs: {
      description: {
        component:
          'Archived · MVP (0.1.0). Reference only. Use Post-MVP components. Several people on one record — who approved, who is on shift. The whole group carries one accessible name listing everyone, so a screen-reader user is not read six separate images.',
      },
    },
  },
  args: { people, label: 'On shift' },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllVisible: Story = { args: { people: people.slice(0, 3) } };
export const TwoMax: Story = { args: { max: 2 } };
export const Small: Story = { args: { size: 'sm' } };

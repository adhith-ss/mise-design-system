import type { Meta, StoryObj } from '@storybook/react';
import { AvatarGroup } from './AvatarGroup';

const people = [
  { name: 'Dana Reyes' }, { name: 'Marc Oyelaran' }, { name: 'Priya Shah' },
  { name: 'Tom Beck' }, { name: 'Ana Ruiz' }, { name: 'Sam Cole' },
];

const meta = {
  title: 'Content/Avatar Group',
  component: AvatarGroup,
  parameters: {
    docs: {
      description: {
        component:
          'Several people on one record — who approved, who is on shift. The whole group carries one accessible name listing everyone, so a screen-reader user is not read six separate images.',
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

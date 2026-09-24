import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'MVP Pilot/Content/Avatar',
  tags: ['archived','mvp-pilot'],
  component: Avatar,
  parameters: {
    docsBanner: 'Archived · MVP Pilot (0.1.0). Reference only. Use 0.2.0 components.',
    docs: {
      description: {
        component:
          'Archived · MVP Pilot (0.1.0). Reference only. Use 0.2.0 components. A person or an organisation. Round for people, square for vendors — the shape is the type, so a vendor logo is never mistaken for a colleague. Initials fall back from the name, and the name is always the accessible label.',
      },
    },
  },
  args: { name: 'Dana Reyes' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Person: Story = {};
export const Vendor: Story = { args: { name: 'Harbor Produce', shape: 'square' } };
export const WithStatus: Story = { args: { status: 'online' } };
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Dana Reyes" size="sm" />
      <Avatar name="Dana Reyes" size="md" />
      <Avatar name="Dana Reyes" size="lg" />
    </div>
  ),
};

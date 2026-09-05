import type { Meta, StoryObj } from '@storybook/react';
import { AgentAvatar } from './AgentAvatar';

const meta = {
  title: 'Chat & Agent/Agent Avatar',
  component: AgentAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "Plato, the agent's character, standing in for the agent the way Avatar stands in for a person — 8 idle emotions, each animated on its own loop. Every emotion shares the exact same base geometry; only the animation differs. Reduced motion freezes each one at its own characteristic pose rather than the shared neutral rest-frame every emotion starts from, so the 8 stay visually distinct even with motion off.",
      },
    },
  },
  args: { emotion: 'happy', size: 'lg' },
} satisfies Meta<typeof AgentAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Happy: Story = { args: { emotion: 'happy' } };
export const Sad: Story = { args: { emotion: 'sad' } };
export const Angry: Story = { args: { emotion: 'angry' } };
export const Confused: Story = { args: { emotion: 'confused' } };
export const Surprised: Story = { args: { emotion: 'surprised' } };
export const Sleepy: Story = { args: { emotion: 'sleepy' } };
export const Wink: Story = { args: { emotion: 'wink' } };
export const Excited: Story = { args: { emotion: 'excited' } };

export const AllEmotions: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-6">
      {(['happy', 'sad', 'angry', 'confused', 'surprised', 'sleepy', 'wink', 'excited'] as const).map((e) => (
        <div key={e} className="flex flex-col items-center gap-2">
          <AgentAvatar emotion={e} size="lg" />
          <span className="text-[12px] capitalize text-ink-500">{e}</span>
        </div>
      ))}
    </div>
  ),
  parameters: { docs: { description: { story: 'All 8 side by side, at the size they read best at.' } } },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <AgentAvatar emotion="happy" size="sm" />
      <AgentAvatar emotion="happy" size="md" />
      <AgentAvatar emotion="happy" size="lg" />
    </div>
  ),
  parameters: { docs: { description: { story: '24 / 30 / 40px — the same three steps as Avatar.' } } },
};

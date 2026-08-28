import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SplashWake } from './SplashWake';
import { Button } from '../action/Button';

const meta = {
  title: 'Future Scope/Splash — Wake (Mobile)',
  component: SplashWake,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "**Future scope — not a shipping product surface.** The wake-up moment for opening the agent on a mobile version of the application, which doesn't exist yet. Two resting dashes rotate into Plato's eyes, then the wordmark fades in with a streak sweep. Kept here, clearly separated from the shipping component categories, so the direction is documented without implying it ships today.",
      },
    },
  },
  render: () => {
    const [gen, setGen] = useState(0);
    return (
      <div className="flex flex-col items-center gap-4">
        <SplashWake key={gen} autoplay />
        <Button variant="secondary" size="sm" onClick={() => setGen((g) => g + 1)}>Replay</Button>
      </div>
    );
  },
} satisfies Meta<typeof SplashWake>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

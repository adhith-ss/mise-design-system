import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Composer } from './Composer';

const meta = {
  title: 'MVP Pilot/Chat & Agent/Composer',
  tags: ['archived','mvp-pilot'],
  component: Composer,
  parameters: {
    docsBanner: 'Archived · MVP Pilot (0.1.0). Reference only. Use 0.2.0 components.',
    layout: 'padded',
    backgrounds: { default: 'sunken' },
    docs: {
      description: {
        component:
          'Archived · MVP Pilot (0.1.0). Reference only. Use 0.2.0 components. Where the operator writes. It grows to six lines, accepts invoice photos, and shows the scope the agent is working in so an instruction is never applied to the wrong location. Enter sends, Shift+Enter breaks the line, Escape returns focus to the transcript.',
      },
    },
  },
  args: { value: '', onChange: () => {}, scope: 'Downtown kitchen' },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <Composer {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof Composer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const Typed: Story = { args: { value: 'Chase Harbor for the two short deliveries' } };
export const PendingApproval: Story = { args: { pendingApproval: true } };
export const Disabled: Story = { args: { disabled: true, placeholder: 'The agent is stopped' } };
export const NoScope: Story = { args: { scope: undefined } };

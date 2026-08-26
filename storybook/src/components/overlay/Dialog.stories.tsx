import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';
import { Button } from '../action/Button';
import { Field } from '../data-input/Field';
import { NumberInput } from '../data-input/NumberInput';

const meta = {
  title: 'Overlay/Dialog',
  component: Dialog,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A focused task that must finish or be abandoned — editing an order line, drafting a credit request. Anything longer than a screenful belongs on a page. Focus moves to the first control on open and returns to the trigger on close.',
      },
    },
  },
  args: {
    open: true,
    title: 'Edit line · Romaine, 24 ct',
    description: 'PO-4471 · Harbor Produce',
    onOpenChange: () => {},
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);
    const [cases, setCases] = useState(10);
    return (
      <div className="h-[560px] bg-canvas p-8">
        <Button variant="secondary" onClick={() => setOpen(true)}>Edit line</Button>
        <Dialog {...args} open={open} onOpenChange={setOpen}
          footer={
            <>
              <Button variant="neutral" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={() => setOpen(false)}>Save line</Button>
            </>
          }
        >
          <div className="flex flex-col gap-[14px]">
            <Field label="Cases">
              <NumberInput value={cases} onChange={setCases} unit="cs" max={99} />
            </Field>
            <div className="flex justify-between pt-[2px]">
              <span className="text-[13px] text-ink-700">Line total</span>
              <span className="font-data text-[13px]">${(cases * 23).toFixed(2)}</span>
            </div>
          </div>
        </Dialog>
      </div>
    );
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
export const NotDismissible: Story = {
  args: { dismissible: false },
  parameters: { docs: { description: { story: 'While a save is in flight: no close button, no Escape, no backdrop dismissal.' } } },
};
export const UnsavedEdits: Story = {
  args: { closeOnBackdrop: false },
  parameters: { docs: { description: { story: 'A dialog holding unsaved edits never closes on a stray backdrop click.' } } },
};

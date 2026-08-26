import type { Meta, StoryObj } from '@storybook/react';
import { FileInput } from './FileInput';
import { Field } from './Field';

const meta = {
  title: 'Data Input/File Input',
  component: FileInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An invoice scan or a delivery photo, dropped or picked. Every uploaded file stays listed with its state, so a failed upload is visible rather than silently missing when the operator moves on.',
      },
    },
  },
  args: {
    files: [],
    accept: 'image/*,.pdf',
    constraint: 'PDF or photo, up to 10 MB',
  },
  render: (args) => (
    <div className="w-[440px]">
      <Field label="Invoice scan" hint="The agent reads line items straight off the scan.">
        <FileInput {...args} />
      </Field>
    </div>
  ),
} satisfies Meta<typeof FileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const WithFiles: Story = {
  args: {
    files: [
      { name: 'harbor-aug22.pdf', size: '1.2 MB', status: 'done' },
      { name: 'harbor-aug24.pdf', size: '0.9 MB', status: 'uploading' },
    ],
  },
};
export const UploadFailed: Story = {
  args: {
    files: [{ name: 'delivery-photo.heic', size: '4.1 MB', status: 'error', error: 'HEIC is not supported — save as JPEG or PDF.' }],
  },
};
export const Disabled: Story = { args: { disabled: true } };

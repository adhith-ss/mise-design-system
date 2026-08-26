import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Moves through a list too long for one screen. The record count is the useful part — an operator checking a period wants to know there are 34 invoices, not that there are two pages. Numbered page buttons are deliberately absent: nobody navigates invoices by page number.',
      },
    },
  },
  args: { page: 1, pageCount: 2, total: 34, unit: 'invoice', pageSize: 25, onPageChange: () => {} },
  render: (args) => {
    const [page, setPage] = useState(args.page);
    const [size, setSize] = useState(args.pageSize);
    return (
      <div className="w-[620px]">
        <Pagination {...args} page={page} onPageChange={setPage} pageSize={size} onPageSizeChange={setSize} />
      </div>
    );
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const LastPage: Story = { args: { page: 2 } };
export const SinglePage: Story = { args: { pageCount: 1, total: 8 } };
export const WithoutPageSize: Story = { args: { pageSize: undefined, onPageSizeChange: undefined } };

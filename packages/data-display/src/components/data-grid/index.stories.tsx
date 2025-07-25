import type { Meta, StoryObj } from '@storybook/react';
import type { DataGridProps } from '../../types';

import DataGrid from '.';
import React from 'react';
import { useDemoData } from '@mui/x-data-grid-generator';

function DataGridComponent(props: DataGridProps) {
  const { data } = useDemoData({
    dataSet: 'Employee',
    rowLength: 50,
    visibleFields: ['id', 'name', 'email', 'country', 'dateCreated', 'rating', 'isAdmin'],
  });

  const nonEditableColumnsData = {
    ...data,
    columns: data.columns.map((column) => ({ ...column, editable: false })),
  };

  return (
    <DataGrid
      {...nonEditableColumnsData}
      initialState={{
        ...data.initialState,
        pagination: { ...data.initialState?.pagination, paginationModel: { pageSize: 25 } },
      }}
      {...props}
    />
  );
}

const meta: Meta<typeof DataGrid> = {
  title: 'Data Display/Data Grid',
  component: DataGrid,
  decorators: [
    (Story) => (
      <div style={{ height: 400, width: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  render: (props) => <DataGridComponent {...props} />,
};

type Story = StoryObj<typeof DataGrid>;

const Default: Story = {
  args: {
    hideFooter: true,
  },
};

const WithHeaderFilters: Story = {
  args: {
    enableHeaderFilters: true,
    hideFooter: true,
  },
};

const WithOffsetPagination: Story = {
  args: {
    pagination: true,
    paginationType: 'offset',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Offset based pagination can be used with `paginationMode="server"` and `paginationMode="client"`. The consumer is responsible for implementing the pagination logic when `paginationMode="server"`. More information can be found [here](https://mui.com/x/react-data-grid/pagination/#basic-implementation).',
      },
    },
  },
};

const WithCursorPagination: Story = {
  args: {
    pagination: true,
    paginationType: 'cursor',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Cursor based pagination is to be used with `paginationMode="server"`. The consumer is responsible for implementing the pagination logic. More information can be found [here](https://mui.com/components/data-grid/pagination/#cursor-based-pagination).',
      },
    },
  },
};

const NoRows: Story = {
  args: {
    rows: [],
    hideFooter: true,
  },
};

export { Default, WithHeaderFilters, WithOffsetPagination, WithCursorPagination, NoRows };

export default meta;

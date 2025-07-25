import type { GridColDef } from '@mui/x-data-grid-pro';

import { render, screen, within } from '@testing-library/react';
import DataGrid from '.';
import React from 'react';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    type: 'number',
  },
  {
    field: 'userName',
    headerName: 'User name',
  },
  {
    field: 'createdAt',
    headerName: 'Created at',
    type: 'string',
  },
  {
    field: 'isAdmin',
    headerName: 'Is Admin?',
    type: 'boolean',
  },
  {
    field: 'country',
    headerName: 'Country',
    type: 'singleSelect',
  },
];

const createdAtDateString = '1/9/2024';
const rows = [
  {
    id: '1',
    userName: 'John Doe',
    createdAt: createdAtDateString,
    isAdmin: true,
    country: 'USA',
  },
];

describe('<DataGrid />', () => {
  it('should render table with header and row', () => {
    render(<DataGrid columns={columns} rows={rows} />);

    const [idColumn, userName, createdAtColumn, isAdminColumn, countryColum] = columns;
    const [firstRow] = rows;

    // Expecting columnheader to be just 1 element because if it were to be 2, it would mean that the header contains a filter
    expect(screen.getAllByRole('columnheader', { name: idColumn.headerName })).toHaveLength(1);
    expect(screen.getAllByRole('columnheader', { name: userName.headerName })).toHaveLength(1);
    expect(screen.getAllByRole('columnheader', { name: createdAtColumn.headerName })).toHaveLength(
      1
    );
    expect(screen.getAllByRole('columnheader', { name: isAdminColumn.headerName })).toHaveLength(1);
    expect(screen.getAllByRole('columnheader', { name: countryColum.headerName })).toHaveLength(1);

    expect(screen.getByRole('gridcell', { name: firstRow.id })).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: firstRow.userName })).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: createdAtDateString })).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: 'yes' })).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: firstRow.country })).toBeInTheDocument();
  });

  it('should render table with header filters', () => {
    render(<DataGrid columns={columns} enableHeaderFilters rows={rows} />);

    const [idColumn, userName, createdAtColumn, isAdminColumn, countryColum] = columns;

    // Number type filter
    const [, idFilterHeader] = screen.getAllByRole('columnheader', { name: idColumn.headerName });
    const idNumberFilter = within(idFilterHeader).getByRole('spinbutton');

    // String type filter
    const [, userNameFilterHeader] = screen.getAllByRole('columnheader', {
      name: userName.headerName,
    });
    const userNameTextFilter = within(userNameFilterHeader).getByRole('textbox');

    // Date type filter
    const [, createdAtFilterHeader] = screen.getAllByRole('columnheader', {
      name: createdAtColumn.headerName,
    });
    const createdAtDateFilter = within(createdAtFilterHeader).getByPlaceholderText('');

    // Boolean type filter
    const [, isAdminFilterHeader] = screen.getAllByRole('columnheader', {
      name: isAdminColumn.headerName,
    });
    const isAdminSelectFilter = within(isAdminFilterHeader).getByRole('combobox');

    // Single select type filter
    const [, countryFilterHeader] = screen.getAllByRole('columnheader', {
      name: countryColum.headerName,
    });
    const countrySelectFilter = within(countryFilterHeader).getByRole('combobox');

    expect(idNumberFilter).toBeInTheDocument();
    expect(userNameTextFilter).toBeInTheDocument();
    expect(createdAtDateFilter).toBeInTheDocument();
    expect(isAdminSelectFilter).toBeInTheDocument();
    expect(countrySelectFilter).toBeInTheDocument();
  });

  it('should render table with offset pagination', () => {
    render(<DataGrid columns={columns} pagination paginationType="offset" rows={rows} />);

    expect(screen.getByRole('combobox', { name: 'Rows per page:' })).toBeInTheDocument();
    expect(screen.getByText('1–1 of 1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to previous page' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to next page' })).toBeInTheDocument();
  });

  it('should render table with cursor pagination', () => {
    render(
      <DataGrid
        columns={columns}
        pageSizeOptions={[100]}
        pagination
        paginationType="cursor"
        rows={rows}
      />
    );

    expect(screen.queryByRole('button', { name: 'Rows per page: 100' })).not.toBeInTheDocument();
    expect(screen.queryByText('1–1 of 1')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to previous page' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to next page' })).toBeInTheDocument();
  });

  it('should render no result overlay when there is no data', () => {
    render(<DataGrid columns={columns} rows={[]} />);

    expect(screen.getByText('No data to Display')).toBeInTheDocument();
    expect(
      screen.getByText('Try adjusting the filters or refreshing the page.')
    ).toBeInTheDocument();
  });
});

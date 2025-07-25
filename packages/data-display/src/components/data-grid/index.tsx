import type { DataGridProps } from '../../types';

import { DataGridPro } from '@mui/x-data-grid-pro';
import GridHeaderFilterCell from './components/grid-header-filter-cell';
import { LicenseInfo } from '@mui/x-license';
import { MuiXLicenseKey } from '@blueshift-ui/core/dist/constants';
import NoRowsOverlay from './components/no-rows-overlay';

LicenseInfo.setLicenseKey(MuiXLicenseKey);

const HEADER_HEIGHT = 40;

function DataGrid({
  // By default, these features are disabled due to the fact that they are not required as of now.
  // If a requirements comes through to enable them, we can remove these defaults
  disableColumnFilter = true,
  disableColumnMenu = true,
  disableColumnReorder = true,
  disableColumnResize = true,
  disableRowSelectionOnClick = true,
  enableHeaderFilters,
  getRowClassName,
  pagination,
  paginationType = 'offset',
  slotProps,
  slots,
  ...dataGridProps
}: DataGridProps) {
  return (
    <DataGridPro
      columnHeaderHeight={HEADER_HEIGHT}
      disableColumnFilter={disableColumnFilter}
      disableColumnMenu={disableColumnMenu}
      disableColumnReorder={disableColumnReorder}
      disableColumnResize={disableColumnResize}
      disableRowSelectionOnClick={disableRowSelectionOnClick}
      getRowClassName={(params) => {
        const rowClassName = getRowClassName?.(params) || '';
        const rowKind = params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd';

        return `${rowClassName} ${rowKind}`;
      }}
      getRowHeight={() => 'auto'}
      headerFilters={enableHeaderFilters}
      pageSizeOptions={paginationType === 'cursor' ? [] : [10, 25, 50, 100]}
      pagination={pagination}
      slotProps={{
        ...slotProps,
        ...(enableHeaderFilters && {
          headerFilterCell: {
            ...slotProps?.headerFilterCell,
            InputComponentProps: {
              ...slotProps?.headerFilterCell?.InputComponentProps,
              label: '', // Per design, filter inputs shouldn't have labels
            },
          },
        }),
        ...(pagination &&
          paginationType === 'cursor' && {
            pagination: {
              ...slotProps?.pagination,
              labelDisplayedRows: () => '',
            },
          }),
      }}
      slots={{
        ...slots,
        ...(enableHeaderFilters && {
          headerFilterMenu: null,
          headerFilterCell: GridHeaderFilterCell,
        }),
        noResultsOverlay: NoRowsOverlay,
        noRowsOverlay: NoRowsOverlay,
      }}
      {...dataGridProps}
    />
  );
}

export default DataGrid;

import type { DataGridProProps } from '@mui/x-data-grid-pro';

interface DataGridBaseProps
  extends Omit<DataGridProProps, 'columnHeaderHeight' | 'getRowHeight' | 'headerFilters'> {
  enableHeaderFilters?: boolean;
}

type PaginationType = 'cursor' | 'offset';
type PaginationMode = 'server' | 'client';

interface DataGridPropsWithCursorPagination extends DataGridBaseProps {
  paginationMode?: 'server';
  paginationType?: 'cursor';
}

interface DataGridPropsWithOffsetPagination extends DataGridBaseProps {
  paginationMode?: PaginationMode;
  paginationType?: Exclude<PaginationType, 'cursor'>;
}

export type DataGridProps = DataGridPropsWithCursorPagination | DataGridPropsWithOffsetPagination;

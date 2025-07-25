import type { GridHeaderFilterCellProps } from '@mui/x-data-grid-pro';

import { InputAdornment } from '@mui/material';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { GridHeaderFilterCell as MuiGridHeaderFilterCell } from '@mui/x-data-grid-pro';

function GridHeaderFilterCell(props: GridHeaderFilterCellProps) {
  const isTextField = ['string', 'number'].includes(props.colDef.type ?? '');

  const textFieldDefaultProps = {
    InputComponentProps: {
      ...props?.InputComponentProps,
      InputProps: {
        ...props?.InputComponentProps?.InputProps,
        startAdornment: (
          <InputAdornment position="start">
            <MagnifyingGlass />
          </InputAdornment>
        ),
      },
    },
  };

  const forwardedProps = {
    ...props,
    ...(isTextField ? textFieldDefaultProps : {}),
  };

  return <MuiGridHeaderFilterCell {...forwardedProps} />;
}

export default GridHeaderFilterCell;

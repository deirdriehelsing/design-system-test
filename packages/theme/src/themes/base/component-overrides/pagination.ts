import type { ComponentOverride } from '../../../types';

function paginationOverrides(): ComponentOverride<'MuiPagination'> {
  return {
    MuiPagination: {
      styleOverrides: {
        ul: {
          'li::marker': {
            content: '""',
          },
        },
      },
    },
  };
}

export default paginationOverrides;

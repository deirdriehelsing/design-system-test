import type { ComponentOverride, Tokens } from '../../../types';

function dataGridOverrides(tokens: Tokens): ComponentOverride<'MuiDataGrid'> {
  return {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          '--unstable_DataGrid-radius': '0.5rem',
          '--DataGrid-containerBackground': tokens.ref.palette.tertiary.shade90,
        },
        columnHeaders: {
          border: 0,
          background: tokens.ref.palette.tertiary.shade90,
        },
        columnHeaderTitle: {
          fontWeight: tokens.sys.typescale.headline.medium.weight,
        },
        columnHeader: {
          padding: '0 0.5rem',
        },
        headerFilterRow: {
          border: 0,

          '& .MuiTextField-root': {
            width: '100%',
          },
          '& .MuiInputBase-root': {
            background: tokens.ref.palette.primary.shade100,
            minWidth: 'unset',
            border: `1px solid ${tokens.ref.palette.primary.shade70}`,
            margin: 0,

            '&:hover': {
              '&:before': {
                border: 0,
              },
            },
            '&:before': {
              border: 0,
            },
            '&:after': {
              border: 0,
            },
            '& .MuiInputBase-input': {
              padding: 5,
              color: `${tokens.sys.color.text.primary} !important`,
            },
            '& .MuiInputAdornment-root': {
              paddingLeft: '5px',
              margin: 0,
            },
          },
        },
        row: {
          '&:hover': {
            background: tokens.ref.palette.tertiary.shade80,
          },
          '&.Mui-hovered': {
            background: tokens.ref.palette.tertiary.shade80,
          },
          '&.odd:not(:hover)': {
            background: tokens.ref.palette.tertiary.shade90,
          },
        },
        cell: {
          padding: '0.625rem 0.5rem',
          border: 0,
          '&.MuiDataGrid-booleanCell[data-value="false"]': {
            color: tokens.sys.color.text.disabled,
          },
        },
        footerContainer: {
          border: 0,

          '& .MuiTablePagination-root': {
            '& .MuiTablePagination-toolbar': {
              color: tokens.ref.palette.primary.shade00,
              backgroundColor: tokens.ref.palette.primary.shade100,
            },
            '& .MuiTablePagination-input': {
              minWidth: 'unset',
              marginRight: '1.5rem',

              '& .MuiInputBase-input': {
                paddingRight: '2.25rem !important',
              },
            },
            '& .MuiTablePagination-actions': {
              marginLeft: '1.5rem',

              '& .MuiButtonBase-root': {
                color: tokens.ref.palette.primary.shade00,
                height: '2rem',
                width: '2rem',
                margin: '0 0.5rem',

                '&:hover': {
                  backgroundColor: tokens.ref.palette.primary.shade80,
                },
                '&.Mui-disabled': {
                  opacity: 0.38,
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '1.25rem',
                },
              },
            },
          },
        },
      },
    },
  };
}

export default dataGridOverrides;

import type { ComponentOverride, Tokens } from '../../../types';

function muiDialogActions(): ComponentOverride<'MuiDialogActions'> {
  return {
    MuiDialogActions: {
      styleOverrides: {
        root: {
          justifyContent: 'flex-start',
          padding: '1rem 2rem',
        },
      },
    },
  };
}

function muiDialogContent(): ComponentOverride<'MuiDialogContent'> {
  return {
    MuiDialogContent: {
      styleOverrides: {
        root: {
          borderTop: '0 none',
          padding: '0 2rem',
          ':last-of-type': {
            paddingBottom: '2rem',
          },
          '+ .MuiDivider-root': {
            marginTop: '0.5rem',
          },
        },
      },
    },
  };
}

function muiDialogTitle(): ComponentOverride<'MuiDialogTitle'> {
  return {
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '2rem 2rem 1rem',
          '+ .MuiDivider-root': {
            marginBottom: '0.5rem',
          },
        },
      },
    },
  };
}

function dialogOverrides(tokens: Tokens) {
  return {
    ...muiDialogActions(),
    ...muiDialogContent(),
    ...muiDialogTitle(),
  };
}

export default dialogOverrides;

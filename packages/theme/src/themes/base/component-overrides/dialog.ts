import type { ComponentOverride, Tokens } from '../../../types';

function muiDialog(tokens: Tokens): ComponentOverride<'MuiDialog'> {
  return {
    MuiDialog: {
      styleOverrides: {
        root: {
          borderTop: `1px solid ${tokens.ref.palette.primary.shade90}`,
          gap: '1rem',
          '>:not(:first-of-type)': {
            marginLeft: 0,
          },
        },
      },
    },
  };
}

function muiDialogActions(tokens: Tokens): ComponentOverride<'MuiDialogActions'> {
  return {
    MuiDialogActions: {
      styleOverrides: {
        root: {
          borderTop: `1px solid ${tokens.sys.color.neutral.light}`,
          gap: '1rem',
          padding: '1rem 2rem',
          '>:not(:first-of-type)': {
            marginLeft: 0,
          },
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
          padding: '1.5rem 2rem 2rem',
        },
      },
    },
  };
}

function muiDialogTitle(tokens: Tokens): ComponentOverride<'MuiDialogTitle'> {
  return {
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          alignItems: 'center',
          display: 'flex',
          fontSize: tokens.sys.typescale.title.medium.size,
          fontWeight: tokens.sys.typescale.title.medium.weight,
          minHeight: tokens.comp.dialog.title.height.default,
          letterSpacing: tokens.sys.typescale.title.medium.tracking,
          lineHeight: tokens.sys.typescale.title.medium.lineHeight,
        },
      },
    },
  };
}

function dialogOverrides(tokens: Tokens) {
  return {
    ...muiDialog(tokens),
    ...muiDialogActions(tokens),
    ...muiDialogContent(),
    ...muiDialogTitle(tokens),
  };
}

export default dialogOverrides;

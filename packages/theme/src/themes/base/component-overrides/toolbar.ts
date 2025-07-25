import type { ComponentOverride, Tokens } from '../../../types';

function toolbarOverrides(tokens: Tokens): ComponentOverride<'MuiToolbar'> {
  return {
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.sys.color.primary.main,
          borderBottom: `1px solid ${tokens.ref.palette.secondary.shade90}`,
          color: tokens.sys.color.primary.contrastText,
          justifyContent: 'space-between',
        },
      },
    },
  };
}

export default toolbarOverrides;

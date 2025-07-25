import type { ComponentOverride, Tokens } from '../../../types';

function radioOverrides(tokens: Tokens): ComponentOverride<'MuiRadio'> {
  return {
    MuiRadio: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: tokens.sys.color.secondary.light,
          },
          '&:active': {
            backgroundColor: tokens.sys.color.neutral.light,
          },
          '&.Mui-checked': {
            color: tokens.sys.color.secondary.main,
          },
        },
      },
    },
  };
}

export default radioOverrides;

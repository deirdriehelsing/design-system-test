import type { ComponentOverride, Tokens } from '../../../types';

function inputAdornmentOverrides(tokens: Tokens): ComponentOverride<'MuiInputAdornment'> {
  return {
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: tokens.sys.color.neutral.dark,

          '.Mui-error &, .Blueshift-error &': {
            color: tokens.sys.color.error.main,
          },

          '.Mui-disabled &, .Blueshift-disabled &': {
            color: tokens.sys.color.text.disabled,
          },
        },
      },
    },
  };
}

export default inputAdornmentOverrides;

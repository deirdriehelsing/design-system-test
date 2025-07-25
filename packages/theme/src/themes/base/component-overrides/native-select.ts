import type { ComponentOverride, Tokens } from '../../../types';

function nativeSelectOverrides(tokens: Tokens): ComponentOverride<'MuiNativeSelect'> {
  return {
    MuiNativeSelect: {
      styleOverrides: {
        icon: {
          fill: tokens.ref.palette.primary.shade00,
        },
      },
    },
  };
}

export default nativeSelectOverrides;

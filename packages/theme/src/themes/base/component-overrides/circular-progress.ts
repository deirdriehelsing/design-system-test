import type { ComponentOverride, Tokens } from '../../../types';

function circularProgressOverrides(tokens: Tokens): ComponentOverride<'MuiCircularProgress'> {
  return {
    MuiCircularProgress: {
      defaultProps: {
        color: 'secondary',
      },
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          borderRadius: '50%',
          boxShadow: `inset 0 0 0 0.225rem ${tokens.sys.color.neutral.light}`,
        },
      },
    },
  };
}

export default circularProgressOverrides;

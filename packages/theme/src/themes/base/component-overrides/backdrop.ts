import type { ComponentOverride, Tokens } from '../../../types';

function backdropOverrides(tokens: Tokens): ComponentOverride<'MuiBackdrop'> {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          '&:not(.MuiBackdrop-invisible)': {
            background:
              'var(--Scrim, linear-gradient(108deg, rgba(155, 216, 205, 0.85) -12.32%, rgba(77, 118, 180, 0.85) 28.31%, rgba(74, 75, 182, 0.85) 61.75%, rgba(105, 71, 145, 0.85) 101.73%))',
          },
        },
      },
    },
  };
}

export default backdropOverrides;

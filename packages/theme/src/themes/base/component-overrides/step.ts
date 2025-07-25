import type { ComponentOverride } from '../../../types';

function stepOverrides(): ComponentOverride<'MuiStep'> {
  return {
    MuiStep: {
      styleOverrides: {
        root: {
          '.BlueshiftStepIndicator-dashed &': {
            flex: 1,
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
    },
  };
}

export default stepOverrides;

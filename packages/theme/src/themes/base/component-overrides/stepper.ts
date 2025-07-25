import type { ComponentOverride } from '../../../types';

function stepOverrides(): ComponentOverride<'MuiStepper'> {
  return {
    MuiStepper: {
      styleOverrides: {
        root: {
          '.BlueshiftStepIndicator-dashed &': {
            display: 'inline-flex',
            width: '100%',
          },
        },
      },
    },
  };
}

export default stepOverrides;

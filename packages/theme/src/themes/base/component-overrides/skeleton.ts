import type { ComponentOverride } from '../../../types';

function skeletonOverrides(): ComponentOverride<'MuiSkeleton'> {
  return {
    MuiSkeleton: {
      defaultProps: {
        variant: 'rectangular',
      },
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(28, 27, 46, 0.1)',
        },
      },
    },
  };
}

export default skeletonOverrides;

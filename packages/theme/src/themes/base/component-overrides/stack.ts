import type { ComponentOverride, Tokens } from '../../../types';

function stackOverrides(tokens: Tokens): ComponentOverride<'MuiStack'> {
  return {
    MuiStack: {
      defaultProps: {
        spacing: '1.5rem',
        sx: {
          alignItems: 'center',
        },
      },
    },
  };
}

export default stackOverrides;

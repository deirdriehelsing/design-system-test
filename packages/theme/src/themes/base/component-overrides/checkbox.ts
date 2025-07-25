import type { ComponentOverride, Tokens } from '../../../types';

function checkboxOverrides(tokens: Tokens): ComponentOverride<'MuiCheckbox'> {
  return {
    MuiCheckbox: {
      defaultProps: {
        color: 'secondary',
      },
    },
  };
}

export default checkboxOverrides;

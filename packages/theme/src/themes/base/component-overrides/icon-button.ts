import type { ComponentOverride, Tokens } from '../../../types';

function iconButtonOverrides(tokens: Tokens): ComponentOverride<'MuiIconButton'> {
  return {
    MuiIconButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          color: ownerState.color === 'default' ? tokens.sys.color.text.link : ownerState.color,
          ...(ownerState.variant === 'outlined' && {
            border: `1px solid ${tokens.sys.color.neutral.dark}`,
            backgroundColor: 'transparent',
          }),
        }),
      },
    },
  };
}

export default iconButtonOverrides;

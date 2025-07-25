import type { ComponentOverride, Tokens } from '../../../types';

function selectOverrides(tokens: Tokens): ComponentOverride<'MuiSelect'> {
  return {
    MuiSelect: {
      styleOverrides: {
        icon: {
          right: '0.75rem',
          fill: tokens.ref.palette.primary.shade00,
          '&.Mui-disabled': {
            fill: tokens.sys.color.text.disabled,
          },
        },
        select: {
          /* automatically adjust height to allow its content to be displayed correctly */
          minHeight: 'auto',
        },
      },
    },
  };
}

export default selectOverrides;

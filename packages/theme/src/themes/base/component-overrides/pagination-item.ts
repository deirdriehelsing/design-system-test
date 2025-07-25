import type { ComponentOverride, Tokens } from '../../../types';

function paginationItemOverrides(tokens: Tokens): ComponentOverride<'MuiPaginationItem'> {
  return {
    MuiPaginationItem: {
      styleOverrides: {
        root({ ownerState: { color = 'primary', variant = 'outlined' } }) {
          const borderColor = variant === 'outlined' ? tokens.sys.color.neutral.dark : 'none';
          return {
            color: tokens.sys.color.text.default,
            borderColor: borderColor,
            '&:hover, &.Mui-selected:hover': {
              backgroundColor: tokens.sys.color.secondary.light,
              color: tokens.sys.color.text.default,
              '&:focus': {
                backgroundColor: tokens.sys.color.neutral.dark,
                color: tokens.sys.color.secondary.contrastText,
              },
            },
            '&.Mui-selected': {
              backgroundColor: tokens.sys.color.secondary.main,
              color: tokens.sys.color.secondary.contrastText,
            },
          };
        },
        ellipsis: {
          '&:hover': {
            backgroundColor: 'unset',
          },
        },
      },
    },
  };
}

export default paginationItemOverrides;

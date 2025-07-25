import type { ComponentOverride, Tokens } from '../../../types';

function listOverrides(tokens: Tokens): ComponentOverride<'MuiList'> {
  return {
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.sys.color.background.paper,
          color: tokens.sys.color.text.default,
          height: '100%',
          overflow: 'auto',
          width: '100%',
          a: {
            backgroundSize: '0',
          },
          'li::marker': {
            content: '""',
          },
          '.MuiDivider-root': {
            borderTop: `1px solid ${tokens.sys.color.neutral.light}`,
            margin: '0 !important',
          },
          '.MuiList-root': {
            padding: '0 0 0 1rem',
          },
          '.MuiListItemButton-root': {
            color: tokens.sys.color.text.default,
            '&.Mui-disabled': {
              color: tokens.sys.color.text.disabled,
            },
            '&:active': {
              backgroundColor: tokens.sys.color.accent01.main,
            },
            '&.Mui-focusVisible, &.Mui-selected, &.Mui-selected:hover, &:hover': {
              backgroundColor: tokens.sys.color.accent01.light,
              color: tokens.sys.color.secondary.contrastText,
            },
            '&.Mui-focusVisible, &:hover': {
              color: tokens.sys.color.text.default,
            },
            '&.Mui-selected, &.Mui-selected.Mui-focusVisible, &.Mui-selected:hover': {
              backgroundColor: tokens.ref.palette.secondary.shade10,
            },
          },
          '.MuiListSubheader-root': {
            backgroundColor: tokens.sys.color.surface.shade93,
            color: tokens.sys.color.text.default,
            fontSize: tokens.sys.typescale.meta.small.size,
            fontWeight: tokens.ref.typeface.weight.bold,
            lineHeight: 'normal',
            padding: '1rem 1rem 0.5rem',
          },
        },
      },
    },
  };
}

export default listOverrides;

import type { ComponentOverride, Tokens } from '../../../types';

function menuOverrides(tokens: Tokens): ComponentOverride<'MuiMenu'> {
  return {
    MuiMenu: {
      styleOverrides: {
        root: {
          'li::marker': {
            content: '""',
          },
          '.MuiDivider-root': {
            borderTop: `1px solid ${tokens.ref.palette.secondary.shade90}`,
            margin: '0 !important',
          },
          '.MuiList-root': {
            maxWidth: '16rem',
            padding: 0,
            '.MuiMenuItem-root': {
              whiteSpace: 'normal',
              fontSize: tokens.sys.typescale.body.small.size,
            },
          },
          '.MuiListSubheader-root': {
            color: tokens.sys.color.text.secondary,
            fontSize: tokens.sys.typescale.meta.small.size,
            fontWeight: tokens.ref.typeface.weight.bold,
            lineHeight: 'normal',
            padding: '1rem 1rem 0.5rem',
          },
          '.MuiMenu-paper': {
            borderRadius: tokens.sys.shape.corner.extraSmall,
          },
          '.MuiMenuItem-root': {
            color: tokens.sys.color.text.default,
            padding: '0.5rem 1rem',
            '&:active': {
              backgroundColor: tokens.sys.color.accent01.main,
            },
            '&.BlueshiftUIMenuItem.BlueshiftUIMenuItem-placeholder': {
              display: 'none',
            },
            '&.Mui-disabled': {
              color: tokens.sys.color.text.disabled,
            },
            '&.Mui-focusVisible, &.Mui-selected, &.Mui-selected:hover, :hover': {
              backgroundColor: tokens.sys.color.accent01.light,
              color: tokens.sys.color.secondary.contrastText,
            },
            '&.Mui-focusVisible, &:hover': {
              color: tokens.sys.color.text.default,
            },
            '&.Mui-selected, &.Mui-selected.Mui-focusVisible, &.Mui-selected:hover': {
              backgroundColor: tokens.sys.color.accent01.main,
              color: tokens.sys.color.text.default,
            },
          },
        },
        paper: {
          borderRadius: 0,
          boxShadow: 'none',
          filter: tokens.sys.shadow.filter.declaration04,
        },
      },
    },
  };
}

export default menuOverrides;

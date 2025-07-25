import type { ComponentOverride, Tokens } from '../../../types';

function fabOverrides(tokens: Tokens): ComponentOverride<'MuiFab'> {
  return {
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: tokens.comp.fab.shadow.default,
          display: 'flex',
          height: tokens.comp.fab.size.default,
          width: tokens.comp.fab.size.default,
          '&.MuiFab-primary': {
            backgroundColor: tokens.sys.color.primary.main,
            color: tokens.sys.color.primary.contrastText,
          },
          '&.MuiFab-default:not(.Mui-disabled)': {
            backgroundColor: tokens.sys.color.background.paper,
          },
          '&.MuiFab-Corner-top': {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          },
          '&.MuiFab-Corner-right': {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
          '&.MuiFab-Corner-bottom': {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
          '&.MuiFab-Corner-left': {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
          '> *': {
            overflow: 'visible',
          },
        },
        extended: {
          width: 'auto',
        },
        sizeMedium: {
          height: tokens.comp.fab.size.medium,
          width: tokens.comp.fab.size.medium,
        },
        sizeSmall: {
          height: tokens.comp.fab.size.small,
          width: tokens.comp.fab.size.small,
        },
      },
    },
  };
}

export default fabOverrides;

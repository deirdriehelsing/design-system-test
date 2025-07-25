import type { ComponentOverride, Tokens } from '../../../types';

import baseCardOverrides from '../../base/component-overrides/card';

function muiCard(tokens: Tokens): ComponentOverride<'MuiCard'> {
  const base = baseCardOverrides(tokens);

  return {
    MuiCard: {
      ...base.MuiCard,
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: tokens.comp.card.borderRadius.default,
          boxShadow: tokens.comp.card.boxShadow.default,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          textAlign: 'left',
          transition: theme.transitions.create(['box-shadow'], {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut,
          }),
          '&:has(.MuiCardActionArea-root):hover': {
            boxShadow: tokens.comp.card.boxShadow.hover,
          },
        }),
      },
    },
  };
}

function cardOverrides(tokens: Tokens) {
  return {
    ...muiCard(tokens),
  };
}

export default cardOverrides;

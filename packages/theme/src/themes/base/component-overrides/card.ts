import type { ComponentOverride, Tokens } from '../../../types';

function muiCard(tokens: Tokens): ComponentOverride<'MuiCard'> {
  return {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: tokens.comp.card.borderRadius.default,
          boxShadow: tokens.comp.card.boxShadow.default,
          color: tokens.sys.color.text.default,
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

function muiCardActionArea(): ComponentOverride<'MuiCardActionArea'> {
  return {
    MuiCardActionArea: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          flexGrow: 1,
        },
        focusHighlight: {
          backgroundColor: 'transparent',
        },
      },
    },
  };
}

function muiCardActions(tokens: Tokens): ComponentOverride<'MuiCardActions'> {
  return {
    MuiCardActions: {
      styleOverrides: {
        root: {
          alignItems: 'flex-start' as const,
          display: 'flex',
          flexDirection: 'column' as const,
          fontSize: `${tokens.sys.typescale.body.small.size}`,
          padding: '0.5rem 1.5rem 1.5rem 1.5rem',
          '> div': {
            display: 'flex',
            width: '100%',
          },
          '& a:hover, button:hover': {
            textDecoration: 'none',
          },
          '& .MuiTypography-body2, & .MuiTypography-bodySmall': {
            color: tokens.ref.palette.neutral.shade20,
            width: '100%',
          },
          '& .MuiLinearProgress-root': {
            marginBottom: '0.5em',
            width: '100%',
          },
        },
      },
    },
  };
}

function muiCardContent(tokens: Tokens): ComponentOverride<'MuiCardContent'> {
  return {
    MuiCardContent: {
      styleOverrides: {
        root: {
          flexGrow: 1,
          padding: '0.75rem 1.5rem 0 1.5rem',
          '& .MuiTypography-overline, & .MuiTypography-labelSmall': {
            display: 'flex',
            marginBottom: '0.5rem',
          },
          '& .BlueshiftTag-root .MuiTypography-labelSmall': {
            marginBottom: 0,
          },
          '& .MuiTypography-labelLarge': {
            fontWeight: tokens.ref.typeface.weight.semibold,
          },
        },
      },
    },
  };
}

function cardOverrides(tokens: Tokens) {
  return {
    ...muiCard(tokens),
    ...muiCardActionArea(),
    ...muiCardActions(tokens),
    ...muiCardContent(tokens),
  };
}

export default cardOverrides;

import type { ComponentOverride, Tokens } from '../../../types';

function appBarOverrides(tokens: Tokens): ComponentOverride<'MuiAppBar'> {
  return {
    MuiAppBar: {
      defaultProps: {
        color: 'default' as const,
        elevation: 14,
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          height: tokens.comp.appBar.minHeight.small,
          ...(['default'].includes(ownerState?.color as string) && {
            backgroundColor: tokens.ref.palette.primary.shade100,
          }),
          [theme.breakpoints.up('md')]: {
            height: tokens.comp.appBar.minHeight.default,
          },
          '& .MuiButton-root:not(.ignoreOverrides)': {
            '&:focus-visible': {
              outlineOffset: '0.125rem',
              outlineColor: 'currentColor',
              outlineStyle: 'dashed',
              outlineWidth: '1px',
            },
            '&:active, &:focus, &:hover': {
              boxShadow: 'none',
              backgroundColor: 'transparent',
              textDecoration: 'none',
              transform: 'none',
            },
          },
          '& .MuiToolbar-root': {
            backgroundColor: 'inherit',
            borderBottom: 'unset',
            color: tokens.ref.palette.secondary.shade10,
            height: '100%',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            [theme.breakpoints.up('md')]: {
              paddingLeft: '1.25rem',
              paddingRight: '1.25rem',
              justifyContent: 'space-between',
            },
            '& .MuiSvgIcon-root': {
              color: tokens.ref.palette.secondary.shade10,
            },
            '& .MuiButton-root': {
              padding: '0.5rem 0.75rem',
              '&:not(.ignoreOverrides)': {
                '&:active, &:focus, &:hover': {
                  boxShadow: 'none',
                  backgroundColor: 'transparent',
                  textDecoration: 'none',
                  transform: 'none',
                },
              },
            },
          },
        }),
      },
    },
  };
}

export default appBarOverrides;

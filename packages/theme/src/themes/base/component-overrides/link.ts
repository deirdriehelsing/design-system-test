import type { ComponentOverride, Tokens } from '../../../types';

function linkOverrides(tokens: Tokens): ComponentOverride<'MuiLink'> {
  return {
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: tokens.sys.color.text.link,
          cursor: 'pointer',
          position: 'relative' as const,
          textDecoration: 'none',
          transition: theme.transitions.create(['background-size'], {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut,
          }),
          '&:focus-visible': {
            outlineOffset: '0.125rem',
            outlineColor: 'currentColor',
            outlineStyle: 'dotted',
            outlineWidth: '1px',
          },
          '&:active, &:focus, &:hover': {
            color: tokens.sys.color.primary.dark,
          },
          variants: [
            {
              props: ({ underline }) => underline === 'always',
              style: {
                '&:not(.MuiButton-root)': {
                  background: 'linear-gradient(to right, currentColor 100%, transparent 100%)',
                  backgroundPosition: '100% calc(100% - 0.175rem)',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100% var(--sys-shape-thickness-small)',
                  '&:active, &:focus, &:hover': {
                    backgroundSize: '0% var(--sys-shape-thickness-small)',
                  },
                },
              },
            },
            {
              props: ({ underline }) => underline === 'hover',
              style: {
                '&:not(.MuiButton-root)': {
                  backgroundSize: '0% var(--sys-shape-thickness-small)',
                  '&:active, &:focus, &:hover': {
                    background: 'linear-gradient(to left, currentColor 100%, transparent 100%)',
                    backgroundPosition: '100% calc(100% - 0.175rem)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% var(--sys-shape-thickness-small)',
                    textDecoration: 'none',
                  },
                },
              },
            },
          ],
        }),
      },
    },
  };
}

export default linkOverrides;

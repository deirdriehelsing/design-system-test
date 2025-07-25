import type { ComponentOverride, Tokens } from '../../../types';

function baselineOverrides(tokens: Tokens): ComponentOverride<'MuiCssBaseline'> {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.sys.color.background.default,
          color: tokens.sys.color.text.primary,
        },
        '*:focus-visible': {
          outlineOffset: '0.25rem',
          outlineColor: 'currentColor',
          outlineStyle: 'dashed',
          outlineWidth: '1px',
        },
        a: {
          color: tokens.sys.color.primary.main,
        },
        html: {
          scrollBehavior: 'smooth',
        },
        li: {
          paddingLeft: '0.5rem',
          '> p': {
            marginTop: 0,
            ':last-child': {
              marginBottom: 0,
            },
          },
        },
        'ol, ul': {
          marginLeft: '0',
          marginTop: '0',
          paddingLeft: '1rem',
          ':last-child': {
            marginBottom: '0',
          },
        },
        'ul li::marker': {
          content: '"•"',
        },
      },
    },
  };
}

export default baselineOverrides;

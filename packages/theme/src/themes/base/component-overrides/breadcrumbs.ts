import type { ComponentOverride, Tokens } from '../../../types';

function breadcrumbsOverrides(tokens: Tokens): ComponentOverride<'MuiBreadcrumbs'> {
  return {
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          '.MuiBreadcrumbs-ol > li': {
            paddingLeft: 0,
          },
        },
      },
    },
  };
}

export default breadcrumbsOverrides;

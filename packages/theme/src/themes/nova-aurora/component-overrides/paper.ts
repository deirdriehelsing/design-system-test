import type { ComponentOverride, Tokens } from '../../../types';

import basePaperOverrides from '../../base/component-overrides/paper';

declare module '@mui/material/Paper' {
  interface PaperOwnProps {
    accentColor?: 'accent01' | 'accent02' | 'accent03' | 'accent04' | 'tertiary' | 'primary';
    colorVariant?: 'saturated' | 'colored' | 'bordered' | 'empty';
  }
}

function paperOverrides(tokens: Tokens): ComponentOverride<'MuiPaper'> {
  const base = basePaperOverrides(tokens);

  return {
    MuiPaper: {
      ...base.MuiPaper,
      styleOverrides: {
        ...base.MuiPaper?.styleOverrides,
        root: {
          ...(base.MuiPaper?.styleOverrides?.root as any),
          boxShadow: tokens.sys.shadow.soft.s,
        },
      },
    },
  };
}

export default paperOverrides;

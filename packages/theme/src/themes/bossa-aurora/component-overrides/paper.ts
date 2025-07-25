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
          borderWidth: '2px',
          borderStyle: 'solid',
          elevation: 0,
        },
      },
      variants: [
        ...(base.MuiPaper?.variants as any),
        {
          props: { colorVariant: 'bordered', accentColor: undefined },
          style: {
            borderColor: tokens.sys.color.secondary.main,
          },
        },
        {
          props: (props) => ['saturated', undefined].includes(props.colorVariant),
          style: {
            border: 'none',
          },
        },
        {
          props: (props) =>
            ['bordered', 'colored'].includes(props.colorVariant as string) &&
            props.accentColor === 'accent01',
          style: {
            borderColor: tokens.sys.color.accent01.dark,
          },
        },
        {
          props: (props) =>
            ['bordered', 'colored'].includes(props.colorVariant as string) &&
            props.accentColor === 'accent02',
          style: {
            borderColor: tokens.sys.color.accent02.dark,
          },
        },
        {
          props: (props) =>
            ['bordered', 'colored'].includes(props.colorVariant as string) &&
            props.accentColor === 'accent03',
          style: {
            borderColor: tokens.sys.color.accent03.dark,
          },
        },
        {
          props: (props) =>
            ['bordered', 'colored'].includes(props.colorVariant as string) &&
            props.accentColor === 'accent04',
          style: {
            borderColor: tokens.sys.color.accent04.dark,
          },
        },
        {
          props: (props) =>
            ['bordered', 'colored'].includes(props.colorVariant as string) &&
            props.accentColor === 'primary',
          style: {
            borderColor: tokens.sys.color.secondary.main,
          },
        },
      ],
    },
  };
}

export default paperOverrides;

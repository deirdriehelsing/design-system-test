import type { ComponentOverride, Tokens } from '../../../types';

declare module '@mui/material/Paper' {
  interface PaperOwnProps {
    accentColor?: 'accent01' | 'accent02' | 'accent03' | 'accent04' | 'tertiary' | 'primary';
    colorVariant?: 'saturated' | 'colored' | 'bordered' | 'empty';
  }
}

function paperOverrides(tokens: Tokens): ComponentOverride<'MuiPaper'> {
  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.sys.color.background.paper,
          border: 'none',
          color: tokens.sys.color.text.default,
        },
      },
      variants: [
        {
          // Default accent color for colored paper
          props: (props) =>
            props.colorVariant === 'colored' && [undefined, 'accent01'].includes(props.accentColor),
          style: {
            backgroundColor: tokens.sys.color.surface.shade92,
          },
        },
        {
          props: { colorVariant: 'colored', accentColor: 'accent02' },
          style: {
            backgroundColor: tokens.sys.color.surface.shade95,
          },
        },
        {
          props: { colorVariant: 'colored', accentColor: 'accent03' },
          style: {
            backgroundColor: tokens.sys.color.surface.shade98,
          },
        },
        {
          props: { colorVariant: 'colored', accentColor: 'accent04' },
          style: {
            backgroundColor: tokens.sys.color.surface.shade96,
          },
        },
        {
          props: { colorVariant: 'colored', accentColor: 'primary' },
          style: {
            backgroundColor: tokens.ref.palette.primary.shade90,
          },
        },
        {
          // Default accent color for saturated paper
          props: (props) =>
            props.colorVariant === 'saturated' &&
            [undefined, 'primary'].includes(props.accentColor),
          style: {
            backgroundColor: tokens.sys.color.background.paper,
          },
        },
        {
          props: { colorVariant: 'saturated', accentColor: 'tertiary' },
          style: {
            backgroundColor: tokens.ref.palette.surface.shade79,
            color: tokens.sys.color.tertiary.contrastText,
          },
        },
        {
          props: { colorVariant: 'saturated', accentColor: 'accent03' },
          style: {
            backgroundColor: tokens.ref.palette.surface.shade80,
            color: tokens.sys.color.accent03.contrastText,
          },
        },
        {
          props: { colorVariant: 'saturated', accentColor: 'accent04' },
          style: {
            backgroundColor: tokens.ref.palette.surface.shade81,
            color: tokens.sys.color.accent04.contrastText,
          },
        },
        {
          props: { colorVariant: 'empty' },
          style: {
            border: `2px dashed ${tokens.sys.color.secondary.main}`,
          },
        },
        {
          props: { colorVariant: 'empty', accentColor: 'accent01' },
          style: {
            border: `2px dashed ${tokens.sys.color.accent01.main}`,
          },
        },
        {
          props: { colorVariant: 'empty', accentColor: 'accent02' },
          style: {
            border: `2px dashed ${tokens.sys.color.accent02.main}`,
          },
        },
        {
          props: { colorVariant: 'empty', accentColor: 'accent03' },
          style: {
            border: `2px dashed ${tokens.sys.color.accent03.main}`,
          },
        },
        {
          props: { colorVariant: 'empty', accentColor: 'accent04' },
          style: {
            border: `2px dashed ${tokens.sys.color.accent04.main}`,
          },
        },
      ],
    },
  };
}

export default paperOverrides;

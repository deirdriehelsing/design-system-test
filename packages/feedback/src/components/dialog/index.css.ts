import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import tokens from '@blueshift-ui/tokens/dist/base';

const breakpoints = tokens.sys.breakpoint;

const resetRoot = style({
  maxWidth: 'unset',
  width: 'unset',
});

const container = style({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 'unset',
  width: 'unset',
  height: '100%',
  '@media': {
    [`(min-width: ${breakpoints.md}px)`]: {
      flexDirection: 'row-reverse',
    },
  },
});

const anchorBottom = style({});

const mainContent = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  maxWidth: 444,
  width: 'unset',
  maxHeight: 'calc(100vh - 4rem)',
  vars: {
    '--maxWidth': `${444}px`,
  },
});

globalStyle(`${anchorBottom} ${mainContent}`, {
  '@media': {
    [`(max-width: ${breakpoints.md - 1}px)`]: {
      maxWidth: '100%',
      vars: {
        '--maxWidth': '100%',
      },
    },
  },
});

const mainContentMaxWidth = styleVariants({
  xs: {
    maxWidth: 'var(--maxWidth)',
  },
  sm: {
    maxWidth: breakpoints.sm,
    vars: {
      '--maxWidth': `${breakpoints.sm}px`,
    },
  },
  md: {
    maxWidth: breakpoints.md,
    vars: {
      '--maxWidth': `${breakpoints.md}px`,
    },
  },
  lg: {
    maxWidth: breakpoints.lg,
    vars: {
      '--maxWidth': `${breakpoints.lg}px`,
    },
  },
  xl: {
    maxWidth: breakpoints.xl,
    vars: {
      '--maxWidth': `${breakpoints.xl}px`,
    },
  },
});

const mainContentFullWidth = style({
  width: 'calc(100vw - 4rem)',
});

globalStyle(`${anchorBottom} ${mainContentFullWidth}`, {
  '@media': {
    [`(max-width: ${breakpoints.md - 1}px)`]: {
      width: '100%',
    },
  },
});

const mainContentFullScreen = style({
  maxWidth: '100%',
  width: '100%',
  maxHeight: '100vh',
});

const mainContentNoHeading = style({
  paddingTop: '2rem',
});

const rightContent = style({
  display: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem 2rem 1rem',
});

const rightContentMobile = style({
  '@media': {
    [`(max-width: ${breakpoints.md - 1}px)`]: {
      display: 'flex',
    },
  },
});

const rightContentDesktop = style({
  paddingLeft: '0',
  '@media': {
    [`(min-width: ${breakpoints.md}px)`]: {
      display: 'flex',
    },
  },
});

globalStyle(`${rightContent} ~ .MuiDialogActions-root, ${rightContent} ~ .MuiDialogContent-root`, {
  '@media': {
    [`(min-width: ${breakpoints.md}px)`]: {
      paddingRight: '1rem',
    },
  },
});

globalStyle(`${anchorBottom} .MuiPaper-root`, {
  '@media': {
    [`(max-width: ${breakpoints.md - 1}px)`]: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      bottom: 0,
      left: 0,
      margin: 0,
      maxWidth: '100%',
      outline: 0,
      position: 'fixed',
      right: 0,
      width: '100%',
    },
  },
});

globalStyle(`${anchorBottom} .MuiDialogActions-root`, {
  borderTop: 0,
  flexWrap: 'wrap',
  gap: '1rem',
  justifyContent: 'flex-start',

  '@media': {
    [`(max-width: ${breakpoints.md - 1}px)`]: {
      justifyContent: 'center',
    },
  },
});

globalStyle(`${anchorBottom} .MuiDialogActions-root > *`, {
  marginLeft: '0',

  '@media': {
    [`(max-width: ${breakpoints.md - 1}px)`]: {
      width: '100%',
    },
  },
});

export {
  anchorBottom,
  container,
  mainContent,
  mainContentFullScreen,
  mainContentFullWidth,
  mainContentMaxWidth,
  mainContentNoHeading,
  resetRoot,
  rightContent,
  rightContentDesktop,
  rightContentMobile,
};

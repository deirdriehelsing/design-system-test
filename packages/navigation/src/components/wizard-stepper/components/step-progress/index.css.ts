import { style } from '@vanilla-extract/css';

const bar = style({
  backgroundColor: 'var(--wizard-stepper-bar-color)',
  borderRadius: 'var(--sys-shape-corner-full)',
  bottom: '1rem',
  left: 0,
  minWidth: '1rem',
  height: '0.25rem',
  overflow: 'hidden',
  position: 'absolute',
  right: 0,

  ':after': {
    backgroundColor: 'var(--wizard-stepper-completed-bar-color)',
    content: '""',
    display: 'block',
    height: '0.25rem',
    transition: 'transform 0.4s',
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    width: '100%',
  },

  selectors: {
    '&[aria-valuenow="1"]:after': {
      transform: 'scaleX(1)',
    },
  },
});

const showOnMobile = style({
  display: 'none',
  '@media': {
    '(max-width: 767px)': {
      display: 'block',
    },
  },
});

const showOnDesktop = style({
  display: 'none',
  '@media': {
    '(min-width: 768px)': {
      display: 'block',
    },
  },
});

const hideLast = style({
  '@media': {
    '(max-width: 767px)': {
      display: 'none',
    },
  },
});

export { bar, hideLast, showOnDesktop, showOnMobile };

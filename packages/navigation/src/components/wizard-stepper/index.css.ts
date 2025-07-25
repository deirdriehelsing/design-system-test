import { globalStyle, style } from '@vanilla-extract/css';

globalStyle(':root', {
  vars: {
    '--wizard-stepper-background': 'transparent',
    '--wizard-stepper-color': 'inherit',
    '--wizard-stepper-bar-color': 'var(--ref-palette-tertiary-shade90)',
    '--wizard-stepper-icon-background': 'var(--ref-palette-tertiary-shade90)',
    '--wizard-stepper-icon-color': 'var(--sys-color-tertiary-main)',
    '--wizard-stepper-completed-bar-color': 'currentColor',
    '--wizard-stepper-current-icon-color': 'white',
    '--wizard-stepper-current-icon-background1': 'var(--ref-palette-accent01-shade50)',
    '--wizard-stepper-current-icon-background2': 'var(--ref-palette-accent04-shade50)',
    '--wizard-stepper-current-icon-background3': 'var(--ref-palette-accent03-shade60)',
  },
});

const stepper = style({
  background: 'var(--wizard-stepper-background)',
  borderRadius: 'var(--sys-shape-corner-medium)',
  color: 'var(--wizard-stepper-color)',
  display: 'flex',
  gap: '1rem',
  listStyle: 'none',
  padding: '2rem 2.5rem',
  transition: 'transform 0.4s',
  width: '100%',

  '@media': {
    [`(max-width: 767px)`]: {
      gap: '.5rem',
      padding: '2rem 1rem',
    },
  },
});

const stepperMobile = style({
  '@media': {
    [`(max-width: 767px)`]: {
      background: 'var(--sys-color-background-paper)',
      gap: '0.25rem',
      padding: '0.5rem 2.5rem',
    },
  },
});

const bottomStepperMobile = style({
  '@media': {
    '(max-width: 767px)': {
      paddingBottom: '1rem',
    },
  },
});

const fixed = style({});
const scrolling = style({});

const anchorBottom = style({
  borderRadius: 'var(--sys-shape-corner-largeTop)',

  selectors: {
    [`&${fixed}`]: {
      bottom: 0,
      left: 0,
      position: 'fixed',
    },
  },
  '@media': {
    '(max-width: 767px)': {
      selectors: {
        [`&${scrolling}${fixed}`]: {
          transform: 'translateY(100%)',
        },
      },
    },
  },
});

const anchorTop = style({
  borderRadius: 'var(--sys-shape-corner-largeBottom)',

  selectors: {
    [`&${fixed}`]: {
      left: 0,
      position: 'fixed',
      top: 0,
    },
  },
  '@media': {
    '(max-width: 767px)': {
      selectors: {
        [`&${scrolling}${fixed}`]: {
          transform: 'translateY(-100%)',
        },
      },
    },
  },
});

export { fixed, stepper, stepperMobile, anchorBottom, scrolling, anchorTop, bottomStepperMobile };

import { globalStyle, style } from '@vanilla-extract/css';

const icon = style({
  background: 'var(--wizard-stepper-icon-background)',
  borderRadius: 'var(--sys-shape-corner-extraSmall)',
  padding: '0.375rem',
});

const iconMobile = style({
  '@media': {
    [`(max-width: 767px)`]: {
      alignItems: 'center',
      background: 'var(--sys-color-surface-shade100)',
      border: '1.5px solid var(--sys-color-neutral-light)',
      borderRadius: 'var(--sys-shape-corner-full)',
      color: 'var(--sys-color-text-default)',
      display: 'flex',
      fontSize: '0.625rem',
      fontWeight: 'var(--ref-typeface-weight-bold)',
      height: '1.25rem',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: 0,
      width: '1.25rem',
    },
  },
});

const iconCompleted = style({
  '@media': {
    [`(max-width: 767px)`]: {
      border: 'none',
    },
  },
});

const step = style({
  alignItems: 'flex-end',
  display: 'flex',
  flex: 1,
  gap: '0.5rem',
  padding: 0,
});

const stepMobile = style({
  '@media': {
    [`(max-width: 767px)`]: {
      alignItems: 'center',
      gap: '0.25rem',

      selectors: {
        '&:last-child': {
          flex: '0 0 auto',
          gap: 0,
          width: 'auto',
        },
      },
    },
  },
});

const progress = style({
  flex: 1,
  paddingBottom: '1.75rem',
  position: 'relative',
});

const progressMobile = style({
  '@media': {
    [`(max-width: 767px)`]: {
      paddingBottom: '0',
    },
  },
});

const text = style({
  // Hides the element visually, but keeps it accessible for screen readers
  '@media': {
    [`(max-width: 767px)`]: {
      border: '0',
      clip: 'rect(0, 0, 0, 0)',
      clipPath: 'inset(50%)',
      height: '1px',
      overflow: 'hidden',
      padding: '0',
      position: 'absolute',
      width: '1px',
      whiteSpace: 'nowrap',
    },
  },
});

const completedStep = `${step}:has(~[aria-current="step"])`;
const currentStep = `${step}[aria-current="step"]`;

globalStyle(`${currentStep}:nth-child(n) ${iconMobile}`, {
  '@media': {
    [`(max-width: 767px)`]: {
      background: 'var(--sys-color-tertiary-main)',
      border: 'none',
      color: 'var(--sys-color-tertiary-contrastText)',
      height: '1.5rem',
      width: '1.5rem',
    },
  },
});

globalStyle(`${icon} svg`, {
  color: 'var(--wizard-stepper-icon-color)',
  display: 'block',
  height: '1.5rem',
  width: '1.5rem',
});

globalStyle(`${completedStep} ${icon}`, {
  background: 'transparent',
});

globalStyle(`${completedStep} ${icon} svg`, {
  color: 'inherit',
});

globalStyle(`${currentStep} ${icon} svg`, {
  color: 'var(--wizard-stepper-current-icon-color)',
});

globalStyle(`${currentStep}:nth-child(3n+1) ${icon}`, {
  background: 'var(--wizard-stepper-current-icon-background1)',
});

globalStyle(`${currentStep}:nth-child(3n+2) ${icon}`, {
  background: 'var(--wizard-stepper-current-icon-background2)',
});

globalStyle(`${currentStep}:nth-child(3n) ${icon}`, {
  background: 'var(--wizard-stepper-current-icon-background3)',
});

export { icon, iconCompleted, iconMobile, progress, progressMobile, step, stepMobile, text };

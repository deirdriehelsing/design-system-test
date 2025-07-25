import { style, styleVariants } from '@vanilla-extract/css';

const baseTag = style({
  alignItems: 'center',
  borderRadius: 'var(--comp-badge-borderRadius-small)',
  display: 'inline-flex',
  gap: '.25rem',
  padding: '0.25rem 0.5rem',
});

const tag = styleVariants({
  accent01: [
    baseTag,
    {
      background: 'var(--sys-color-accent01-main)',
      color: 'var(--sys-color-accent01-contrastText)',
    },
  ],
  accent02: [
    baseTag,
    {
      background: 'var(--sys-color-accent02-main)',
      color: 'var(--sys-color-accent02-contrastText)',
    },
  ],
  accent03: [
    baseTag,
    {
      background: 'var(--sys-color-accent03-main)',
      color: 'var(--sys-color-accent03-contrastText)',
    },
  ],
  accent04: [
    baseTag,
    {
      background: 'var(--sys-color-accent04-main)',
      color: 'var(--sys-color-accent04-contrastText)',
    },
  ],
  error: [
    baseTag,
    {
      background: 'var(--sys-color-error-main)',
      color: 'var(--sys-color-error-contrastText)',
    },
  ],
  gradient: [
    baseTag,
    {
      background:
        'linear-gradient(to right, var(--ref-palette-accent01-shade90) 0%, var(--ref-palette-error-shade90) 20%, var(--ref-palette-accent01-shade90) 69.5%, var(--ref-palette-accent01-shade80)   100%)',
      color: 'var(--sys-color-text-default)',
    },
  ],
  neutral: [
    baseTag,
    {
      background: 'var(--sys-color-neutral-light)',
      color: 'var(--sys-color-text-default)',
    },
  ],
  primary: [
    baseTag,
    {
      background: 'var(--sys-color-primary-main)',
      color: 'var(--sys-color-primary-contrastText)',
    },
  ],
  secondary: [
    baseTag,
    {
      background: 'var(--sys-color-secondary-main)',
      color: 'var(--sys-color-secondary-contrastText)',
    },
  ],
  success: [
    baseTag,
    {
      background: 'var(--sys-color-success-main)',
      color: 'var(--sys-color-success-contrastText)',
    },
  ],
  warning: [
    baseTag,
    {
      background: 'var(--sys-color-warning-main)',
      color: 'var(--sys-color-warning-contrastText)',
    },
  ],
});

export { tag };

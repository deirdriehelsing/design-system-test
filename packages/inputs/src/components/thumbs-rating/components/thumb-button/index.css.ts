import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

const button = style({});

const icon = styleVariants({
  default: {
    color: 'var(--sys-color-secondary-main)',
  },
  disabled: {
    color: 'var(--sys-color-action-disabled)',
  },
  error: {
    color: 'var(--sys-color-error-main)',
  },
  selected: {
    color: 'var(--sys-color-secondary-contrastText)',
  },
});

globalStyle(`${button}:hover`, {
  borderColor: 'var(--sys-color-secondary-light)',
  boxShadow: '0 0.25rem 0 var(--sys-color-secondary-main)',
});

globalStyle(`${button} .round-button_buttonBase`, {
  borderColor: 'var(--sys-color-secondary-light)',
});

export { button, icon };

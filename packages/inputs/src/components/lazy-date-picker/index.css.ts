import { globalStyle, style } from '@vanilla-extract/css';

const enabledDate = style({
  backgroundColor: 'var(--comp-datePicker-backgroundColor-enabledDate)',
  selectors: {
    '&.MuiButtonBase-root:focus': {
      backgroundColor: 'var(--comp-datePicker-backgroundColor-enabledDate)',
    },
    '&.Mui-selected, &.Mui-selected:focus': {
      backgroundColor: 'var(--comp-datePicker-backgroundColor-selectedDate)',
      color: 'var(--ref-palette-primary-shade100)',
    },
    '&:hover, &:focus:hover': {
      backgroundColor: 'var(--comp-datePicker-backgroundColor-hover)',
      color: 'var(--ref-palette-primary-shade100)',
    },
    '&.Mui-disabled:not(.Mui-selected)': {
      backgroundColor: 'transparent',
    },
  },
});

const textField = style({});

globalStyle(`${textField} .MuiIconButton-root`, {
  color: 'var(--sys-color-text-link)',
});

globalStyle(`${textField} .MuiIconButton-root:hover`, {
  backgroundColor: 'var(--sys-color-secondary-light)',
});

globalStyle(`${textField} .MuiIconButton-root:active`, {
  backgroundColor: 'var(--sys-color-neutral-main)',
  color: 'var(--sys-color-neutral-contrastText)',
});

export { enabledDate, textField };

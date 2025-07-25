import { style } from '@vanilla-extract/css';

const enabledDate = style({
  backgroundColor: 'var(--comp-datePicker-backgroundColor-enabledDate)',
  selectors: {
    '&.MuiButtonBase-root:focus': {
      backgroundColor: 'var(--comp-datePicker-backgroundColor-enabledDate)',
    },
    '&:hover, &:focus:hover, &.Mui-selected, &.Mui-selected:focus': {
      backgroundColor: 'var(--comp-datePicker-backgroundColor-selectedDate)',
      color: 'var(--ref-palette-primary-shade100)',
    },
    '&.Mui-disabled:not(.Mui-selected)': {
      backgroundColor: 'transparent',
    },
  },
});

export { enabledDate };

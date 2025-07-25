import { globalStyle, style } from '@vanilla-extract/css';

const autoComplete = style({});

globalStyle(`${autoComplete} .MuiAutocomplete-inputRoot`, {
  fontSize: 'var(--sys-typescale-body-large-size)',
  fontWeight: 'var(--sys-typescale-body-large-weight)',
  lineHeight: 'var(--sys-typescale-body-large-line-height)',
  paddingBottom: 'var(--comp-input-padding-small)',
  paddingTop: 'var(--comp-input-padding-small)',
});

const backdrop = style({
  height: 'calc(100vh - 4.5rem)',
  transform: 'translateY(4.5rem)',
});

const clearButton = style({
  color: 'var(--sys-color-text-link)',
  ':hover': {
    // apply transparency to CSS variable
    backgroundColor: 'rgb(from var(--sys-color-text-link) r g b / 0.04)',
  },
});

const formContainer = style({
  width: '100%',
});

const formControl = style({
  width: '100%',
});

const input = style({
  height: '3rem',
  position: 'relative',
  width: '100%',
});

const searchResultContainer = style({
  '@media': {
    '(min-width: 1040px)': {
      maxHeight: `calc(100vh - var(--comp-appBar-minHeight-default))`,
    },
  },
});

const skeleton = style({
  height: '3.5rem',
  selectors: {
    '&:not(:last-child)': {
      marginBottom: '.25rem',
    },
  },
  width: '100%',
});

export {
  autoComplete,
  backdrop,
  clearButton,
  formContainer,
  formControl,
  input,
  searchResultContainer,
  skeleton,
};

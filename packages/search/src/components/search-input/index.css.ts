import { style } from '@vanilla-extract/css';

const backdrop = style({
  height: 'calc(100vh - 4.5rem)',
  transform: 'translateY(4.5rem)',
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
  backgroundColor: 'var(--ref-palette-primary-shade100)',
  borderRadius: 'var(--sys-shape-corner-extraSmallBottom)',
  color: 'var(--ref-palette-primary-shade20)',
  display: 'flex',
  flexDirection: 'column',
  left: 0,
  marginLeft: '-1rem',
  overflow: 'hidden',
  overflowY: 'scroll',
  position: 'absolute',
  top: 'var(--comp-appBar-minHeight-default)',
  width: '100vw',
  '@media': {
    '(min-width: 1040px)': {
      marginLeft: 0,
      maxHeight: `calc(100vh - var(--comp-appBar-minHeight-default))`,
      overflowY: 'auto',
      // Adjust subtracting the distance between the input and the top of the header divided by two (top and bottom).
      top: 'calc(100% + (var(--comp-appBar-minHeight-default) - 3rem) / 2)',
      width: 'auto',
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

export { backdrop, formContainer, formControl, input, searchResultContainer, skeleton };

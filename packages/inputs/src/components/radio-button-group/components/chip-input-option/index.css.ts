import { style } from '@vanilla-extract/css';

const hiddenInput = style({
  visibility: 'hidden',
  position: 'absolute',
  zIndex: -1,
});

export { hiddenInput };

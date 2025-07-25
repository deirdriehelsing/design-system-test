import { style } from '@vanilla-extract/css';

const nestedMenuBackdrop = style({
  pointerEvents: 'none',
});

const nestedMenuContainer = style({
  borderRadius: 0,
  pointerEvents: 'all',
});

export { nestedMenuBackdrop, nestedMenuContainer };

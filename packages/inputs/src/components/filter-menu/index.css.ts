import { style } from '@vanilla-extract/css';

const actions = style({
  alignItems: 'center',
  display: 'flex',
  gap: '1rem',
  justifyContent: 'space-between',
  marginTop: '1rem',
});

const button = style({
  gap: '0.5rem',
});

const drawer = style({
  alignItems: 'stretch',
  borderRadius: 'var(--sys-shape-corner-largeTop)',
});

const formControlLabel = style({
  display: 'flex',
  flexBasis: 'content',
});

const popover = style({
  alignItems: 'stretch',
  minWidth: '22rem',
  padding: '1.5rem',
});

export { actions, button, drawer, formControlLabel, popover };

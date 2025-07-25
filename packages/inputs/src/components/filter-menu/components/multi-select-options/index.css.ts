import { style } from '@vanilla-extract/css';

const actions = style({
  alignItems: 'stretch',
  display: 'flex',
  margin: '1rem 0',
  '@media': {
    ['(min-width: 490px)']: {
      alignItems: 'center',
      margin: '1rem 0',
    },
  },
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

const label = style({
  padding: '1rem 0 1rem 0',
});

const root = style({
  alignItems: 'stretch',
  minWidth: '22rem',
  padding: '1rem 1.5rem',
  '@media': {
    ['(min-width: 490px)']: {
      padding: '0.5rem 1.5rem',
    },
  },
});

export { actions, button, drawer, formControlLabel, label, root };

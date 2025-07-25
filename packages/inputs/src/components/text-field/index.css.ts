import { style } from '@vanilla-extract/css';

const endAdornment = style({
  display: 'flex',
  flexDirection: 'row',
});

const endAdornmentReverse = style({
  display: 'flex',
  flexDirection: 'row-reverse',
});

const loading = style({
  margin: '0.725rem',
  marginRight: 0,
});

export { endAdornment, endAdornmentReverse, loading };

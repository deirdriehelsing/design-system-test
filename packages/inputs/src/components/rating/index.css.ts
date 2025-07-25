import { globalStyle, style } from '@vanilla-extract/css';

const endAdornment = style({
  display: 'flex',
  flexDirection: 'row',
});

const endAdornmentReverse = style({
  display: 'flex',
  flexDirection: 'row-reverse',
});

const label = style({
  color: 'var(--sys-color-text-default)',
});

globalStyle(`${label} > .MuiFormLabel-root.Mui-focused`, {
  color: 'var(--sys-color-text-default)',
});

export { endAdornment, endAdornmentReverse, label };

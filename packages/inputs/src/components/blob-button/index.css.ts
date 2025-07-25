import { globalStyle, style } from '@vanilla-extract/css';

const button = style({});

globalStyle(`${button}.Mui-disabled .blob`, {
  color: 'var(--sys-color-text-disabled)',
});

export { button };

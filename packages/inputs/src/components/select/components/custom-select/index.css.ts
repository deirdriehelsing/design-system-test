import { globalStyle, style } from '@vanilla-extract/css';

const menu = style({});

globalStyle(`${menu} .MuiList-root`, {
  maxWidth: '100%',
});

export { menu };

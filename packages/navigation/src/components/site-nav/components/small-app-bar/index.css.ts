import { globalStyle, style } from '@vanilla-extract/css';

const appBar = style({});

globalStyle(`${appBar} > div`, {
  justifyContent: 'space-between',
});

const searchMenuItem = style({
  alignItems: 'center',
  display: 'flex',
  gap: '0.5rem',
});

export { appBar, searchMenuItem };

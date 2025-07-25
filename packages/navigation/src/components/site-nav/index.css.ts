import { globalStyle, style } from '@vanilla-extract/css';

const primaryNavContainer = style({
  display: 'flex',
  flexShrink: 0,
  justifyContent: 'center',
});

const appBar = style({});

globalStyle(`${appBar} .MuiIconButton-root`, {
  color: 'var(--sys-color-neutral-dark)',
  height: '48px',
  width: '48px',
});

globalStyle(`${appBar} .MuiIconButton-root:hover`, {
  // 40% opacity of whatever the color is
  backgroundColor: 'rgb(from currentColor r g b / 0.04)',
});

export { appBar, primaryNavContainer };

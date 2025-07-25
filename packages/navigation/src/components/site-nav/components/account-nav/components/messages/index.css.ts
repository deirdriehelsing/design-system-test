import { globalStyle, style } from '@vanilla-extract/css';

const button = style({
  position: 'relative',
  zIndex: 1,
});

globalStyle(`${button} + div`, {
  marginLeft: '-0.5rem',
});

const unreadMessages = style({
  backgroundColor: 'var(--sys-color-success-main)',
  borderRadius: '50%',
  height: '0.5rem',
  position: 'absolute',
  right: '0.625rem',
  top: '0.75rem',
  width: '0.5rem',
});

export { button, unreadMessages };

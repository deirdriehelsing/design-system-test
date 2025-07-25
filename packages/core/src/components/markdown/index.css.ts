import { globalStyle, style } from '@vanilla-extract/css';

const root = style({});

globalStyle(`${root} *:first-child`, {
  marginTop: 0,
});

globalStyle(`${root} *:last-child`, {
  marginBottom: 0,
});

globalStyle(`${root} code, ${root} pre`, {
  borderRadius: '0.25rem',
  padding: '0.25rem',
  fontSize: '0.9em',
});

globalStyle(`${root} pre`, {
  overflow: 'auto',
});

globalStyle(`${root} pre code`, {
  padding: '0',
  fontSize: '1em',
});

globalStyle(`${root} ol, ${root} ul`, {
  padding: '0 0 0 0.5rem',
  marginBottom: '1em',
});

globalStyle(`${root} li`, {
  marginBottom: '1em',
});

export { root };

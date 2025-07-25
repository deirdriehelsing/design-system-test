import { globalStyle, style } from '@vanilla-extract/css';

const textArea = style({
  maxHeight: '100%',
  maxWidth: '100%',
  position: 'relative',
});

globalStyle(`${textArea} > .MuiInputBase-root > textarea`, {
  resize: 'both',
  padding: 0,
});

export { textArea };

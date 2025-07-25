import { globalStyle, style } from '@vanilla-extract/css';

const closeButton = style({
  position: 'absolute',
  right: '1.5rem',
  top: '1.5rem',
});

const closeIcon = style({
  color: 'var(--sys-color-text-link)',
});

const titleContent = style({
  display: 'flex',
  gap: '1rem',
  flex: 1,
  flexDirection: 'column',
});

globalStyle(`${titleContent} + button`, {
  margin: '-.5rem',
});

const titleContentWithCloseButton = style({
  maxWidth: 'calc(100% - 40px - 1rem)',
});

const topContent = style({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1rem',
});

export { closeButton, closeIcon, titleContent, titleContentWithCloseButton, topContent };

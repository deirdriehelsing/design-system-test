import { style } from '@vanilla-extract/css';

const container = style({
  height: 'calc(var(--container-height) * 1px)',
  position: 'relative',
  width: 'calc(var(--container-width) * 1px)',
});

const image = style({
  left: 0,
  opacity: 0,
  position: 'absolute',
  top: 0,
  transition: 'opacity 0.3s ease-in-out',
});

const loadedImage = style({
  opacity: 1,
});

const skeleton = style({
  left: 0,
  position: 'absolute',
  top: 0,
});

export { container, image, loadedImage, skeleton };

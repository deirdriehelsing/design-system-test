import { style } from '@vanilla-extract/css';

const content = style({
  alignItems: 'flex-start',
  flex: 1,
});

const details = style({
  alignItems: 'flex-start',
});

const editButton = style({
  padding: '0.25rem',
  position: 'relative',
  top: '-0.25rem',
});

const root = style({
  alignItems: 'flex-start',
  width: '100%',
});

export { content, details, editButton, root };

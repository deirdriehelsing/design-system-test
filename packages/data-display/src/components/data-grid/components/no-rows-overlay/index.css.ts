import { style } from '@vanilla-extract/css';

const noRowsOverlay = style({
  alignItems: 'center',
  borderRadius: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  margin: '1.25rem auto',
  padding: '1rem 2.5rem',
  backgroundColor: 'var(--ref-palette-secondary-shade90)',
  width: 'fit-content',
});

export { noRowsOverlay };

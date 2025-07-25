import { style } from '@vanilla-extract/css';

const data = style({
  // TODO: Update to use the new typography variant when available. At the moment there's no 16px size, 24px height, 700 weight variant.
  fontWeight: 'var(--ref-typeface-weight-bold)',
});

export { data };

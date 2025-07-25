import { style } from '@vanilla-extract/css';

const description = style({
  // TODO: Update to use the new typography variant when available. At the moment there's no 12px size, 16px height, 400 weight variant.
  fontSize: 'var(--sys-typescale-meta-small-size)',
  lineHeight: 'var(--sys-typescale-meta-small-line-height)',
});

export { description };

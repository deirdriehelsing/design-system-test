import { globalStyle, style } from '@vanilla-extract/css';

const player = style({});

const rounded = style({});

globalStyle(`${player} video`, {
  verticalAlign: 'middle',
});

globalStyle(`${rounded} video`, {
  borderRadius: 'var(--sys-shape-corner-medium)',
});

export { player, rounded };

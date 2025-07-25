import { globalStyle, style } from '@vanilla-extract/css';

const homeLink = style({
  color: `var(--sys-color-text-primary)`,
  flex: '0 1 192px',
  // A bit of a hack to get the anchor height to match the logo image height
  lineHeight: '0',
  marginRight: '1rem',
});

globalStyle(`${homeLink} > img`, {
  height: 'auto',
  maxWidth: '100%',
  width: '192px',
});

export { homeLink };

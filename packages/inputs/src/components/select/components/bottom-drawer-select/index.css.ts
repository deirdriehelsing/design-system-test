import { globalStyle, style } from '@vanilla-extract/css';

const bottomDrawer = style({
  borderTopLeftRadius: 'var(--sys-shape-corner-large)',
  borderTopRightRadius: 'var(--sys-shape-corner-large)',
  maxHeight: '60vh',
});

const bottomDrawerContent = style({});

const bottomDrawerHeader = style({});

const label = style({
  fontWeight: 'var(--ref-typeface-weight-bold)',
  lineHeight: 'var(--sys-typescale-title-large-lineHeight)',
  margin: '1.5rem 1.5rem 1rem',
});

const option = style({
  padding: '1rem 1.5rem',
  selectors: {
    '&:not(:last-child)': {
      borderBottom: '1px solid var(--ref-palette-primary-shade90)',
    },
  },
});

const options = style({
  height: '100%',
  overflow: 'auto',
  padding: 0,
});

// Using global styles since specificity will take precedence over the Drawer component styles
globalStyle(`${bottomDrawer} ${bottomDrawerHeader}`, {
  borderBottom: 'none',
  padding: 0,
});
globalStyle(`${bottomDrawer} ${bottomDrawerContent}`, {
  padding: 0,
});

export { bottomDrawer, bottomDrawerContent, bottomDrawerHeader, label, option, options };

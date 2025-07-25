import { style, styleVariants } from '@vanilla-extract/css';

const closeIconBase = style({
  margin: '0.75rem',
  position: 'absolute',
});

const closeIcon = styleVariants({
  left: [closeIconBase, { left: '100%', top: 0 }],
  right: [closeIconBase, { right: '100%', top: 0 }],
  top: [closeIconBase, { left: 0, top: '100%' }],
  bottom: [closeIconBase, { bottom: '100%', left: 0 }],
});

const paperBase = style({
  background: 'var(--sys-color-background-paper)',
  boxShadow: 'var(--comp-drawer-boxShadow-default)',
  display: 'flex',
  overflow: 'visible',
});

const paper = styleVariants({
  left: [paperBase, { maxWidth: '312px', width: '80vw' }],
  right: [paperBase, { maxWidth: '312px', width: '80vw' }],
  top: [paperBase],
  bottom: [paperBase],
});

export { closeIcon, paper };

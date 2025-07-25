import { style, styleVariants } from '@vanilla-extract/css';

// TODO: Replace button variants with `@vanilla-extract/recipe` styles
const buttonBase = style({
  borderRadius: '50%',
  height: 0,
  minWidth: 'fit-content',
  paddingBottom: '50%',
  paddingTop: '50%',
});

const buttonSize = styleVariants({
  large: { paddingLeft: '0.75rem', paddingRight: '0.75rem' },
  medium: { paddingLeft: '0.5rem', paddingRight: '0.5rem' },
  small: { paddingLeft: '0.3125rem', paddingRight: '0.3125rem' },
});

const buttonVariant = styleVariants({
  contained: {},
  // Remove border width from padding
  outlined: { paddingTop: 'calc(50% - 1px)', paddingBottom: 'calc(50% - 1px)' },
  text: {},
});

const wrapper = style({
  display: 'inline-flex',
});

export { buttonBase, buttonSize, buttonVariant, wrapper };

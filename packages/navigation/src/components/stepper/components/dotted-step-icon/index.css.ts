import { globalStyle, style } from '@vanilla-extract/css';

const innerDot = style({
  background: 'currentColor',
  border: '1px solid var(--sys-color-neutral-dark)',
  borderRadius: 'var(--sys-shape-corner-full)',
  height: 'var(--comp-stepLabel-children-dottedIcon-innerDot-size-default)',
  width: 'var(--comp-stepLabel-children-dottedIcon-innerDot-size-default)',
});

const outerDot = style({
  alignItems: 'center',
  background: 'transparent',
  borderRadius: 'var(--sys-shape-corner-full)',
  display: 'flex',
  height: 'var(--comp-stepLabel-children-dottedIcon-outerDot-size-default)',
  justifyContent: 'center',
  width: 'var(--comp-stepLabel-children-dottedIcon-outerDot-size-default)',
});

globalStyle(`.BlueshiftStep-active ${outerDot}`, {
  background: 'var(--comp-stepLabel-children-dottedIcon-outerDot-color-active)',
});

export { innerDot, outerDot };

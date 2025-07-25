import { style } from '@vanilla-extract/css';

const typography = style({
  color: 'var(--sys-color-text-default)',
  fontWeight: 'var(--ref-typeface-weight-medium)',
});

const wrapper = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  fontWeight: 'var(--ref-typeface-weight-medium)',
  gap: '0.5rem',
  textAlign: 'center',
});

export { typography, wrapper };

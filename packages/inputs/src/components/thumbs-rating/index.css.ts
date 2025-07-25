import { globalStyle, style } from '@vanilla-extract/css';

const label = style({
  marginBottom: '0.5rem',
});

const wrapper = style({
  alignItems: 'center',
  display: 'inline-flex',
  flexDirection: 'row',
  gap: '1rem',
});

globalStyle(`${wrapper} button`, {
  borderColor: 'var(--sys-color-secondary-light)',
});

export { label, wrapper };

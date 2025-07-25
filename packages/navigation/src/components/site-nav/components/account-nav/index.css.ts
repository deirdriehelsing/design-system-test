import { style } from '@vanilla-extract/css';

const signInLink = style({
  backgroundSize: '0',
  color: 'var(--sys-color-text-link)',
  marginRight: '0.75rem',
});

const userName = style({
  marginRight: '0.5rem',
});

export { signInLink, userName };

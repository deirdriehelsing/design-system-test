import { globalStyle, style } from '@vanilla-extract/css';

const accountNavContainer = style({
  display: 'flex',
  flexShrink: 0,
  gap: '0.5rem',
  justifyContent: 'end',
  marginLeft: '0.5rem',
  marginRight: '-0.5rem',
});

const container = style({
  alignItems: 'center',
  display: 'flex',
  gap: '1rem',
  marginRight: '1rem',
  maxWidth: '42rem',
});

const searchBarContainer = style({
  width: '100%',
});

/* Global */

globalStyle(`${container} > form`, {
  flex: '1 0 7.5rem',
  maxWidth: '30rem',
  width: '100%',
});

export { accountNavContainer, container, searchBarContainer };

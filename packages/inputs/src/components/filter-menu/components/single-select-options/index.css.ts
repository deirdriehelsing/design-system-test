import { globalStyle, style } from '@vanilla-extract/css';

const label = style({
  padding: '2rem 1.5rem 1rem 1.5rem',
});

const list = style({
  padding: 0,
});

const root = style({
  alignItems: 'stretch',
  padding: 0,
});

globalStyle(`${list} .MuiListItemButton-root`, {
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  '@media': {
    ['(min-width: 490px)']: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
  },
});

export { label, list, root };

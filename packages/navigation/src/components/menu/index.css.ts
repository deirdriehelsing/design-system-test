import { globalStyle, style } from '@vanilla-extract/css';

const container = style({
  // Don't force menu triggers to be block elements
  display: 'inline',
});

const menu = style({});

globalStyle(`${menu} .MuiList-root`, {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '100%',
  '@media': {
    [`screen and (min-width: 768px)`]: {
      flexDirection: 'row',
    },
  },
});

globalStyle(`${menu} .MuiPaper-root`, {
  maxHeight: '100%',
});

const menuItems = style({
  display: 'flex',
  flexDirection: 'column',
});

globalStyle(`${menuItems} .MuiMenuItem-root`, {
  display: 'flex',
  gap: '0.5rem',
  justifyContent: 'space-between',
});

export { container, menu, menuItems };

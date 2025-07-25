import { globalStyle, style } from '@vanilla-extract/css';

const card = style({
  boxShadow: 'none',
  boxSizing: 'border-box',
  cursor: 'pointer',
  flex: 1,
  maxWidth: '16.5rem',
  position: 'relative',
  transitionDuration: '0.15s',
  transitionProperty: 'background-color, border-color',
  transitionTimingFunction: 'ease-in-out',
  width: '16.5rem',
  border: '2px solid var(--sys-color-neutral-light)',
});

const cardDisabled = style({
  backgroundColor: 'var(--sys-color-action-disabledBackground)',
  borderColor: 'var(--sys-color-neutral-light)',
  color: 'var(--sys-color-text-disabled)',
});

const cardSelected = style({});

const hiddenInput = style({
  position: 'absolute',
  visibility: 'hidden',
  zIndex: -1,
});

const iconButton = style({
  color: 'var(--ref-palette-secondary-main)',
  transition: 'color 0.15s ease-in-out',
});

const iconButtonImage = style([
  iconButton,
  {
    float: 'right',
    margin: '-1rem -0.5rem 0 0.5rem',
  },
]);

const iconButtonNoImage = style([
  iconButton,
  {
    padding: '0 0.625rem 0 0',
  },
]);

const image = style({
  display: 'block',
  height: '3.5rem',
  margin: '0.5rem',
  width: '3.5rem',
});

const label = style({
  fontWeight: '700',
});

const labelNoImage = style({
  marginTop: '0.125rem',
});

const textContent = style({
  alignItems: 'flex-start',
});

const radioHeader = style({
  alignItems: 'start',
  display: 'flex',
  width: '100%',
});

globalStyle(`${card} > .MuiButtonBase-root`, {
  boxSizing: 'border-box',
  padding: '1rem',
});

globalStyle(`${card} .MuiCardContent-root`, {
  padding: 0,
});

globalStyle(`${card} .MuiButtonBase-root.MuiCardActionArea-root`, {
  alignItems: 'start',
  display: 'flex',
});

globalStyle(`${card}:has(.MuiCardActionArea-root):hover`, {
  boxShadow: 'none',
});

globalStyle(`${card}:not(${cardDisabled}):hover`, {
  borderColor: 'var(--sys-color-secondary-main)',
  borderWidth: '2px',
});

globalStyle(`${card}:not(${cardDisabled}):hover > .MuiButtonBase-root`, {
  padding: 'calc(1rem - 1px)',
});

globalStyle(`${card}:hover ${iconButton}`, {
  color: 'var(--sys-color-secondary-main)',
});

globalStyle(`${cardSelected}:not(${cardDisabled})`, {
  backgroundColor: 'var(--ref-palette-surface-shade92)',
  borderColor: 'var(--ref-palette-neutral-shade70)',
});

globalStyle(`${cardSelected} ${iconButton}`, {
  color: 'var(--sys-color-secondary-main)',
});

export {
  card,
  cardDisabled,
  cardSelected,
  hiddenInput,
  iconButtonImage,
  iconButtonNoImage,
  image,
  label,
  labelNoImage,
  radioHeader,
  textContent,
};

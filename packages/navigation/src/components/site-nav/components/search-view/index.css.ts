import { globalStyle, style } from '@vanilla-extract/css';

const cancelButton = style({
  margin: '0.125rem 0',
});

const container = style({
  background: 'var(--ref-palette-primary-shade100)',
  boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, 0.1)',
  display: 'grid',
  gap: '1rem',
  height: 'calc(100vh - var(--comp-appBar-minHeight-small))',
  left: '0',
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: '0 1rem',
  paddingTop: '1.5rem',
  position: 'absolute',
  top: 'var(--comp-appBar-minHeight-small)',
  width: '100%',
  '@media': {
    '(min-width: 768px)': {
      height: 'calc(100vh - var(--comp-appBar-minHeight-default))',
      top: 'var(--comp-appBar-minHeight-default)',
    },
    '(min-width: 1040px)': {
      boxShadow: '0',
    },
  },
});

const search = style({
  color: 'var(--sys-color-text-link)', // so that cancel button inherits the color
  display: 'flex',
  gap: '0.5rem',
});

globalStyle(`${search} > *:first-child`, {
  flex: 1,
});

export { cancelButton, container, search };

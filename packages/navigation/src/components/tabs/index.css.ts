import { globalStyle, style } from '@vanilla-extract/css';

const container = style({
  width: '100%',
});

const content = style({
  padding: '1.5rem 0',
});

const header = style({
  borderBottom: '1px solid var(--sys-color-neutral-light)',
});

const label = style({
  fontWeight: 'var(--ref-typeface-weight-medium)',
  color: 'var(--sys-color-text-default)',
  padding: '0.5rem 1.25rem',
  textTransform: 'capitalize',
});

const tabs = style({
  color: 'var(--ref-palette-primary-shade10)',
  overflow: 'visible',
});

globalStyle(`${tabs} .Mui-selected`, {
  fontWeight: 'var(--ref-typeface-weight-bold)',
  color: 'var(--sys-color-text-default)',
});

globalStyle(`${tabs} .MuiTabs-indicator`, {
  backgroundColor: 'var(--sys-color-neutral-main)',
  fontWeight: 'var(--ref-typeface-weight-bold)',
  height: '4px',
  borderRadius: '6px',
  bottom: '-2px',
});

export { container, content, header, label, tabs };

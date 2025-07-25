import { style } from '@vanilla-extract/css';

const baseCard = style({
  backgroundColor: 'var(--sys-color-accent01-light)',
  borderRadius: 'var(--sys-shape-corner-medium)',
  boxShadow: 'var(--sys-color-accent01-main) 12px 12px',
  overflow: 'visible',
  padding: '6.25rem 1.5rem 4.75rem',
  width: '25.5rem',
});

const baseCardContent = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0',
  textAlign: 'center',
});

const container = style({
  display: 'flex',
  position: 'relative',
});

const description = style({
  color: 'var(--sys-color-primary-dark)',
});

const pin = style({
  left: '11.25rem',
  position: 'absolute',
  top: '-1rem',
});

const title = style({
  color: 'var(--sys-color-tertiary-dark)',
  fontFamily: 'Ovo, serif',
  fontWeight: 'var(--ref-typeface-weight-regular)',
  lineHeight: 'var(--sys-typescale-display-medium-lineHeight)',
  marginBottom: '1rem',
});

export { baseCard, baseCardContent, container, description, pin, title };

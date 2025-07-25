import { style } from '@vanilla-extract/css';

const tooltip = style({
  backgroundColor: 'var(--ref-palette-primary-shade100)',
  borderRadius: '1rem',
  border: '0.2rem solid var(--sys-color-primary-main)',
  padding: '0.5rem',
});

const tooltipInfo = style({
  color: 'var(--ref-palette-green-shade10)',
  fontSize: '0.75rem',
  fontWeight: 500,
});

const tooltipLabel = style({
  marginBottom: '0.5rem',
  fontSize: '0.75rem',
  fontWeight: 500,
});

const tooltipValue = style({
  fontSize: '0.875rem',
  fontWeight: 700,
});

export { tooltip, tooltipInfo, tooltipLabel, tooltipValue };

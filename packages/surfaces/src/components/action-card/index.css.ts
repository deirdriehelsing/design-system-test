import { createVar, globalStyle, style, styleVariants } from '@vanilla-extract/css';

/* Variables */

const imageHeight = createVar();
const imageWidth = createVar();
const defaultCardSize = '285px';

/* Styles */
const actions = style({
  padding: '0 0 24px 0',
  width: '100%',
});

const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  padding: '0',
  width: '100%',
});

const content = style({
  padding: '0',
  minWidth: defaultCardSize,
});

const headlineContainer = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  gap: '0.5rem',
  padding: '0',
});

const headline = style({
  fontWeight: 'var(--ref-typeface-weight-bold)',
  fontSize: '1.125rem',
  lineHeight: '1.625rem', // 26px
});

// Root element

const baseActionCard = style({
  alignContent: 'start',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem', // 8px
  padding: '24px 24px 0 24px ', // 24px
  width: '333px',
  vars: {
    [imageHeight]: '26px',
    [imageWidth]: '26px',
  },
});

const actionCardVariants = styleVariants({
  accent01: [
    baseActionCard,
    {
      background: 'var(--sys-color-surface-shade92)',
      outlineColor: 'var(--sys-color-accent01-dark)',
      svg: {
        color: 'var(--sys-color-accent01-dark)',
      },
    },
  ],
  accent02: [
    baseActionCard,
    {
      background: 'var(--sys-color-surface-shade95)',
      outlineColor: 'var(--sys-color-accent02-dark)',
      svg: {
        color: 'var(--sys-color-accent02-dark)',
      },
    },
  ],
  accent03: [
    baseActionCard,
    {
      background: 'var(--sys-color-surface-shade98)',
      outlineColor: 'var(--sys-color-accent03-dark)',
      svg: {
        color: 'var(--sys-color-accent03-dark)',
      },
    },
  ],
  accent04: [
    baseActionCard,
    {
      background: 'var(--sys-color-surface-shade96)',
      outlineColor: 'var(--sys-color-accent04-dark)',
      svg: {
        color: 'var(--sys-color-accent04-dark)',
      },
    },
  ],
  accent05: [
    baseActionCard,
    {
      background: 'var(--sys-color-surface-shade100)',
      outlineColor: 'var(--sys-color-accent05-dark)',
      svg: {
        color: 'var(--sys-color-accent05-dark)',
      },
    },
  ],
  default: [baseActionCard],
  error: [
    baseActionCard,
    {
      background: 'var(--sys-color-surface-shade99)',
      outlineColor: 'var(--sys-color-error-main)',
      svg: {
        color: 'var(--sys-color-error-main)',
      },
    },
  ],
  primary: [
    baseActionCard,
    {
      background: 'var(--sys-color-primary-light)',
      outlineColor: 'var(--sys-color-primary-main)',
      svg: {
        color: 'var(--sys-color-primary-main)',
      },
    },
  ],
  secondary: [
    baseActionCard,
    {
      background: 'var(--sys-color-secondary-light)',
      outlineColor: 'var(--sys-color-secondary-main)',
      svg: {
        color: 'var(--sys-color-secondary-main)',
      },
    },
  ],
  success: [
    baseActionCard,
    {
      background: 'var(--sys-color-surface-shade97)',
      outlineColor: 'var(--sys-color-success-main)',
      svg: {
        color: 'var(--sys-color-success-main)',
      },
    },
  ],
  tertiary: [
    baseActionCard,
    {
      background: 'var(--sys-color-surface-shade94)',
      outlineColor: 'var(--sys-color-tertiary-main)',
      svg: {
        color: 'var(--sys-color-tertiary-main)',
      },
    },
  ],
  warning: [
    baseActionCard,
    {
      background: 'var(--sys-color-surface-shade98)',
      outlineColor: 'var(--sys-color-warning-main)',
      svg: {
        color: 'var(--sys-color-warning-main)',
      },
    },
  ],
  neutral: [baseActionCard, {}],
});

/* Global styles */

globalStyle(`${content} p`, {
  margin: 0,
});

globalStyle(`${actions} > *`, {
  borderColor: 'var(--ref-palette-secondary-shade05)',
  color: 'var(--ref-palette-secondary-shade05)',
});

globalStyle(`${actions} button`, {
  color: 'var(--sys-color-text-default)',
});

export { actions, actionCardVariants, content, contentContainer, headline, headlineContainer };

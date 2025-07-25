import { style } from '@vanilla-extract/css';

const checkContainer = style({
  backgroundColor: 'var(--sys-color-success-light)',
  borderRadius: '50%',
  height: '1.25rem',
  position: 'relative',
  width: '1.25rem',
});

const checkSvg = style({
  selectors: {
    [`${checkContainer} &`]: {
      color: 'var(--sys-color-text-default)',
      height: '0.75rem',
      width: '0.75rem',
    },
  },
});

const iconContainer = style({});

const showOnMobile = style({
  selectors: {
    [`${iconContainer} &`]: {
      display: 'none',
      '@media': {
        'screen and (max-width: 767px)': {
          display: 'block',
        },
      },
    },
    [`${iconContainer} ${checkContainer}&`]: {
      '@media': {
        'screen and (max-width: 767px)': {
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        },
      },
    },
  },
});

const showOnDesktop = style({
  selectors: {
    [`${iconContainer} &`]: {
      display: 'none',
      '@media': {
        'screen and (min-width: 768px)': {
          display: 'block',
        },
      },
    },
  },
});

export { checkContainer, checkSvg, iconContainer, showOnMobile, showOnDesktop };

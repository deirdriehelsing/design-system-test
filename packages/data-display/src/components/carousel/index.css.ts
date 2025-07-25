import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

const activeButtonStyles = {
  border: '1px solid var(--sys-color-secondary-main)',
  boxShadow: '0px 0.125rem 0px var(--sys-color-secondary-main)',
  transform: 'translateY(-0.125rem)',
};

const button = style({
  backgroundColor: 'var(--ref-palette-surface-shade100)',
  border: '1px solid var(--sys-color-secondary-main)',
  color: 'var(--sys-color-secondary-main)',
  transition: `
    transform 300ms var(--sys-motion-easing-emphasizedDecelerate),
    box-shadow 300ms var(--sys-motion-easing-emphasizedDecelerate)
  `,
  ':focus': {
    ...activeButtonStyles,
    backgroundColor: 'var(--sys-color-secondary-light)',
  },
  ':hover': {
    ...activeButtonStyles,
    backgroundColor: 'var(--ref-palette-surface-shade100)',
    boxShadow: '0px 0.25rem 0px var(--sys-color-secondary-main)',
    transform: 'translateY(-0.25rem)',
  },
  ':active': activeButtonStyles,
  ':target': activeButtonStyles,
  ':disabled': {
    borderColor: 'var(--sys-color-action-disabled)',
    color: 'var(--sys-color-action-disabled)',
  },
});

const container = style({
  margin: 0,
  maxWidth: '100%',
  padding: 0,
  position: 'relative',
});

const containerWithNavigation = style({
  display: 'flex',
  gap: '0.5rem',
});

const description = style({
  marginTop: '0.35rem',
});

const headerBase = style({
  alignItems: 'center',
  display: 'flex',
  gap: '1rem',
  justifyContent: 'end',
  margin: '1rem 0',
});
const header = styleVariants({
  large: [
    headerBase,
    {
      marginBottom: '3rem',
    },
  ],
  small: [headerBase],
});

const heading = style({
  color: 'var(--sys-color-text-default)',
  display: 'inline-flex',
  flexDirection: 'column',
  flexGrow: 1,
});

const navigationButtonContainer = style({
  alignItems: 'center',
  display: 'flex',
  flex: 0,
  justifyContent: 'center',
});

const swiperBase = style({
  display: 'flex !important',
  flexDirection: 'column',
  maxWidth: '100%',
});

const swiper = styleVariants({
  large: [swiperBase],
  small: [
    swiperBase,
    {
      paddingBottom: '2.5rem !important',
    },
  ],
});

const swiperSlide = style({
  display: 'flex !important',
  height: 'auto !important',
  textAlign: 'center',
  width: 'unset !important',
});

/* Global: */

globalStyle(
  `:not(${containerWithNavigation}) ${swiper.large}, :not(${containerWithNavigation}) ${swiper.small}`,
  {
    overflow: 'visible !important', // Needs `!important` to trump inconsistent style load order
  }
);

globalStyle(`${heading} a`, {
  color: 'var(--sys-color-text-default)',
});

globalStyle(`${heading} a:not(.MuiLink-root)`, {
  textDecoration: 'underline',
  textDecorationThickness: '0.07em',
  textUnderlineOffset: '0.115em',
});

globalStyle(`${heading} p:first-of-type`, {
  marginTop: 0,
});

globalStyle(`${heading} p:last-of-type`, {
  marginBottom: 0,
});

globalStyle(`${swiper.small} .swiper-pagination-bullet`, {
  backgroundColor: 'var(--ref-palette-secondary-shade50)',
  margin: '0 0.38rem !important',
  opacity: 1,
});

globalStyle(`${swiper.small} .swiper-pagination-bullet-active`, {
  backgroundColor: 'var(--ref-palette-secondary-shade10)',
  transform: 'scale(1.5)',
});

export {
  button,
  container,
  containerWithNavigation,
  description,
  header,
  heading,
  navigationButtonContainer,
  swiper,
  swiperSlide,
};

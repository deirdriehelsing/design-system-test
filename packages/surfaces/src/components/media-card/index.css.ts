import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

// Shared styles

const underlineStyles = {
  background: 'linear-gradient(to right, currentColor 100%, transparent 100%)',
  backgroundPosition: '0% calc(100% - 0.175rem)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '0% var(--sys-shape-thickness-small)',
  display: 'unset !important',
  transition: 'background-size 0.15s ease-in-out',
};

const hoverStyles = {
  backgroundSize: '100% var(--sys-shape-thickness-small)',
};

// Root element

const mediaCard = style({
  border: 'var(--sys-shape-border-card)',
  borderRadius: '16px',
  minHeight: '22.5rem',
  outline: 'none',
  width: '19.5rem',
});

//

const action = style({
  alignItems: 'center',
  display: 'flex',
  gap: '0.5rem',
  margin: '0 !important',
});

globalStyle(`${action} > .MuiLink-root`, {
  ...underlineStyles,
});

globalStyle(`${action} > .MuiLink-root:hover`, {
  ...hoverStyles,
});

globalStyle(`${action} > .MuiLink-root::after`, {
  display: 'none',
});

const actionSkeleton = style({
  width: '50% !important',
});

const actionDetailSkeleton = style({
  marginBottom: '0.5rem',
  width: '70% !important',
});

const content = style({
  minHeight: '8.5rem',
});

const description = style({
  margin: '1rem 0',
});

globalStyle(`${description} > p:first-of-type`, {
  marginTop: 0,
});

globalStyle(`${description} > p:last-of-type`, {
  marginBottom: 0,
});

const descriptionSkeleton = style({
  fontSize: '2.2rem',
  marginBottom: '1.25rem',
});

const tag = style({
  alignItems: 'center',
  borderRadius: '4px',
  gap: '0.25rem',
  maxWidth: 'max-content',
  padding: '0.25rem 0.5rem',
});

globalStyle(`${tag} > svg`, {
  height: '1.25rem',
  width: '1.25rem',
  fontSize: '1rem',
});

const thumbnail = style({
  backgroundColor: 'var(--sys-color-background-default)',
  height: 'var(--comp-mediaCard-thumbnail-height)',
  width: 'var(--comp-mediaCard-thumbnail-width)',
});

const title = style({
  ...underlineStyles,
  margin: '1rem 0',
  selectors: {
    [`.MuiCardActionArea-root:hover > ${content} > &`]: {
      ...hoverStyles,
    },
  },
});

const titleSkeleton = style({
  marginBottom: '0.5rem',
  width: '50%',
});

const mediaCardVariants = styleVariants({
  accent01: [mediaCard, { borderColor: 'var(--ref-palette-accent01-shade40)' }],
  accent02: [mediaCard, { borderColor: 'var(--ref-palette-accent02-shade40)' }],
  accent03: [mediaCard, { borderColor: 'var(--ref-palette-accent03-shade40)' }],
  accent04: [mediaCard, { borderColor: 'var(--ref-palette-accent04-shade40)' }],
  empty: [
    mediaCard,
    {
      borderColor: 'var(--ref-palette-primary-shade30)',
      borderStyle: 'dashed',
    },
  ],
});

const tagVariants = styleVariants({
  accent01: [tag, { backgroundColor: 'var(--ref-palette-accent01-shade70)' }],
  accent02: [tag, { backgroundColor: 'var(--ref-palette-accent02-shade70)' }],
  accent03: [tag, { backgroundColor: 'var(--ref-palette-accent03-shade70)' }],
  accent04: [tag, { backgroundColor: 'var(--ref-palette-accent04-shade70)' }],
  empty: [tag, { backgroundColor: 'var(--ref-palette-primary-shade70)' }],
});

//

export {
  action,
  actionDetailSkeleton,
  actionSkeleton,
  content,
  description,
  descriptionSkeleton,
  mediaCard,
  mediaCardVariants,
  tag,
  tagVariants,
  thumbnail,
  title,
  titleSkeleton,
};

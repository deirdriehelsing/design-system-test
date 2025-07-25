import { createVar, globalStyle, style, styleVariants } from '@vanilla-extract/css';

/* Variables */

const actionsHeight = createVar();
const imageHeight = createVar();
const imageWidth = createVar();

/* Styles */

const baseActionArea = style({
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridTemplateRows: `${imageHeight} 100fr`,
  '@media': {
    ['(min-width: 768px)']: {
      gridTemplateColumns: `${imageWidth} auto`,
      gridTemplateRows: `auto ${actionsHeight}`,
      gridAutoFlow: 'column',
      gridColumn: '1 / 3',
      gridRow: '1 / 3',
    },
  },
  vars: {
    [actionsHeight]: '5.5rem', // 88px
    [imageHeight]: '6.25rem', // 100px
    [imageWidth]: '15.625rem', // 250px
  },
});

const actionAreaDirection = styleVariants({
  vertical: [baseActionArea],
  horizontal: [
    baseActionArea,
    {
      '@media': {
        ['(min-width: 1040px)']: {
          gridTemplateColumns: `${imageWidth} 70fr`,
          gridTemplateRows: '100fr',
          vars: {
            [imageWidth]: '30fr',
          },
        },
      },
    },
  ],
});

const actionArea = baseActionArea;

const actions = style({
  flexGrow: 0,
  padding: '1.5rem',
  '@media': {
    ['(min-width: 1040px)']: {
      alignSelf: 'center',
    },
  },
  selectors: {
    [`${actionArea} ~ &`]: {
      '@media': {
        ['(min-width: 768px)']: {
          gridColumn: '2',
          gridRow: '2',
        },
        ['(min-width: 1040px)']: {
          gridColumn: '3',
          gridRow: '1',
        },
      },
    },
  },
});

const content = style({
  minWidth: 0,
  padding: '1.5rem',
  paddingBottom: 0,
  '@media': {
    ['(min-width: 768px)']: {
      display: 'flex',
      gridColumn: '2',
      gridRow: '1',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    ['(min-width: 1040px)']: {
      paddingBottom: '1.5rem',
    },
  },
});

const image = style({
  selectors: {
    '&&': {
      // more important than Image.container
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
  },
});

const baseImageContainer = style({
  alignSelf: 'flex-start',
  flexShrink: 0,
  height: '6.25rem', // 100px
  width: '100%',
  '@media': {
    ['(min-width: 768px)']: {
      gridColumn: '1',
      gridRow: '1 / 3',
      height: '100%',
      width: '15.625rem', // 250px
    },
  },
});

const imageContainerDirection = styleVariants({
  vertical: [baseImageContainer],
  horizontal: [
    baseImageContainer,
    {
      '@media': {
        ['(min-width: 1040px)']: {
          gridColumn: '1',
          gridRow: 'unset',
          width: '100%',
        },
      },
    },
  ],
});

const basePitch = style({
  // TODO: replace with standard type variant
  color: 'var(--ref-palette-secondary-shade05)',
  fontWeight: 'var(--ref-typeface-weight-regular)',
  lineHeight: '2rem',
});

const pitchVariants = styleVariants({
  amethyst: [
    basePitch,
    {
      color: 'var(--ref-palette-secondary-shade100)',
    },
  ],
  coral: [basePitch],
  default: [basePitch],
  gold: [basePitch],
});

const baseHeadline = style({
  color: 'var(--ref-palette-secondary-shade05)',
  fontWeight: 'var(--ref-typeface-weight-bold)',
  lineHeight: '2rem',
  selectors: {
    [`&:has(${basePitch})`]: {
      '@media': {
        ['(min-width: 1040px)']: {
          WebkitLineClamp: 1,
          lineClamp: 1,
        },
      },
    },
  },
});

const headlineVariants = styleVariants({
  amethyst: [
    baseHeadline,
    {
      color: 'var(--ref-palette-secondary-shade100)',
    },
  ],
  coral: [baseHeadline],
  default: [baseHeadline],
  gold: [baseHeadline],
});

// Root element
const baseMerchandisingCard = style({
  display: 'grid',
  gridTemplateColumns: '100fr',
  gridTemplateRows: `${imageHeight} auto auto`,
  gridAutoFlow: 'row',
  height: 'fit-content',
  '@media': {
    ['(min-width: 768px)']: {
      gridTemplateColumns: `${imageWidth} auto`,
      gridTemplateRows: 'auto auto',
      gridAutoFlow: 'column',
    },
  },
  selectors: {
    [`&:has(${actionArea})`]: {
      gridTemplateRows: 'auto auto',
    },
  },
  vars: {
    [imageHeight]: '6.25rem',
    [imageWidth]: '15.625rem',
  },
});

const merchandisingCardDirection = styleVariants({
  horizontal: [
    baseMerchandisingCard,
    {
      '@media': {
        ['(min-width: 1040px)']: {
          gridTemplateColumns: '30fr 70fr',
          gridTemplateRows: '100fr',
        },
      },
      selectors: {
        [`&:has(${actionArea})`]: {
          '@media': {
            ['(min-width: 1040px)']: {
              gridTemplateColumns: '30fr 100fr auto',
              gridTemplateRows: '100fr',
            },
          },
        },
      },
    },
  ],
  vertical: [baseMerchandisingCard],
});

const merchandisingCardColorVariants = styleVariants({
  amethyst: [
    {
      backgroundColor: 'var(--ref-palette-surface-shade79)',
    },
  ],
  coral: [
    {
      backgroundColor: 'var(--ref-palette-surface-shade81)',
    },
  ],
  default: [],
  gold: [
    {
      backgroundColor: 'var(--ref-palette-surface-shade80)',
    },
  ],
});

/* Global styles */

globalStyle(`${content} p`, {
  margin: 0,
});

globalStyle(`${actions} *`, {
  borderColor: 'var(--ref-palette-secondary-shade05)',
  color: 'var(--ref-palette-secondary-shade05)',
});

export {
  actions,
  actionArea,
  actionAreaDirection,
  content,
  headlineVariants,
  image,
  imageContainerDirection,
  merchandisingCardDirection,
  merchandisingCardColorVariants,
  pitchVariants,
};

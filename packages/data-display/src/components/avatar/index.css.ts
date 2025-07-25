import { style, styleVariants } from '@vanilla-extract/css';

const avatar = styleVariants({
  small: {
    borderWidth: '1px',
    fontSize: 'var(--comp-avatar-fontSize-small)',
    fontWeight: 'var(--comp-avatar-fontWeight-default)',
    height: 'var(--comp-avatar-size-small)',
    width: 'var(--comp-avatar-size-small)',
  },
  large: {
    borderWidth: '2px',
    fontSize: 'var(--comp-avatar-fontSize-medium)',
    fontWeight: 'var(--comp-avatar-fontWeight-default)',
    height: 'var(--comp-avatar-size-medium)',
    width: 'var(--comp-avatar-size-medium)',
    '@media': {
      [`screen and (min-width: 768px)`]: {
        fontSize: 'var(--comp-avatar-fontSize-large)',
        height: 'var(--comp-avatar-size-large)',
        width: 'var(--comp-avatar-size-large)',
      },
    },
  },
});

const avatarBackground = styleVariants({
  royalBlue: {
    backgroundColor: 'var(--comp-avatar-backgroundColor-royalBlue)',
  },
  coral: {
    backgroundColor: 'var(--comp-avatar-backgroundColor-coral)',
  },
  seafoam: {
    backgroundColor: 'var(--comp-avatar-backgroundColor-seafoam)',
  },
  goldenrod: {
    backgroundColor: 'var(--comp-avatar-backgroundColor-goldenrod)',
  },
});

const avatarBorder = styleVariants({
  gold: {
    backgroundColor: 'var(--ref-palette-surface-shade100)',
    borderColor: 'var(--comp-avatar-borderColor-gold)',
    borderStyle: 'solid',
    color: 'var(--comp-avatar-borderColor-gold)',
  },
  green: {
    backgroundColor: 'var(--ref-palette-surface-shade100)',
    borderColor: 'var(--comp-avatar-borderColor-green)',
    borderStyle: 'solid',
    color: 'var(--comp-avatar-borderColor-green)',
  },
  brick: {
    backgroundColor: 'var(--ref-palette-surface-shade100)',
    borderColor: 'var(--comp-avatar-borderColor-brick)',
    borderStyle: 'solid',
    color: 'var(--comp-avatar-borderColor-brick)',
  },
  amethyst: {
    backgroundColor: 'var(--ref-palette-surface-shade100)',
    borderColor: 'var(--comp-avatar-borderColor-amethyst)',
    borderStyle: 'solid',
    color: 'var(--comp-avatar-borderColor-amethyst)',
  },
});

const rounded = style({
  borderRadius: 'var(--sys-shape-corner-small)',
});

const figure = style({
  // Override useragent defaults
  margin: '0',
});

const subtitle = style({
  marginLeft: '0.5rem',
});

export { avatar, avatarBackground, avatarBorder, figure, rounded, subtitle };

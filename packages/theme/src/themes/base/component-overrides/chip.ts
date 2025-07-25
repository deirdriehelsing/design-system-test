import type { ComponentOverride, Tokens } from '../../../types';
import type { ChipProps } from '@blueshift-ui/core/dist/types';

import getVariantPaletteColors from '../../../helpers/get-variant-palette-colors';

const colors = [
  'accent01',
  'accent02',
  'accent03',
  'accent04',
  'error',
  'info',
  'primary',
  'secondary',
  'success',
  'warning',
];

function chipOverrides(tokens: Tokens): ComponentOverride<'MuiChip'> {
  type PaletteColor = keyof Omit<typeof tokens.ref.palette, 'surface' | 'tertiary'>;

  return {
    MuiChip: {
      defaultProps: {
        color: 'secondary',
        size: 'medium',
        variant: 'outlined',
      },
      styleOverrides: {
        root({ ownerState: { color = 'primary' } }) {
          const isAccent = color.startsWith('accent');
          const paletteColors = getVariantPaletteColors({ color, tokens });
          const outlineColor = isAccent ? paletteColors.shade60 : paletteColors.shade05;
          const outlineColorActive = isAccent ? paletteColors.shade40 : paletteColors.shade05;

          return {
            border: 'none', // Borders are handled using outlines to avoid content shifting
            borderRadius: tokens.comp.chip.borderRadius.default,
            color: tokens.ref.palette.secondary.shade05,
            fontSize: tokens.sys.typescale.body.small.size,
            fontWeight: tokens.ref.typeface.weight.medium,
            outline: `1px solid ${outlineColor}`,
            // Defining here for extra specificity
            '&.MuiChip-clickable:active, &.MuiChip-clickable:hover, &.MuiChip-deletable:active, &.MuiChip-deletable:hover':
              {
                backgroundColor: isAccent
                  ? paletteColors.shade95
                  : tokens.ref.palette.surface.shade93,
                outline: `2px solid ${outlineColorActive}`,
              },
            '&.Mui-disabled': {
              outline: `1px solid ${tokens.sys.color.action.disabled}`,
              backgroundColor: tokens.sys.color.action.disabledBackground,
              color: tokens.sys.color.action.disabled,
            },
          };
        },
        deleteIcon: {
          color: tokens.sys.color.secondary.main,
          marginLeft: '-0.75rem',
          marginRight: '1rem',
        },
        filled({ ownerState: { color = 'primary' } }) {
          const paletteColors = getVariantPaletteColors({ color, tokens });

          return {
            backgroundColor: paletteColors.shade90,
          };
        },
        icon: {
          color: tokens.ref.palette.secondary.shade05,
          marginLeft: '1rem',
          marginRight: '-0.75rem',
        },
        labelLarge: {
          // Large chips are large enough to allow up to two lines of text
          display: '-webkit-box',
          fontSize: tokens.sys.typescale.body.medium.size,
          fontWeight: tokens.sys.typescale.body.medium.weight,
          maxWidth: '10rem',
          paddingLeft: tokens.comp.chip.horizontalPadding.large,
          paddingRight: tokens.comp.chip.horizontalPadding.large,
          textAlign: 'center',
          textWrap: 'wrap',
          webkitLineClamp: '2',
          webkitBoxOrient: 'vertical',
        },
        labelMedium: {
          paddingLeft: tokens.comp.chip.horizontalPadding.default,
          paddingRight: tokens.comp.chip.horizontalPadding.default,
        },
        labelSmall: {
          paddingLeft: tokens.comp.chip.horizontalPadding.small,
          paddingRight: tokens.comp.chip.horizontalPadding.small,
        },
        outlined({ ownerState: { color = 'primary' } }) {
          const paletteColors = getVariantPaletteColors({ color, tokens });

          return {
            backgroundColor: paletteColors.shade100,
            '& ~ .MuiBadge-anchorOriginBottomLeft, & ~ .MuiBadge-anchorOriginTopLeft': {
              // Account for chip outline
              left: '-1px',
            },
            '& ~ .MuiBadge-anchorOriginBottomRight, & ~ .MuiBadge-anchorOriginTopRight': {
              // Account for chip outline
              right: '-1px',
            },
          };
        },
        sizeLarge: {
          height: tokens.comp.chip.height.large,
        },
        sizeMedium: {
          height: tokens.comp.chip.height.default,
        },
        sizeSmall: {
          height: tokens.comp.chip.height.small,
        },
      },
      variants: [
        {
          props: { variant: 'link' },
          style: {
            backgroundColor: tokens.comp.chip.backgroundColor.link,
            borderRadius: tokens.comp.chip.borderRadius.link,
            fontSize: tokens.comp.chip.fontSize.link,
            height: 'auto',
            outline: '2px solid',
            padding: '0.5rem 1.25rem',
            '& .MuiChip-label': {
              padding: 0,
            },
          },
        },
        ...colors.map((color) => ({
          props: {
            variant: 'link' as ChipProps['variant'],
            color: color as ChipProps['color'],
          },
          style: {
            backgroundColor: tokens.ref.palette[color as PaletteColor]?.shade80,
            outlineColor: tokens.ref.palette[color as PaletteColor]?.shade80,
            '&.MuiChip-root:hover': {
              backgroundColor: tokens.ref.palette[color as PaletteColor]?.shade100,
              outlineColor: tokens.ref.palette[color as PaletteColor]?.shade30,
            },
            '&.MuiChip-root:focus': {
              backgroundColor: tokens.ref.palette[color as PaletteColor]?.shade80,
              outline: '1px solid',
              outlineColor: tokens.ref.palette[color as PaletteColor]?.shade30,
            },
          },
        })),
        ...colors.map((color) => {
          const defaultOutlineColor =
            color === 'accent01'
              ? tokens.sys.color.neutral.main
              : tokens.ref.palette[color as PaletteColor]?.shade05;
          const hoverOutlineColor =
            color === 'accent01'
              ? tokens.sys.color.neutral.dark
              : tokens.ref.palette[color as PaletteColor]?.shade10;
          const focusOutlineColor =
            color === 'accent01'
              ? tokens.sys.color.neutral.main
              : tokens.ref.palette[color as PaletteColor]?.shade40;

          return {
            props: {
              variant: 'outlined' as ChipProps['variant'],
              color: color as ChipProps['color'],
            },
            style: {
              outlineColor: defaultOutlineColor,
              '&.MuiChip-clickable:hover': {
                backgroundColor: tokens.ref.palette[color as PaletteColor]?.shade80,
                outlineColor: hoverOutlineColor,
              },
              '&.MuiChip-clickable:focus': {
                backgroundColor: tokens.ref.palette[color as PaletteColor]?.shade70,
                outline: '1px solid',
                outlineColor: focusOutlineColor,
              },
            },
          };
        }),
      ],
    },
  };
}

export default chipOverrides;

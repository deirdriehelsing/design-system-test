import type { ComponentOverride, SystemColor, Tokens } from '../../../types';
import type { ButtonProps } from '@mui/material';

import getVariantPaletteColors from '../../../helpers/get-variant-palette-colors';
import getVariantSystemColors from '../../../helpers/get-variant-system-colors';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    blob: true;
  }
}

interface GetColorParams {
  color: SystemColor | 'inherit' | 'default';
  paletteColors: ReturnType<typeof getVariantPaletteColors>;
  systemColors: ReturnType<typeof getVariantSystemColors>;
  tokens: Tokens;
  variant: string;
}

function getContrastBackgroundColor({
  color,
  paletteColors,
  systemColors,
  tokens,
  variant,
}: GetColorParams) {
  if (color === 'inherit') {
    return ['outlined', 'text'].includes(variant)
      ? 'transparent'
      : tokens.ref.palette.surface.shade100;
  }

  if (color === 'default') {
    return tokens.ref.palette.surface.shade100;
  }

  if (color === 'secondary' && variant === 'contained') {
    return tokens.sys.color.secondary.main;
  }

  if (['outlined', 'text'].includes(variant)) {
    return variant === 'text' ? 'transparent' : paletteColors.shade100;
  }

  return systemColors.main;
}

function getContrastBorderColor({ color, systemColors, tokens, variant }: GetColorParams) {
  if (variant === 'outlined') {
    return color === 'inherit'
      ? tokens.ref.palette.surface.shade100
      : tokens.sys.color.neutral.dark;
  }

  return 'unset';
}

function getContrastTextColor({
  color,
  paletteColors,
  systemColors,
  tokens,
  variant,
}: GetColorParams) {
  if (color === 'inherit') {
    return ['outlined', 'text'].includes(variant)
      ? tokens.sys.color.text.default
      : tokens.ref.palette.secondary.shade10;
  }

  if (variant === 'outlined') {
    return tokens.sys.color.neutral.dark;
  }

  if (color === 'default') {
    return tokens.sys.color.text.default;
  }

  if (variant === 'contained') {
    if (
      color === 'accent01' ||
      color === 'accent02' ||
      color === 'accent03' ||
      color === 'accent04' ||
      color === 'secondary' ||
      color === 'primary'
    ) {
      return tokens.sys.color[color].contrastText;
    }

    return paletteColors.shade100;
  }

  return systemColors.main;
}

function buttonOverrides(tokens: Tokens): ComponentOverride<'MuiButton'> {
  return {
    MuiButton: {
      defaultProps: {
        focusRipple: false,
        variant: 'contained',
      },
      styleOverrides: {
        root({ ownerState, ownerState: { color = 'primary', variant = 'contained' }, theme }) {
          const paletteColors = getVariantPaletteColors({ color, tokens });
          const systemColors = getVariantSystemColors({ color, tokens });

          const colorArgs = { color, paletteColors, systemColors, tokens, variant };
          const contrastBackgroundColor = getContrastBackgroundColor(colorArgs);
          const contrastBorderColor = getContrastBorderColor(colorArgs);
          const contrastTextColor = getContrastTextColor(colorArgs);

          return {
            borderColor: contrastBorderColor,
            borderRadius: tokens.comp.button.borderRadius.default,
            backgroundColor: contrastBackgroundColor,
            boxShadow: tokens.comp.button.boxShadow.default,
            color: contrastTextColor,
            height: tokens.comp.button.height.default,
            paddingLeft: tokens.comp.button.horizontalPadding.default,
            paddingRight: tokens.comp.button.horizontalPadding.default,
            textTransform: 'none',
            transition: theme.transitions.create(['background-color', 'box-shadow', 'transform'], {
              duration: theme.transitions.duration.standard,
              easing: tokens.sys.motion.easing.emphasizedDecelerate,
            }),
            '&:focus': {
              boxShadow: tokens.comp.button.boxShadow.default,
              transform: tokens.comp.button.transform.focus,
            },
            '&:focus-visible': {
              // All color variants use the same outline color
              outlineColor: tokens.ref.palette.secondary.shade20,
              outlineWidth: tokens.comp.button.outlineWidth,
            },
            // Expand button area so it doesn't move away from cursor when translating on hover.
            // Without this it'll loop between hover and un-hovered states and flicker.
            '&:before': {
              bottom: 0,
              content: '""',
              left: 0,
              position: 'absolute',
              right: 0,
              top: 0,
              transition: theme.transitions.create(['bottom'], {
                duration: theme.transitions.duration.standard,
                easing: tokens.sys.motion.easing.emphasizedDecelerate,
              }),
            },
            '&:hover': {
              backgroundColor: contrastBackgroundColor,
              borderColor: contrastBorderColor,
              boxShadow: tokens.comp.button.boxShadow.hover,
              transform: tokens.comp.button.transform.hover,
              '&:before': {
                bottom: `-${tokens.comp.button.offsetSize.default}`,
              },
            },
            '&:active, &:target': {
              boxShadow: tokens.comp.button.boxShadow.active,
              transform: tokens.comp.button.transform.active,
            },
            '&:disabled': {
              // All color variants use the same colors for the disabled state
              backgroundColor: tokens.sys.color.action.disabledBackground,
              color: tokens.sys.color.action.disabled,
            },
          };
        },
        sizeSmall: {
          height: tokens.comp.button.height.small,
          paddingLeft: tokens.comp.button.horizontalPadding.small,
          paddingRight: tokens.comp.button.horizontalPadding.small,
        },
      },
      variants: [
        {
          props: {
            variant: 'blob',
          },
          style({ theme }) {
            return {
              backgroundColor: 'transparent',
              color: tokens.sys.color.text.link,
              fontSize: tokens.comp.button.blob.fontSize.default,
              minHeight: tokens.comp.button.blob.minHeight.default,
              textDecoration: 'underline',
              '.MuiButton-startIcon': {
                marginRight: tokens.comp.button.blob.margin.default,
                '.blob': {
                  alignItems: 'center',
                  backgroundColor: tokens.sys.color.secondary.light,
                  color: tokens.sys.color.secondary.main,
                  display: 'flex',
                  fontSize: tokens.comp.button.blob.iconSize.default,
                  height: tokens.comp.button.blob.blobSize.default,
                  justifyContent: 'center',
                  svg: {
                    width: tokens.comp.button.blob.iconSize.default,
                    height: tokens.comp.button.blob.iconSize.default,
                  },
                  transition: [
                    theme.transitions.create(['background-color', 'border-color', 'color'], {
                      duration: theme.transitions.duration.standard,
                    }),
                    theme.transitions.create(['box-shadow', 'transform'], {
                      duration: theme.transitions.duration.standard,
                      easing: tokens.sys.motion.easing.emphasizedDecelerate,
                    }),
                  ].join(','),
                  width: tokens.comp.button.blob.blobSize.default,
                },
              },
              '&:active, &:focus, &:hover': {
                boxShadow: 'none',
                backgroundColor: 'transparent',
                textDecoration: 'underline',
                transform: 'none',
              },
              '&:focus .blob': {
                boxShadow: tokens.comp.button.boxShadow.focus,
                transform: tokens.comp.button.transform.focus,
              },
              '&:hover .blob': {
                backgroundColor: tokens.sys.color.secondary.main,
                boxShadow: tokens.comp.button.boxShadow.hover,
                color: tokens.ref.palette.primary.shade100,
                transform: tokens.comp.button.transform.hover,
              },
              '&:active .blob': {
                boxShadow: tokens.comp.button.boxShadow.active,
                transform: tokens.comp.button.transform.active,
              },
              '.MuiTouchRipple-root': {
                visibility: 'hidden',
              },
            };
          },
        },
        {
          props: {
            'data-orientation': 'stacked',
            variant: 'blob',
          } as ButtonProps,
          style({ theme }) {
            return {
              flexDirection: 'column' as const,
              minHeight: tokens.comp.button.blob.minHeight.column,
              '.MuiButton-startIcon': {
                marginRight: '0',
                '.blob': {
                  marginBottom: tokens.comp.button.blob.margin.default,
                },
              },
            };
          },
        },
        {
          props: {
            size: 'small',
            variant: 'blob',
          },
          style: {
            minHeight: tokens.comp.button.blob.minHeight.rowSmall,
            '.MuiButton-startIcon .blob': {
              fontSize: tokens.comp.button.blob.iconSize.small,
              height: tokens.comp.button.blob.blobSize.small,
              svg: {
                width: tokens.comp.button.blob.iconSize.small,
                height: tokens.comp.button.blob.iconSize.small,
              },
              width: tokens.comp.button.blob.blobSize.small,
            },
          },
        },
        {
          props: {
            'data-orientation': 'stacked',
            size: 'small',
            variant: 'blob',
          } as ButtonProps,
          style: {
            minHeight: tokens.comp.button.blob.minHeight.columnSmall,
          },
        },
      ],
    },
  };
}

export default buttonOverrides;

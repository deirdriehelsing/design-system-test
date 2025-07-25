import type { ComponentOverride, Tokens } from '../../../types';
import type { TooltipProps } from '@blueshift-ui/core';

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
] as NonNullable<TooltipProps['color']>[];

function tooltipOverrides(tokens: Tokens): ComponentOverride<'MuiTooltip'> {
  return {
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        color: 'secondary',
      },
      styleOverrides: {
        tooltip: {
          boxShadow: tokens.comp.tooltip.boxShadow.active,
          borderRadius: tokens.comp.tooltip.borderRadius.default,
          color: tokens.sys.color.primary.contrastText,
          paddingBottom: tokens.comp.tooltip.verticalPadding.default,
          paddingLeft: tokens.comp.tooltip.horizontalPadding.default,
          paddingRight: tokens.comp.tooltip.horizontalPadding.default,
          paddingTop: tokens.comp.tooltip.verticalPadding.default,
          fontFamily: tokens.ref.typeface.brand,
          lineHeight: tokens.comp.tooltip.font.lineHeight,
          fontSize: tokens.comp.tooltip.font.size,
          fontWeight: tokens.comp.tooltip.font.weight,
          display: 'flex',
          alignItems: 'center',
          variants: [
            ...colors.map((color) => {
              // TODO: varsity.atlassian.net/browse/KZN-1867 - [FE] Enforce the semantic usage of the design tokens system
              let backgroundColor;
              let colorTokens;
              if (color === 'info') {
                colorTokens = tokens.sys.color.neutral;
                backgroundColor = colorTokens.dark;
              } else {
                colorTokens = tokens.sys.color[color];
                backgroundColor = colorTokens.main;
              }

              return {
                props: { color },
                style: {
                  backgroundColor: backgroundColor,
                  color: colorTokens.contrastText,
                  ['.MuiTooltip-arrow::before']: {
                    backgroundColor: backgroundColor,
                  },
                },
              };
            }),
          ],
        },
        arrow: {
          width: tokens.comp.tooltip.arrow.width,
          '&::before': {
            boxSizing: tokens.comp.tooltip.arrow.boxSizing,
          },
        },
      },
    },
  };
}

export default tooltipOverrides;

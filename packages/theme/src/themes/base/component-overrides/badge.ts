import type { ComponentOverride, Tokens } from '../../../types';

function badgeOverrides(tokens: Tokens): ComponentOverride<'MuiBadge'> {
  return {
    MuiBadge: {
      styleOverrides: {
        root: {
          '.MuiBadge-badge': {
            // Needed for badges with text content
            textWrap: 'nowrap',
          },

          '&.BlueshiftBadge-sizeLarge .MuiBadge-badge': {
            minHeight: tokens.comp.badge.height.large,
            padding: `0 ${tokens.comp.badge.horizontalPadding.large}`,
          },

          '.MuiBadge-edge': {
            borderRadius: tokens.comp.badge.borderRadius.small,

            '&.MuiBadge-anchorOriginTopLeft': {
              borderBottomLeftRadius: 0,
              // MUI's default is `scale(1) translate(-50%, -50%)`.
              // We're removing the horizontal translation and adjusting the vertical one.
              // Other anchor positions need a similar adjustment.
              transform: 'scale(1) translateY(-40%)',

              '&.MuiBadge-invisible': {
                transform: 'scale(0) translateY(-40%)',
              },
            },

            '&.MuiBadge-anchorOriginTopRight': {
              borderBottomRightRadius: 0,
              transform: 'scale(1) translateY(-40%)',

              '&.MuiBadge-invisible': {
                transform: 'scale(0) translateY(-40%)',
              },
            },

            '&.MuiBadge-anchorOriginBottomLeft': {
              borderTopLeftRadius: 0,
              transform: 'scale(1) translateY(40%)',

              '&.MuiBadge-invisible': {
                transform: 'scale(0) translateY(40%)',
              },
            },

            '&.MuiBadge-anchorOriginBottomRight': {
              borderTopRightRadius: 0,
              transform: 'scale(1) translateY(40%)',

              '&.MuiBadge-invisible': {
                transform: 'scale(0) translateY(40%)',
              },
            },
          },
        },
      },
    },
  };
}

export default badgeOverrides;

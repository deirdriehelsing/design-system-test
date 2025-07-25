import type { ComponentOverride, Tokens } from '../../../types';

function iconColorVariants(tokens: Tokens) {
  return {
    accent01: tokens.sys.color.accent01.dark,
    accent02: tokens.sys.color.accent02.dark,
    accent03: tokens.sys.color.accent03.dark,
    accent04: tokens.sys.color.accent04.dark,
    default: tokens.sys.color.warning.main,
    primary: tokens.sys.color.success.main,
  };
}

function ratingOverrides(tokens: Tokens): ComponentOverride<'MuiRating'> {
  return {
    MuiRating: {
      styleOverrides: {
        root: ({ ownerState }) => {
          const iconColor = ownerState.color
            ? iconColorVariants(tokens)[ownerState.color as keyof typeof iconColorVariants]
            : iconColorVariants(tokens).default;

          return {
            '&:not(.MuiRating-readOnly):hover .MuiRating-icon': {
              color: iconColor,

              '&.MuiRating-iconFilled': {
                stroke: iconColor,
                strokeLinejoin: 'round',
                strokeWidth: '1rem',

                '& svg': {
                  fill: 'color-mix(in srgb, currentColor 25%, transparent)',
                },
              },
            },
            '&:not(.MuiRating-readOnly) .MuiRating-icon': {
              marginRight: '1rem',
            },
            '&.Mui-disabled .MuiRating-icon': {
              color: tokens.sys.color.action.disabled,
            },
            '& .MuiRating-iconEmpty': {
              color: iconColor,
            },
            '& .MuiRating-iconFilled': {
              color: iconColor,
            },
            '& .MuiRating-iconHover': {
              color: iconColor,
            },
            '& .MuiRating-iconActive.MuiRating-iconFilled::before': {
              backgroundColor: iconColor,
              borderRadius: '100%',
              content: '""',
              height: '100%',
              left: '50%',
              opacity: 0.2,
              padding: 'calc(50% + 0.3rem)',
              position: 'absolute',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
            },
          };
        },
      },
    },
  };
}

export default ratingOverrides;

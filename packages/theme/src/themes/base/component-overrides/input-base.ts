import type { ComponentOverride, Tokens } from '../../../types';

function inputBaseOverrides(tokens: Tokens): ComponentOverride<'MuiInputBase'> {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          borderRadius: tokens.sys.shape.corner.extraSmall,
          color: tokens.sys.color.text.primary,
          fontSize: tokens.sys.typescale.input.default.size,
          fontWeight: tokens.sys.typescale.input.default.weight,
          letterSpacing: tokens.sys.typescale.input.default.tracking,
          lineHeight: tokens.sys.typescale.input.default.lineHeight,
          minWidth: '7.5rem',

          /* Outline */
          '&.MuiOutlinedInput-root': {
            borderRadius: tokens.sys.shape.corner.extraSmall,

            '&:hover': {
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: tokens.sys.color.neutral.dark,
              },
            },

            '&.Mui-error, .Blueshift-error &': {
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: tokens.sys.color.error.main,
              },
            },

            '&.Mui-focused:not(.Mui-error), .Blueshift-focused:not(.Blueshift-error) &': {
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: tokens.sys.color.neutral.dark,
              },
            },

            '.MuiOutlinedInput-notchedOutline': {
              borderColor: tokens.sys.color.neutral.dark,
            },
          },

          '&.Mui-error, .Blueshift-error &': {
            color: tokens.sys.color.error.main,
            textFillColor: tokens.sys.color.error.main,
          },

          '&.Mui-disabled, .Blueshift-disabled &': {
            backgroundColor: tokens.ref.palette.surface.shade91,
            borderColor: tokens.sys.color.action.disabled,
            borderRadius: tokens.sys.shape.corner.extraSmall,
            color: tokens.sys.color.text.disabled,
            textFillColor: tokens.sys.color.text.disabled,
          },

          '& .MuiInputBase-input': {
            color: tokens.sys.color.text.primary,
            fontSize: tokens.sys.typescale.input.default.size,
            fontWeight: tokens.sys.typescale.input.default.weight,
            /* automatically adjust height to allow its content to be displayed correctly */
            height: 'auto',
            letterSpacing: tokens.sys.typescale.input.default.tracking,
            lineHeight: tokens.sys.typescale.input.default.lineHeight,
            padding: tokens.comp.input.padding.default,

            [theme.breakpoints.down('sm')]: {
              /* text fields must be at least 16px font size on mobile to prevent iOS from zooming in */
              fontSize: tokens.sys.typescale.input.mobile.size,
            },

            '&::placeholder': {
              color: tokens.sys.color.text.primary,
              opacity: 0.6,
            },

            '&, &:-webkit-autofill': {
              /**
               * Material UI applies a shadow style to autofill elements that is impossible to remove or overridde.
               * We can apply another shadow that matches the background, but we don't know what the color behind is.
               * Our best option is to delay the background-filling animation to a prohibitive extend.
               * In practice, this means the background-filling color won't show unless the user waits for decades.
               */
              transition:
                'background-color 2147483647s ease-in-out 0s, color 2147483647s ease-in-out 0s',
              transitionDelay: 'background-color 2147483647s, color 2147483647s',
            },
          },

          // Large size styles
          ...(ownerState?.size === 'large'
            ? {
                '.MuiFormControl-root:has(&) .MuiInputLabel-root:not(.MuiInputLabel-shrink)': {
                  /* text fields must be at least 16px font size on mobile to prevent iOS from zooming in */
                  fontSize: tokens.sys.typescale.input.mobile.size,
                  lineHeight: tokens.sys.typescale.input.large.lineHeight,
                  transform: `translate(${tokens.comp.input.padding.large}, ${tokens.comp.input.padding.large})`,

                  [theme.breakpoints.up('sm')]: {
                    fontSize: tokens.sys.typescale.input.large.size,
                    fontWeight: tokens.sys.typescale.input.large.weight,
                    letterSpacing: tokens.sys.typescale.input.large.tracking,
                    transform: `translate(${tokens.comp.input.padding.extraLarge}, ${tokens.comp.input.padding.extraLarge})`,
                  },
                },

                '& .MuiInputBase-input': {
                  /* text fields must be at least 16px font size on mobile to prevent iOS from zooming in */
                  fontSize: tokens.sys.typescale.input.mobile.size,
                  lineHeight: tokens.sys.typescale.input.large.lineHeight,
                  padding: tokens.comp.input.padding.large,

                  [theme.breakpoints.up('sm')]: {
                    fontSize: tokens.sys.typescale.input.large.size,
                    fontWeight: tokens.sys.typescale.input.large.weight,
                    letterSpacing: tokens.sys.typescale.input.large.tracking,
                    padding: tokens.comp.input.padding.extraLarge,
                  },
                },
              }
            : {}),

          // Gradient styles
          ...(ownerState?.classes?.root?.includes('Blueshift-gradient')
            ? {
                // Apply gradient background. A `:before` pseudo-element is used so we can apply transitions using opacity.
                '&:before': {
                  background:
                    'linear-gradient(to right, var(--ref-palette-accent01-shade90) 0%, var(--ref-palette-error-shade90) 20%, var(--ref-palette-accent01-shade90) 69.5%, var(--ref-palette-accent01-shade80)   100%)',
                  bottom: 0,
                  content: '""',
                  left: 0,
                  opacity: ownerState?.focused ? 0 : 1,
                  pointerEvents: 'none',
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  transition: 'opacity 0.15s ease-in-out',
                  zIndex: -1,
                },

                // Apply primary colors alongside gradient
                '&:not(.Mui-focused):not(:hover) .MuiInputAdornment-root': {
                  color: tokens.sys.color.text.default,
                },
                '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  '&, &:hover': {
                    borderColor: tokens.sys.color.secondary.main,
                    borderWidth: '2px',
                  },
                },
              }
            : {}),
        }),
        adornedStart: {
          '& .MuiInputBase-input': {
            paddingLeft: 0,
          },
        },
        adornedEnd: {
          '& .MuiInputBase-input': {
            paddingRight: 0,
          },
        },
      },
    },
  };
}

export default inputBaseOverrides;

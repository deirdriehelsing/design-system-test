import type { ComponentOverride, Tokens } from '../../../types';

function autocompleteOverrides(tokens: Tokens): ComponentOverride<'MuiAutocomplete'> {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        clearIndicator: {
          color: tokens.sys.color.secondary.main,
          visibility: 'visible',

          '.Blueshift-focused &, .Mui-focused &, .Blueshift-gradient &': {
            color: tokens.sys.color.secondary.main,
          },

          '.Blueshift-error &, .Mui-error &': {
            color: tokens.sys.color.error.main,
          },
        },
        popupIndicator: {
          color: tokens.ref.palette.secondary.shade00,
        },
        popper: {
          '& .MuiPaper-root': {
            backgroundColor: tokens.sys.color.background.paper,
            borderRadius: tokens.sys.shape.corner.extraSmall,
            boxShadow: 'none',
            filter: tokens.sys.shadow.filter.declaration04,
          },

          '& .MuiAutocomplete-listbox': {
            padding: 0,

            '& .MuiAutocomplete-option': {
              color: tokens.sys.color.text.primary,
              fontSize: tokens.sys.typescale.body.small.size,
              whiteSpace: 'normal',

              '&.Mui-disabled': {
                backgroundColor: tokens.ref.palette.surface.shade91,
                color: tokens.sys.color.text.disabled,
                outline: tokens.sys.color.action.disabled,
              },

              '&:active': {
                backgroundColor: tokens.sys.color.accent01.main,
              },

              '&[aria-selected="true"], &[aria-selected="true"].Mui-focused': {
                backgroundColor: tokens.sys.color.accent01.light,
                color: tokens.sys.color.secondary.contrastText,
              },

              '&.Mui-focused, &:hover': {
                backgroundColor: tokens.sys.color.accent01.main,
                color: tokens.sys.color.text.default,
              },
            },
          },
        },
        root: ({ theme }) => ({
          '& .MuiAutocomplete-inputRoot': {
            padding: tokens.comp.input.padding.default,
          },

          '& .MuiFormLabel-root, & .MuiInputBase-input.MuiAutocomplete-input, & .MuiAutocomplete-endAdornment':
            {
              fontSize: tokens.sys.typescale.input.default.size,
              fontWeight: tokens.sys.typescale.input.default.weight,
              lineHeight: tokens.sys.typescale.input.default.lineHeight,
            },

          '& .MuiInputBase-input.MuiAutocomplete-input': {
            padding: 0,
          },

          '& .MuiFormLabel-root': {
            transition: theme.transitions.create(['top', 'transform'], {
              duration: theme.transitions.duration.short,
            }),
          },

          // Input adornments and input labels don't mix well and MUI still hasn't fixed this issue: https://github.com/mui/material-ui/pull/14126
          '& .MuiFormLabel-root.BlueshiftUI-startAdornmentOffset:not(.MuiInputLabel-shrink)': {
            lineHeight: tokens.sys.typescale.input.large.lineHeight,
            paddingRight: '2.5rem',
            top: '50%',
            transform: 'translate(2.75rem, -45%) scale(1)',
          },

          // Large size styles
          '.MuiInputBase-sizeLarge': {
            padding: `${tokens.comp.input.padding.large} ${tokens.comp.input.padding.default}`,

            [theme.breakpoints.up('sm')]: {
              padding: `${tokens.comp.input.padding.extraLarge} ${tokens.comp.input.padding.default}`,
            },

            '& input.MuiAutocomplete-input': {
              minHeight: '1.5rem',
              padding: 0,
            },

            '.MuiInputAdornment-root svg': {
              height: '1.5rem',
              width: '1.5rem',
            },
          },

          // Gradient styles
          '.Blueshift-gradient .MuiInputBase-input::placeholder': {
            opacity: 1,
          },

          '& input.MuiAutocomplete-input': {
            // account for different font size on mobile by maintaining a consistent height
            minHeight: '1rem',
          },
        }),
      },
    },
  };
}

export default autocompleteOverrides;

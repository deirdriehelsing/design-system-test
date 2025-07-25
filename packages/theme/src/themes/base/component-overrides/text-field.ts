import type { ComponentOverride, Tokens } from '../../../types';

function textFieldOverrides(tokens: Tokens): ComponentOverride<'MuiTextField'> {
  return {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'medium',
      },
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            /* Outline */
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: tokens.ref.palette.secondary.shade50,
              borderRadius: tokens.sys.shape.corner.extraSmall,
            },

            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: tokens.sys.color.primary.main,
            },

            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: tokens.sys.color.error.main,
            },

            /* Buttons */
            '.BlueshiftClearButton, .BlueshiftEmojiPickerButton': {
              color: tokens.sys.color.text.link,
              ':hover': {
                // "OA" is the hex value for 4% opacity
                backgroundColor: `${tokens.sys.color.text.link}0A`,
              },
            },

            '&.Mui-focused .BlueshiftClearButton, &.Mui-focused .BlueshiftEmojiPickerButton': {
              color: tokens.sys.color.text.link,
            },

            '&.Mui-error .BlueshiftClearButton, &.Mui-error .BlueshiftEmojiPickerButton': {
              color: tokens.sys.color.error.main,
              ':hover': {
                // "OA" is the hex value for 4% opacity
                backgroundColor: `${tokens.sys.color.error.main}0A`,
              },
            },

            '& legend': {
              transition: 'unset',
            },
          },
        },
      },
    },
  };
}

export default textFieldOverrides;

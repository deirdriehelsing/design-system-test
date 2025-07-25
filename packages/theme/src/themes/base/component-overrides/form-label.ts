import type { ComponentOverride, Tokens } from '../../../types';

function formLabelOverrides(tokens: Tokens): ComponentOverride<'MuiFormLabel'> {
  return {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: tokens.sys.color.text.default,
          fontSize: tokens.sys.typescale.input.default.size,
          fontWeight: tokens.sys.typescale.input.default.weight,
          letterSpacing: tokens.sys.typescale.input.default.tracking,
          lineHeight: tokens.sys.typescale.input.default.lineHeight,

          '&.MuiInputLabel-root': {
            [`@media (min-width:${tokens.sys.breakpoint.md}px)`]: {
              // Duplicating styles above to override the styles applies by the typography base
              // See: https://github.com/varsitytutors/blueshift-ui/blob/master/packages/theme/src/themes/base/config/typography/index.ts#L9-L14
              fontSize: tokens.sys.typescale.input.default.size,
              fontWeight: tokens.sys.typescale.input.default.weight,
              letterSpacing: tokens.sys.typescale.input.default.tracking,
              lineHeight: tokens.sys.typescale.input.default.lineHeight,
            },
          },

          '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -9px) scale(0.80)',

            '+ .MuiInputBase-root .MuiOutlinedInput-notchedOutline > legend': {
              fontSize: '0.75rem',
            },

            '+ .MuiInputBase-root .MuiOutlinedInput-notchedOutline > legend > span': {
              padding: '0 0.25rem 0 0',
            },
          },

          '&.Mui-focused, .Blueshift-focused &': {
            color: tokens.sys.color.text.default,
          },

          '&.Mui-error, .Blueshift-error &': {
            color: tokens.sys.color.error.main,
          },

          '&.Mui-disabled, .Blueshift-disabled &': {
            color: tokens.sys.color.text.disabled,
          },
        },
      },
    },
  };
}

export default formLabelOverrides;

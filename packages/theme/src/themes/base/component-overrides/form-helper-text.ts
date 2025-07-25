import type { ComponentOverride, Tokens } from '../../../types';

function formHelperTextOverrides(tokens: Tokens): ComponentOverride<'MuiFormHelperText'> {
  return {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: tokens.sys.color.text.primary,
          fontSize: tokens.sys.typescale.input.default.size,
          fontWeight: tokens.ref.typeface.weight.regular,
          lineHeight: tokens.sys.typescale.input.default.lineHeight,
          letterSpacing: tokens.sys.typescale.input.default.tracking,
          marginLeft: '0.5rem',
          marginTop: '0.5rem',

          '&.Mui-focused': {
            color: tokens.sys.color.text.default,
          },

          '&.Mui-error': {
            color: tokens.sys.color.error.main,
          },
        },
      },
    },
  };
}

export default formHelperTextOverrides;

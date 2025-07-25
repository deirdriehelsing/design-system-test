import type { ComponentOverride, Tokens } from '../../../types';
/**
 * SnackbarProps type is not used, but we need to import this file so the compiler can use the MuiSnackbarProps extension defined there
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { SnackbarProps } from '@blueshift-ui/feedback';

function snackbarOverrides(tokens: Tokens): ComponentOverride<'MuiSnackbar'> {
  return {
    MuiSnackbar: {
      defaultProps: {
        autoHideDuration: 4000,
        severity: 'info',
      },
      styleOverrides: {
        root: {
          '.MuiAlert-root': {
            padding: tokens.comp.alert.padding.default,
            borderRadius: tokens.comp.alert.borderRadius.default,

            /* Fonts */
            '.MuiAlert-message': {
              fontSize: tokens.sys.typescale.body.medium.size,
              fontWeight: tokens.sys.typescale.body.medium.weight,
              letterSpacing: tokens.sys.typescale.body.medium.tracking,
              lineHeight: tokens.sys.typescale.body.medium.lineHeight,
            },

            /* Spacing */
            '.MuiAlert-icon, .MuiAlert-message, .MuiAlert-action .MuiIconButton-root': {
              padding: 0,
            },
            '.MuiAlert-action': {
              paddingTop: '0.125rem',
            },
          },
          variants: [
            {
              props: { severity: 'info' },
              style: {
                '.MuiAlert-root': {
                  backgroundColor: tokens.ref.palette.accent01.shade40,
                  color: tokens.sys.color.info.contrastText,
                },
              },
            },
          ],
        },
      },
    },
  };
}

export default snackbarOverrides;

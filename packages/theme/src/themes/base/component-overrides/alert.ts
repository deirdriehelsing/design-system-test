import type { ComponentOverride, Tokens } from '../../../types';
import type { AlertProps } from '@blueshift-ui/feedback';

import { getCrossPermutations } from '../../../helpers';

declare module '@mui/material/Alert' {
  interface AlertPropsVariantOverrides {
    text: true;
  }
}

const severities = [
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
] as NonNullable<AlertProps['severity']>[];

const variants = ['filled', 'standard', 'text'] as NonNullable<AlertProps['variant']>[];

function alertOverrides(tokens: Tokens): ComponentOverride<'MuiAlert'> {
  return {
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          color: tokens.sys.color.neutral.contrastText,
          variants: [
            {
              props: { variant: 'text' },
              style: {
                backgroundColor: 'transparent',
                padding: 0,
              },
            },
            ...getCrossPermutations(variants, severities).map(([variant, severity]) => {
              const isAccentOrInfo = severity === 'info' || severity.startsWith('accent');
              // TODO: varsity.atlassian.net/browse/KZN-1867 - [FE] Enforce the semantic usage of the design tokens system
              const sysColors = tokens.sys.color[severity === 'info' ? 'primary' : severity];
              const paletteColors = tokens.ref.palette[severity];

              switch (variant) {
                case 'filled':
                  return {
                    props: { variant, severity },
                    style: {
                      backgroundColor: isAccentOrInfo ? sysColors.light : paletteColors.shade40,
                      color: isAccentOrInfo ? sysColors.contrastText : paletteColors.shade100,
                      '.MuiAlert-icon': {
                        color: isAccentOrInfo ? sysColors.contrastText : paletteColors.shade100,
                      },
                    },
                  };
                case 'standard':
                  return {
                    props: { variant, severity },
                    style: {
                      backgroundColor: isAccentOrInfo ? sysColors.light : paletteColors.shade90,
                      color: isAccentOrInfo ? sysColors.dark : paletteColors.shade10,
                      '.MuiAlert-icon': {
                        color: isAccentOrInfo ? sysColors.dark : paletteColors.shade20,
                      },
                    },
                  };
                case 'text':
                  return {
                    props: { variant, severity },
                    style: {
                      color: sysColors.dark,
                      '.MuiAlert-icon': {
                        color: sysColors.dark,
                      },
                    },
                  };
              }
            }),
          ],
        },
        icon: {
          variants: [
            {
              props: { variant: 'text' },
              style: {
                padding: 0,
              },
            },
          ],
        },
        message: {
          variants: [
            {
              props: { variant: 'text' },
              style: {
                padding: 0,
              },
            },
          ],
        },
      },
    },
  };
}

export default alertOverrides;

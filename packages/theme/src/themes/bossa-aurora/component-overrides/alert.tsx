import type { ComponentOverride, Tokens } from '../../../types';
import type { AlertProps } from '@blueshift-ui/feedback';
import type { CSSObject } from '@mui/styled-engine';

import { CheckCircle, Info, Warning, XCircle } from '@phosphor-icons/react';
import baseAlertOverrides from '../../base/component-overrides/alert';

type Variants = {
  props: { severity: AlertProps['severity']; variant: AlertProps['variant'] };
  style: CSSObject;
}[];

const severities = ['error', 'info', 'success', 'warning'] as NonNullable<AlertProps['severity']>[];

function alertOverrides(tokens: Tokens): ComponentOverride<'MuiAlert'> {
  const base = baseAlertOverrides(tokens);
  const root = base.MuiAlert?.styleOverrides?.root as any;
  const variants = root.variants as Variants;

  return {
    MuiAlert: {
      ...base.MuiAlert,
      styleOverrides: {
        ...base.MuiAlert?.styleOverrides,
        root: {
          borderRadius: 0,
          color: tokens.sys.color.neutral.contrastText,
          variants: [
            // apply all variants of base except text
            ...variants.filter((variant) => variant.props.variant !== 'text'),
            // apply new text variant for each severity
            ...severities.map((severity) => ({
              props: { variant: 'text', severity },
              style: {
                color: tokens.sys.color[severity].dark,
                '.MuiAlert-icon': {
                  color:
                    severity === 'info'
                      ? tokens.sys.color[severity].dark
                      : tokens.sys.color[severity].main,
                },
                padding: 0,
              },
            })),
          ],
        },
        icon: {
          variants: [
            {
              props: { variant: 'text' },
              style: {
                marginRight: '0.5rem',
                padding: 0,
              },
            },
          ],
        },
      },
      defaultProps: {
        iconMapping: {
          success: <CheckCircle weight="duotone" />,
          error: <XCircle weight="duotone" />,
          info: <Info weight="duotone" />,
          warning: <Warning weight="duotone" />,
        },
      },
    },
  };
}

export default alertOverrides;

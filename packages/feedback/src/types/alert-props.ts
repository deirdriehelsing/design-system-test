import type { AlertTitleProps } from '@mui/material/AlertTitle';
import type { AlertProps as MuiAlertProps } from '@mui/material/Alert';

declare module '@mui/material/Alert' {
  interface AlertPropsVariantOverrides {
    text: true;
  }
}
interface AlertProps extends Omit<MuiAlertProps, 'title' | 'ref'> {
  title?: AlertTitleProps['children'];
}

export type { AlertProps };

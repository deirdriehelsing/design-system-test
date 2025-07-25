import type { TooltipProps } from '@mui/material/Tooltip';

declare module '@mui/material/Tooltip' {
  interface TooltipProps {
    color?:
      | 'accent01'
      | 'accent02'
      | 'accent03'
      | 'accent04'
      | 'error'
      | 'info'
      | 'primary'
      | 'secondary'
      | 'success'
      | 'warning';
  }
}

export type { TooltipProps };

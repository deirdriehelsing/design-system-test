import type { LinearProgressProps as MuiLinearProgressProps } from '@mui/material/LinearProgress';

declare module '@mui/material/LinearProgress' {
  interface LinearProgressPropsColorOverrides {
    accent01: true;
    accent02: true;
    accent03: true;
    accent04: true;
    neutral: true;
  }
}

interface LinearProgressProps extends MuiLinearProgressProps {
  size?: 'xsmall' | 'small' | 'medium';
}

export type { LinearProgressProps };

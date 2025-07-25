import '@mui/material/Badge';
import type { BadgeProps as MuiBadgeProps } from '@mui/material/Badge';

declare module '@mui/material/Badge' {
  interface BadgePropsVariantOverrides {
    edge: true;
  }
}

interface BadgeProps extends MuiBadgeProps {
  size?: 'medium' | 'large';
}

export type { BadgeProps };

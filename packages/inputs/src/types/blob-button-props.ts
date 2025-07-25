import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';

interface BlobButtonProps extends Omit<MuiButtonProps, 'variant' | 'startIcon'> {
  icon: React.ReactNode;
  orientation?: 'horizontal' | 'stacked';
}

export type { BlobButtonProps };

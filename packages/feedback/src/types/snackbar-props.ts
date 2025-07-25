import type {
  SnackbarCloseReason as MuiSnackbarCloseReason,
  SnackbarProps as MuiSnackbarProps,
} from '@mui/material/Snackbar';
import type { SyntheticEvent } from 'react';

declare module '@mui/material' {
  interface SnackbarProps {
    severity?: 'info' | 'success' | 'error';
  }
}

interface SnackbarProps extends MuiSnackbarProps {
  onClose?: (
    event: SyntheticEvent | Event,
    reason: MuiSnackbarCloseReason | 'closeButtonPressed'
  ) => void;
}

export type { SnackbarProps };

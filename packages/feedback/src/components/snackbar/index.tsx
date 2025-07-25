import type { SnackbarProps } from '../../types';
import type { SyntheticEvent } from 'react';

import Alert from '../alert';
import MuiSnackbar from '@mui/material/Snackbar';

function Snackbar({ severity, ...muiSnackbarProps }: SnackbarProps) {
  function handleAlertClose(event: SyntheticEvent) {
    muiSnackbarProps?.onClose?.(event, 'closeButtonPressed');
  }

  return (
    <MuiSnackbar {...muiSnackbarProps} severity={severity}>
      <Alert icon={false} onClose={handleAlertClose} severity={severity} variant="filled">
        {muiSnackbarProps?.message}
      </Alert>
    </MuiSnackbar>
  );
}

export default Snackbar;

import type { AlertProps } from '../../types/alert-props';

import { default as AlertTitle } from '@mui/material/AlertTitle';
import { default as MuiAlert } from '@mui/material/Alert';
import React from 'react';

const Alert = React.forwardRef(function Alert(props: AlertProps, ref: React.Ref<HTMLDivElement>) {
  const { title, children, ...alertProps } = props;

  return (
    <MuiAlert {...alertProps} ref={ref}>
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      {children}
    </MuiAlert>
  );
});
Alert.displayName = 'Alert';

export default Alert;

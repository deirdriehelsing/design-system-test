import type { LinearProgressProps } from '../../types';
import type { Ref } from 'react';

import MuiLinearProgress from '@mui/material/LinearProgress';
import { forwardRef } from 'react';

function LinearProgress(props: LinearProgressProps, ref: Ref<HTMLSpanElement>) {
  return <MuiLinearProgress {...props} ref={ref} />;
}

export default forwardRef(LinearProgress);

import type { StackProps as MuiStackProps } from '@mui/material';

import * as styles from './index.css';
import Stack from '@blueshift-ui/core/dist/components/stack';
import classNames from 'clsx';

function StepperSummary({ className, ...muiStackProps }: MuiStackProps) {
  return <Stack className={classNames(styles.root, className)} {...muiStackProps} />;
}

export default StepperSummary;

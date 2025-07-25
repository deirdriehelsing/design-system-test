import type { FabProps } from '../../types';

import Box from '../box';
import MuiFab from '@mui/material/Fab';
import React from 'react';
import classNames from 'clsx';

function Fab({ children, classes, corner, variant, ...fabProps }: FabProps) {
  return (
    <MuiFab
      {...fabProps}
      classes={{
        ...classes,
        root: classNames(
          classes?.root,
          corner ? ['MuiFab-Corner', `MuiFab-Corner-${corner}`] : undefined
        ),
      }}
      variant={variant}
    >
      {variant === 'extended' ? (
        <Box alignItems="center" display="flex" gap={1}>
          {children}
        </Box>
      ) : (
        children
      )}
    </MuiFab>
  );
}

export default Fab;

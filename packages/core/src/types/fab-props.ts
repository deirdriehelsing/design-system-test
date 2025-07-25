import type { FabProps as MuiFabProps } from '@mui/material/Fab';

type FabCorner = 'top' | 'right' | 'bottom' | 'left';

interface FabProps extends MuiFabProps {
  corner?: FabCorner;
}

export type { FabCorner, FabProps };

import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

interface AppBarProps extends MuiAppBarProps {
  withoutSlide?: boolean;
}

export type { AppBarProps };

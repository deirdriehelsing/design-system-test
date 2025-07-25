import type { ListProps as MuiListProps } from '@mui/material/List';
import type { NavItem } from './nav-item';

interface ListProps extends MuiListProps {
  items: NavItem[];
}

export type { ListProps };

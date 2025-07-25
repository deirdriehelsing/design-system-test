import type { BreadcrumbItem } from './breadcrumb-item';
import type { BreadcrumbsProps as MuiBreadcrumbsProps } from '@mui/material/Breadcrumbs';

interface BreadcrumbsProps extends Omit<MuiBreadcrumbsProps, 'children' | 'color'> {
  items: BreadcrumbItem[];
}

export type { BreadcrumbsProps };

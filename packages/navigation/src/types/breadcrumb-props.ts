import type { BreadcrumbItem } from './breadcrumb-item';
import type { TypographyProps } from '@mui/material/Typography';

interface BreadcrumbProps extends BreadcrumbItem, Pick<TypographyProps, 'variant'> {}

export type { BreadcrumbProps };

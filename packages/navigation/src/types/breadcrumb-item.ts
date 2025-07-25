import type { NavAction } from '@blueshift-ui/core';

interface BreadcrumbItem extends Omit<NavAction, 'active' | 'icon' | 'role' | 'componentProps'> {
  componentProps?: NavAction['componentProps'];
}

export type { BreadcrumbItem };

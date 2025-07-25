import type React from 'react';
// import type { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem';
import type { TooltipProps } from './tooltip-props';

interface NavItemBase {
  active?: boolean;
  slug?: string;
  text?: React.ReactNode;
}

interface NavAction<TProps = Record<string, any>> extends NavItemBase {
  component?: any;
  componentProps: TProps;
  icon?: React.ReactNode;
  role: 'action';
  tooltip?: React.ReactNode;
  tooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
}

interface NavDivider extends NavItemBase {
  role: 'divider';
}

interface NavSubheader {
  role: 'subheader';
  text: React.ReactNode;
}

interface NestedNav extends NavItemBase {
  items: NavItem[];
  role: 'nested';
}

type NavItem<TProps = Record<string, any>> =
  | NavAction<TProps>
  | NavDivider
  | NavSubheader
  | NestedNav;

export type { NavAction, NavDivider, NavItem, NavSubheader, NestedNav };

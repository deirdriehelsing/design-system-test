import type { NavItem } from '@blueshift-ui/core';
import type { PopupState } from 'material-ui-popup-state/hooks';

interface MenuItemProps {
  index: number;
  item: NavItem;
  openOnHover: boolean;
  popupState: PopupState;
}

export type { MenuItemProps };

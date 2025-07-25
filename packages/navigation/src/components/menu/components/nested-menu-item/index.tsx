import type { MenuItemProps } from '../../../../types';
import type { ListProps as MuiListProps } from '@mui/material/List';
import type { NestedNav } from '@blueshift-ui/core';

import * as menuStyles from '../../index.css';
import * as styles from './index.css';
import { CaretDown as CaretDownIcon, CaretRight as CaretRightIcon } from '@phosphor-icons/react';
import { bindHover, bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import ClickAwayListener from '@blueshift-ui/core/dist/components/click-away-listener';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import MenuItem from '../menu-item';
import MuiMenuItem from '@mui/material/MenuItem';
import handleKeyDown from '../../handlers/handle-key-down';

interface NestedMenuItemProps extends Omit<MenuItemProps, 'item'> {
  item: NestedNav;
}

function NestedMenuItem({
  index,
  item: { items, text },
  openOnHover,
  popupState: parentPopupState,
}: NestedMenuItemProps) {
  const popupState = usePopupState({
    parentPopupState,
    popupId: `${parentPopupState.popupId}_${index}`,
    variant: 'popover',
  });

  return (
    <ClickAwayListener onClickAway={popupState.close}>
      <div tabIndex={-1}>
        <MuiMenuItem
          {...bindTrigger(popupState)}
          {...(openOnHover ? bindHover(popupState) : {})}
          onKeyDown={handleKeyDown}
          selected={popupState.isOpen}
          tabIndex={0}
        >
          {text}
          {popupState.isOpen ? <CaretDownIcon weight="bold" /> : <CaretRightIcon weight="bold" />}
        </MuiMenuItem>

        <HoverMenu
          {...bindMenu(popupState)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          className={menuStyles.menu}
          hideBackdrop={true}
          MenuListProps={{ component: 'div' } as MuiListProps}
          onKeyDown={handleKeyDown}
          PopoverClasses={{
            paper: styles.nestedMenuContainer,
            root: styles.nestedMenuBackdrop,
          }}
        >
          <div className={menuStyles.menuItems} tabIndex={-1}>
            {items?.map((item, index) => (
              <MenuItem
                index={index}
                item={item}
                key={index}
                openOnHover={openOnHover}
                popupState={popupState}
              />
            ))}
          </div>
        </HoverMenu>
      </div>
    </ClickAwayListener>
  );
}

export default NestedMenuItem;

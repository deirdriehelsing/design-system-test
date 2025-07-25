import type { ElementType } from 'react';
import type { MenuTriggerProps } from '../../types';
import type { ListProps as MuiListProps } from '@mui/material/List';
import type { MenuProps as MuiMenuProps } from '@mui/material/Menu';
import type { NavItem } from '@blueshift-ui/core';

import * as styles from './index.css';
import { bindHover, bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import ClickAwayListener from '@blueshift-ui/core/dist/components/click-away-listener';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import MenuItem from './components/menu-item';
import { closeActiveMenu as closeActiveMenuAtom } from './atoms/active-menu';
import handleKeyDown from './handlers/handle-key-down';
import { useAtom } from 'jotai/react';
import { useCallback } from 'react';
import useTriggerCallback from './hooks/use-trigger-callback';

interface MenuProps extends Omit<MuiMenuProps, 'open'> {
  items: NavItem[][] | NavItem[];
  openOnHover?: boolean;
  trigger: ElementType;
  triggerProps: MenuTriggerProps;
}

function Menu({ items, openOnHover, trigger: Trigger, triggerProps, ...menuProps }: MenuProps) {
  const normalizedMenuItems = (!Array.isArray(items?.[0]) ? [items] : items) as NavItem[][];
  const [closeActiveMenu, setCloseActiveMenu] = useAtom(closeActiveMenuAtom);

  const popupState = usePopupState({
    popupId: 'menu',
    variant: 'popper',
  });

  const handleTriggerClick = useCallback(
    (event: any) => {
      event.stopPropagation();
      event.preventDefault();

      if (closeActiveMenu) {
        closeActiveMenu();
      }

      setCloseActiveMenu(() => popupState.close);
      popupState.toggle(event);
      triggerProps?.onClick?.(event);
    },
    [popupState, triggerProps, closeActiveMenu, setCloseActiveMenu]
  );

  const handleClickAwayClick = useCallback(
    (event: any) => {
      event.stopPropagation();
      event.preventDefault();

      popupState.close();
    },
    [popupState]
  );

  return (
    <div className={styles.container}>
      <Trigger
        {...triggerProps}
        {...(openOnHover ? bindHover(popupState) : {})}
        {...bindTrigger(popupState)}
        onClick={useTriggerCallback('onClick', triggerProps, popupState, handleTriggerClick)}
        onTouchStart={useTriggerCallback('onTouchStart', triggerProps, popupState)}
        open={popupState.isOpen}
      />
      <ClickAwayListener onClickAway={handleClickAwayClick}>
        <HoverMenu
          {...bindMenu(popupState)}
          className={styles.menu}
          MenuListProps={{ component: 'div' } as MuiListProps}
          onKeyDown={handleKeyDown}
          {...menuProps}
        >
          {normalizedMenuItems.map((menuItems: NavItem[], index) => (
            <div className={styles.menuItems} key={index} tabIndex={-1}>
              {menuItems.map((item, index) => (
                <MenuItem
                  index={index}
                  item={item}
                  key={index}
                  openOnHover={Boolean(openOnHover)}
                  popupState={popupState}
                />
              ))}
            </div>
          ))}
        </HoverMenu>
      </ClickAwayListener>
    </div>
  );
}

export type { MenuProps };

export default Menu;

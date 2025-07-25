import type { MenuItemProps } from '../../../../types';
import type { MouseEvent } from 'react';

import MuiDivider from '@mui/material/Divider';
import MuiListSubheader from '@mui/material/ListSubheader';
import MuiMenuItem from '@mui/material/MenuItem';
import NestedMenuItem from '../nested-menu-item';
import TooltipWrapper from '../tooltip-wrapper';
import closeAllMenus from '../../helpers/close-all-menus';

function MenuItem({ item, index, ...nestedMenuItemProps }: MenuItemProps) {
  /* Event handlers */

  function handleMenuItemClick(event: MouseEvent) {
    closeAllMenus();

    if (item.role === 'action') {
      item?.componentProps?.onClick?.(event);
    }
  }

  /* Render */

  switch (item.role) {
    case 'action': {
      const { active, component = 'a', componentProps, text, tooltip, tooltipProps } = item;

      return (
        <TooltipWrapper title={tooltip} {...tooltipProps}>
          <MuiMenuItem
            selected={active}
            {...componentProps}
            component={component}
            onClick={handleMenuItemClick}
            tabIndex={0}
          >
            {text}
          </MuiMenuItem>
        </TooltipWrapper>
      );
    }

    case 'divider':
      return <MuiDivider />;

    case 'nested':
      return <NestedMenuItem index={index} item={item} {...nestedMenuItemProps} />;

    case 'subheader': {
      const { text } = item;
      return <MuiListSubheader component="div">{text}</MuiListSubheader>;
    }

    default:
      return null;
  }
}

export default MenuItem;

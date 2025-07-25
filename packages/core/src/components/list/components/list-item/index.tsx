import type { NavItem } from '../../../../types/nav-item';

import MuiDivider from '@mui/material/Divider';
import MuiListItemButton from '@mui/material/ListItemButton';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import MuiListItemText from '@mui/material/ListItemText';
import MuiListSubheader from '@mui/material/ListSubheader';
import NestedListItem from '../nested-list-item';
import TooltipWrapper from '../tooltip-wrapper';

interface ListItemProps {
  item: NavItem;
}

function ListItem({ item }: ListItemProps) {
  switch (item.role) {
    case 'action': {
      const { active, component = 'a', componentProps, icon, text, tooltip, tooltipProps } = item;
      return (
        <TooltipWrapper title={tooltip} {...tooltipProps}>
          <MuiListItemButton {...componentProps} component={component} selected={active}>
            {icon && <MuiListItemIcon>{icon}</MuiListItemIcon>}
            <MuiListItemText>{text}</MuiListItemText>
          </MuiListItemButton>
        </TooltipWrapper>
      );
    }

    case 'divider':
      return <MuiDivider />;

    case 'nested':
      return <NestedListItem item={item} />;

    case 'subheader': {
      const { text } = item;
      return <MuiListSubheader>{text}</MuiListSubheader>;
    }
  }
}

export default ListItem;

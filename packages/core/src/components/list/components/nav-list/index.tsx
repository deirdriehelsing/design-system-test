import type { ListProps } from '../../../../types';

import ListItem from '../list-item';
import MuiList from '@mui/material/List';

function NavList({ items, ...listProps }: ListProps) {
  return (
    <MuiList {...listProps} component="nav">
      {items.map((item, index) => (
        <ListItem item={item} key={index} />
      ))}
    </MuiList>
  );
}

export default NavList;

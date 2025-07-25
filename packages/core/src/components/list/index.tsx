import type { ListProps } from '../../types';

import NavList from './components/nav-list';

function List({ items, ...listProps }: ListProps) {
  if (!items?.length) {
    return null;
  }

  return <NavList {...listProps} items={items} />;
}

export default List;

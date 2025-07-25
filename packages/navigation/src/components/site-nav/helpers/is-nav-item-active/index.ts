import type { NavContentItem } from '../../../../types';

/**
 * Returns true if the nav item's href (stripped of origin) matches the current window pathname.
 * It's used to set the "active" prop on nav item.
 */
const isNavItemActive = (item: NavContentItem): boolean => {
  if (!item.href) {
    return false;
  }

  const { origin, pathname } = window.location;
  return item.href.replace(origin, '') === pathname;
};

export default isNavItemActive;

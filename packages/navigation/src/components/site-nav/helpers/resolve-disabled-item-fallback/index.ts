import type { NavContentItemWithApplicationId } from '../../../../types';

/**
 * Returns an alternative link configuration for disabled items with alt_href,
 * or null if the item is enabled or if we're still loading.
 */
const resolveDisabledItemFallback = (
  item: NavContentItemWithApplicationId,
  isItemEnabled: boolean,
  isLoadingFeatureAccess: boolean
): NavContentItemWithApplicationId | null => {
  // Return null if item is enabled or if we're still loading
  if (isItemEnabled || isLoadingFeatureAccess) {
    return null;
  }

  // Return alternative link configuration if alt_href exists
  if (item.alt_href) {
    return {
      ...item,
      ...(item.alt_href_application_id ? { application_id: item.alt_href_application_id } : {}),
      href: item.alt_href,
    };
  }

  return null;
};

export default resolveDisabledItemFallback;

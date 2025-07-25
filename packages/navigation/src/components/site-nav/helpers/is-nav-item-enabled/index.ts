import type { FeatureAccessCriteria } from '@blueshift-ui/auth/dist/types';
import type { NavContentItemWithApplicationId } from '../../../../types';

/**
 * Determines if a nav item is enabled based on its enablement and feature flag.
 * If no enablement or feature flag is provided, the item is enabled by default.
 */
const isNavItemEnabled = (
  item: NavContentItemWithApplicationId,
  checkAccess: (criteria: FeatureAccessCriteria) => boolean | undefined
): boolean => {
  if (!item.enablement && !item.feature_flag) {
    return true;
  }

  const accessCriteria = {
    criteria: {
      every: [
        item.enablement ? { enablement: item.enablement } : true,
        item.feature_flag ? { flag: item.feature_flag } : true,
      ],
    },
  };

  return checkAccess(accessCriteria) ?? false;
};

export default isNavItemEnabled;

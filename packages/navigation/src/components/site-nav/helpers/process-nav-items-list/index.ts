import type { NavContentItemWithApplicationId, NavItemApplicationId } from '../../../../types';
import type { FeatureAccessCriteria } from '@blueshift-ui/auth/dist/types';

import processNavItem from '../process-nav-item';

type UrlTransformationStrategy = (url: string, applicationId?: NavItemApplicationId) => string;

interface ProcessNavItemsParams {
  checkAccess: (criteria: FeatureAccessCriteria) => boolean | undefined;
  isLoadingFeatureAccess: boolean;
  items: NavContentItemWithApplicationId[];
  urlTransformationStrategy: UrlTransformationStrategy;
}

/**
 * Recursively processes navigation items by transforming URLs, checking access permissions,
 * and filtering disabled items. Handles nested navigation structures by processing child items.
 */
const processNavItemsList = ({
  items,
  urlTransformationStrategy,
  checkAccess,
  isLoadingFeatureAccess,
}: ProcessNavItemsParams): NavContentItemWithApplicationId[] => {
  const processNavItemsRecursive = (
    itemsToProcess: NavContentItemWithApplicationId[]
  ): NavContentItemWithApplicationId[] => {
    return itemsToProcess.flatMap((item) => {
      const isParentItem = Boolean(item.items?.length);
      const processedItem = processNavItem({
        item,
        urlTransformationStrategy,
        checkAccess,
        isLoadingFeatureAccess,
      });

      if (!processedItem) {
        return [];
      }

      if (isParentItem) {
        return [
          {
            ...processedItem,
            items: processNavItemsRecursive(processedItem.items || []),
          },
        ];
      }

      return [processedItem];
    });
  };

  return processNavItemsRecursive(items);
};

export default processNavItemsList;

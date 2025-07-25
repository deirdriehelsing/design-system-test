import type { NavContentItemWithApplicationId, NavItemApplicationId } from '../../../../types';
import type { FeatureAccessCriteria } from '@blueshift-ui/auth/dist/types';

import applyUrlTransformationToNavItem from '../apply-url-transformation-to-nav-item';
import isNavItemEnabled from '../is-nav-item-enabled';
import resolveDisabledItemFallback from '../resolve-disabled-item-fallback';

type UrlTransformationStrategy = (url: string, applicationId?: NavItemApplicationId) => string;

interface ProcessNavItemParams {
  checkAccess: (criteria: FeatureAccessCriteria) => boolean | undefined;
  isLoadingFeatureAccess: boolean;
  item: NavContentItemWithApplicationId;
  urlTransformationStrategy: UrlTransformationStrategy;
}

/**
 * Processes a single navigation item by applying URL transformations and access control.
 */
const processNavItem = ({
  item,
  urlTransformationStrategy,
  checkAccess,
  isLoadingFeatureAccess,
}: ProcessNavItemParams): NavContentItemWithApplicationId | null => {
  const isItemEnabled = isNavItemEnabled(item, checkAccess);
  const processedItem = applyUrlTransformationToNavItem(item, urlTransformationStrategy);
  const alternativeItem = resolveDisabledItemFallback(
    processedItem,
    isItemEnabled,
    isLoadingFeatureAccess
  );

  // Return alternative item if it exists (for disabled items with alt_href)
  if (alternativeItem) {
    return alternativeItem;
  }

  // Filter out disabled items that don't have alt_href
  if (!isItemEnabled) {
    return null;
  }

  return processedItem;
};

export default processNavItem;

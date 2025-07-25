import type { NavContentItemWithApplicationId, NavItemApplicationId } from '../../../../types';

type UrlTransformationStrategy = (url: string, applicationId?: NavItemApplicationId) => string;

/**
 * Returns a copy of a navigation item with its href and alt_href URLs transformed
 * by the provided strategy, using the appropriate application ID for each URL.
 */
const applyUrlTransformationToNavItem = (
  item: NavContentItemWithApplicationId,
  urlTransformationStrategy: UrlTransformationStrategy
): NavContentItemWithApplicationId => {
  const processedItem = { ...item };

  if (processedItem.href) {
    processedItem.href = urlTransformationStrategy(
      processedItem.href,
      processedItem.application_id || processedItem.applicationId
    );
  }

  if (processedItem.alt_href) {
    processedItem.alt_href = urlTransformationStrategy(
      processedItem.alt_href,
      processedItem.alt_href_application_id ||
        processedItem.application_id ||
        processedItem.applicationId
    );
  }

  return processedItem;
};

export default applyUrlTransformationToNavItem;

import type {
  UrlTransformationStrategyArgs,
  UrlTransformationStrategyReturn,
} from '../../../../types/url-transformation-strategy';

import {
  clientAccountUrlTransformationStrategy,
  defaultUrlTransformationStrategy,
} from '../url-transformation-strategies';

/**
 * Creates a URL transformation strategy based on the current application ID.
 * For client-account application, it requires a baseURL prop.
 */
const urlTransformationStrategyFactory = ({
  baseURL,
  currentApplicationId,
}: UrlTransformationStrategyArgs): UrlTransformationStrategyReturn => {
  if (currentApplicationId === 'client-account') {
    if (!baseURL) {
      throw new Error('baseURL prop is required for client-account application SiteNav');
    }

    return clientAccountUrlTransformationStrategy({ currentApplicationId, baseURL });
  }

  return defaultUrlTransformationStrategy();
};

export default urlTransformationStrategyFactory;

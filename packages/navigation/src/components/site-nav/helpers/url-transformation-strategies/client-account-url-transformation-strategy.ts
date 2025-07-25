import type {
  UrlTransformationStrategyArgs,
  UrlTransformationStrategyReturn,
} from '../../../../types/url-transformation-strategy';

import asWww from '../as-www';
import normalizeHref from '@blueshift-ui/core/dist/helpers/normalize-href';

/**
 * Creates a URL transformation strategy for client-account application.
 */
const clientAccountUrlTransformationStrategy = ({
  baseURL,
  currentApplicationId,
}: UrlTransformationStrategyArgs): UrlTransformationStrategyReturn => {
  return (href: string, applicationId?: string): string => {
    if (!href) {
      return href;
    }

    const wwwTransformedHref = asWww(normalizeHref(href));

    // If the item belongs to the current application (client-account), keep it relative
    if (applicationId === currentApplicationId) {
      return wwwTransformedHref.replace(/^(https?:\/\/)?(www\.)?[^/]+/, '');
    }

    // Otherwise, transform to www URL using environment-specific base URL
    return wwwTransformedHref.replace(/^\//, `${baseURL}/`);
  };
};

export default clientAccountUrlTransformationStrategy;

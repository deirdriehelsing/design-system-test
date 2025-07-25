import type { UrlTransformationStrategyReturn } from '../../../../types/url-transformation-strategy';

import asWww from '../as-www';
import normalizeHref from '@blueshift-ui/core/dist/helpers/normalize-href';

/**
 * Creates the default URL transformation strategy that normalizes hrefs and converts them to www subdomains.
 * Used for most applications to ensure consistent URL formatting across navigation items.
 */
const defaultUrlTransformationStrategy = (): UrlTransformationStrategyReturn => {
  return (href: string): string => {
    if (!href) {
      return href;
    }

    return asWww(normalizeHref(href));
  };
};

export default defaultUrlTransformationStrategy;

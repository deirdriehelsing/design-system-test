import type { AnalyticsBrowser, InitOptions } from '@segment/analytics-next';
import type { SupplementalEventContextHelpers } from '../../types';

import { applyMiddleware } from '..';

/**
 * Initializes an analytics instance and applies middleware.
 *
 * @note This should only be called once per pageload.
 * @see https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2b-install-segment-as-a-npm-package
 */
function initializeAnalytics(
  analytics: AnalyticsBrowser,
  writeKey: string,
  options?: InitOptions,
  supplementalContextHelpers?: SupplementalEventContextHelpers
) {
  // Defense for empty write key string
  if (!writeKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        'No write key provided to analytics. This will result in no data being sent to Segment.'
      );
    }

    return;
  }

  analytics.load(
    { writeKey },
    {
      ...options,
      integrations: {
        'Segment.io': {
          deliveryStrategy: {
            config: {
              keepalive: true,
            },
          },
        },
        ...options?.integrations,
      },
    }
  );

  applyMiddleware(analytics, supplementalContextHelpers);
}

export default initializeAnalytics;

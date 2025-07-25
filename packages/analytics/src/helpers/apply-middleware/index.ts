import type { AnalyticsBrowser, SegmentEvent } from '@segment/analytics-next';
import type { SupplementalEventContextHelpers } from '../../types';

import { formatEventName, formatPropertyNames, getEventContext } from './helpers';
import merge from 'lodash/merge';

const MIDDLEWARE = new Map([
  [
    'identify',
    (event: SegmentEvent, supplementalContextHelpers?: SupplementalEventContextHelpers) => {
      if (!event.traits) {
        return;
      }

      supplementalContextHelpers?.setSupplementalContext((prevValue) => ({
        ...prevValue,
        user_traits: merge(prevValue?.user_traits, event.traits),
      }));
    },
  ],
  [
    'page',
    (event: SegmentEvent, supplementalContextHelpers?: SupplementalEventContextHelpers) => {
      event.context = getEventContext(event, supplementalContextHelpers);
    },
  ],
  [
    'track',
    (event: SegmentEvent, supplementalContextHelpers?: SupplementalEventContextHelpers) => {
      // Most events should enforce specific formatting for consistency, but some integrations have
      // their own event structure requirements, so we need to bypass formatting when an event
      // asks for it.
      const preserveEventFormat = event.properties?.context?.preserve_event_format;
      if (!preserveEventFormat) {
        event.name = formatEventName(event.name);
        event.properties = formatPropertyNames(event.properties);
      }

      event.context = getEventContext(event, supplementalContextHelpers);
    },
  ],
]);

/**
 * Apply middleware to the passed in analytics instance.
 *
 * @see https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/middleware/
 */
function applyMiddleware(
  analytics: AnalyticsBrowser,
  supplementalContextHelpers?: SupplementalEventContextHelpers
) {
  analytics.addSourceMiddleware(({ payload, next }) => {
    const event = payload.obj;

    MIDDLEWARE.get(event.type)?.(event, supplementalContextHelpers);

    next(payload);
  });
}

export default applyMiddleware;

import type { ContentViewedEvent, EventScope } from '../../types';

import { useAnalytics, useEventScope } from '..';
import { useEffect, useRef } from 'react';
import { ANALYTICS_EVENT_NAMES } from '../../constants';
import { addCommonEventProperties } from '../../helpers';
import isEqual from 'lodash/isEqual';

type PageViewedEvent = {
  [property: string]: any;
  category: string;
};

type UseViewTrackingParams = {
  /**
   * @deprecated, do not use, it will have no affect on this hook, use memoized trackedProperties
   * instead.
   */
  dependencies?: any[];
  /**
   * Whether the view tracking is enabled.
   */
  enabled?: boolean;
} & (
  | {
      trackedProperties: ContentViewedEvent;
      type: 'content';
    }
  | {
      trackedProperties: PageViewedEvent;
      type: 'page';
    }
);

/**
 * Sends page or content viewed events to Segment as a side effect.
 */
function useViewTracking({
  enabled = true,
  trackedProperties,
  type = 'page',
}: UseViewTrackingParams) {
  const analytics = useAnalytics();
  const eventScope = useEventScope();

  const eventScopeCache = useRef<EventScope | null>(null);
  const trackedPropertiesCache = useRef<UseViewTrackingParams['trackedProperties'] | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const eventScopeChanged = eventScopeCache.current !== eventScope;
    const trackedPropertiesChanged = !isEqual(trackedPropertiesCache.current, trackedProperties);

    if (!enabled || (!eventScopeChanged && !trackedPropertiesChanged)) {
      return;
    }

    eventScopeCache.current = eventScope;
    trackedPropertiesCache.current = trackedProperties;

    if (type === 'page') {
      const { category, ...pageProperties } = trackedProperties;
      analytics.page(
        category,
        addCommonEventProperties({ eventScope, trackedProperties: [pageProperties] })
      );
    } else {
      analytics.track(
        ANALYTICS_EVENT_NAMES.contentViewed,
        addCommonEventProperties({ eventScope, trackedProperties: [trackedProperties] })
      );
    }
  }, [analytics, enabled, eventScope, trackedProperties, type]);
}

export default useViewTracking;

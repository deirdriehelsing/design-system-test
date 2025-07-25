import type { ElementClosedEvent, EventScope, TrackedPropertiesParam } from '../../types';
import type { AnalyticsBrowser } from '@segment/analytics-next';

import { ANALYTICS_EVENT_NAMES } from '../../constants';
import { addCommonEventProperties } from '..';

interface TrackElementClosedParams {
  analyticsClient: AnalyticsBrowser;
  elementId: string;
  elementType: string;
  eventScope?: EventScope | null;
  trackedProperties?: (TrackedPropertiesParam<ElementClosedEvent> | undefined)[];
}

function trackElementClosed({
  analyticsClient,
  elementId,
  elementType,
  eventScope,
  trackedProperties,
}: TrackElementClosedParams) {
  const eventProperties: ElementClosedEvent = {
    element_id: elementId,
    element_type: elementType,
    ...addCommonEventProperties({
      eventScope,
      trackedProperties,
    }),
  };

  analyticsClient.track(ANALYTICS_EVENT_NAMES.elementClosed, eventProperties);
}

export default trackElementClosed;

import type { ElementOpenedEvent, EventScope, TrackedPropertiesParam } from '../../types';
import type { AnalyticsBrowser } from '@segment/analytics-next';

import { ANALYTICS_EVENT_NAMES } from '../../constants';
import { addCommonEventProperties } from '..';

interface TrackElementOpenedParams {
  analyticsClient: AnalyticsBrowser;
  elementId: string;
  elementType: string;
  eventScope?: EventScope | null;
  trackedProperties?: (TrackedPropertiesParam<ElementOpenedEvent> | undefined)[];
}

function trackElementOpened({
  analyticsClient,
  elementId,
  elementType,
  eventScope,
  trackedProperties,
}: TrackElementOpenedParams) {
  const eventProperties: ElementOpenedEvent = {
    element_id: elementId,
    element_type: elementType,
    ...addCommonEventProperties({
      eventScope,
      trackedProperties,
    }),
  };

  analyticsClient.track(ANALYTICS_EVENT_NAMES.elementOpened, eventProperties);
}

export default trackElementOpened;

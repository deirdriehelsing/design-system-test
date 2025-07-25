import type { ElementClickedEvent, EventScope, TrackedPropertiesParam } from '../../types';
import type { AnalyticsBrowser } from '@segment/analytics-next';
import type { MouseEvent } from 'react';

import { ANALYTICS_EVENT_NAMES } from '../../constants';
import addCommonEventProperties from '../add-common-event-properties';
import getElementText from '../get-element-text';

interface TrackElementClickedParams<Element extends HTMLElement> {
  /**
   * The analytics client to use to track the event.
   */
  analyticsClient: AnalyticsBrowser;
  /**
   * The event that was triggered.
   */
  event: MouseEvent<Element>;
  /**
   * Event scope properties to be added to the event payload.
   */
  eventScope?: EventScope | null;
  /**
   * An array of tracked property objects that will be merged into one object, left to right.
   */
  trackedProperties?: (TrackedPropertiesParam<ElementClickedEvent> | undefined)[];
}

function trackElementClicked<Element extends HTMLElement>({
  analyticsClient,
  event,
  eventScope,
  trackedProperties,
}: TrackElementClickedParams<Element>) {
  const element = event.currentTarget;
  const eventProperties: Partial<ElementClickedEvent> = {
    element_id: element.id,
    element_text: getElementText(element),
    element_type: element.tagName.toLowerCase(),
    ...addCommonEventProperties({ eventScope, trackedProperties }),
  };

  analyticsClient.track(ANALYTICS_EVENT_NAMES.elementClicked, eventProperties);
}

export default trackElementClicked;

import type { EventScope, TrackedPropertiesParam } from '../../types';

import merge from 'lodash/merge';

type AddEventContextPropertiesParams<TrackedEvent> = {
  eventScope?: EventScope | null;
  /**
   * An array of tracked property objects that will be merged into one object, left to right.
   */
  trackedProperties?: (TrackedPropertiesParam<TrackedEvent> | undefined)[];
};

function addCommonEventProperties<TrackedEvent>({
  eventScope,
  trackedProperties = [],
}: AddEventContextPropertiesParams<TrackedEvent>) {
  return {
    page_path: window.location.pathname,
    page_section: eventScope?.pageSection,
    ...merge({ metadata: eventScope?.metadata }, ...trackedProperties),
  };
}

export default addCommonEventProperties;

import type {
  ElementClosedEvent,
  ElementOpenedEvent,
  UseElementVisibilityHandlersParams,
} from '../../types';

import { trackElementClosed, trackElementOpened } from '../../helpers';
import { useAnalytics, useEventScope } from '..';
import { useCallback } from 'react';

/**
 * A hook that can be used to track when an element is opened or closed. This hook can be used for
 * elements such as:
 * - Accordions
 * - Dialogs
 * - Drawers
 * - Menus
 */
function useElementVisibilityHandlers({
  elementType,
  id,
  trackedProperties,
  trackingDisabled = false,
}: UseElementVisibilityHandlersParams) {
  const analytics = useAnalytics();
  const eventScope = useEventScope();

  const handleElementClosed = useCallback(
    (eventTrackedProperties?: Partial<ElementClosedEvent>) => {
      if (trackingDisabled) {
        return;
      }

      trackElementClosed({
        analyticsClient: analytics,
        elementId: id,
        elementType,
        eventScope,
        trackedProperties: [trackedProperties?.close, eventTrackedProperties],
      });
    },
    [analytics, elementType, eventScope, id, trackedProperties?.close, trackingDisabled]
  );

  const handleElementOpened = useCallback(
    (eventTrackedProperties?: Partial<ElementOpenedEvent>) => {
      if (trackingDisabled) {
        return;
      }

      trackElementOpened({
        analyticsClient: analytics,
        elementId: id,
        elementType,
        eventScope,
        trackedProperties: [trackedProperties?.open, eventTrackedProperties],
      });
    },
    [analytics, elementType, eventScope, id, trackedProperties?.open, trackingDisabled]
  );

  return { handleElementClosed, handleElementOpened };
}

export default useElementVisibilityHandlers;

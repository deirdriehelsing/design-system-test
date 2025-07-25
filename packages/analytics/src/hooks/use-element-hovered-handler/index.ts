import type { ElementHoveredEvent, UseHandlerParams } from '../../types';
import type { MouseEvent } from 'react';

import { addCommonEventProperties, getElementText } from '../../helpers';
import { useAnalytics, useEventScope } from '../../hooks';
import { ANALYTICS_EVENT_NAMES } from '../../constants';
import { useCallback } from 'react';

type UseElementHoveredHandlerParams<Element extends HTMLElement> =
  UseHandlerParams<ElementHoveredEvent> & {
    /**
     * A callback handler function, called when the element is hovered.
     *
     * @note When set, this must always be a stable function reference. Use useCallback or define it
     * at a higher scope than the component that uses it.
     */
    onHover?: (event?: MouseEvent<Element>) => void;
  };

function useElementHoveredHandler<Element extends HTMLElement = HTMLButtonElement>({
  onHover,
  trackedProperties,
  trackingDisabled = false,
}: UseElementHoveredHandlerParams<Element> = {}) {
  const analytics = useAnalytics();
  const eventScope = useEventScope();

  const handleElementHovered = useCallback(
    (event: MouseEvent<Element>, eventTrackedProperties?: Partial<ElementHoveredEvent>) => {
      if (!trackingDisabled) {
        const element = event.currentTarget;
        const eventProperties: Partial<ElementHoveredEvent> = {
          element_id: element.id,
          element_text: getElementText(element),
          element_type: element.tagName.toLowerCase(),
          ...addCommonEventProperties({
            eventScope,
            trackedProperties: [trackedProperties, eventTrackedProperties],
          }),
        };

        analytics.track(ANALYTICS_EVENT_NAMES.elementHovered, eventProperties);
      }

      // 1. If tracking is disabled, we still want to call the passed in handler if provided.
      // 2. This needs to be called last so we can guarantee that the tracked analytic properties
      //    are correct.
      onHover?.(event);
    },
    [analytics, eventScope, onHover, trackedProperties, trackingDisabled]
  );

  return handleElementHovered;
}

export default useElementHoveredHandler;

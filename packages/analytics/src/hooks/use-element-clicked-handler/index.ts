import type { ElementClickedEvent, UseHandlerParams } from '../../types';
import type { MouseEvent } from 'react';

import { useAnalytics, useEventScope } from '../../hooks';
import { trackElementClicked } from '../../helpers';
import { useCallback } from 'react';

type UseElementClickedHandlerParams<Element extends HTMLElement> =
  UseHandlerParams<ElementClickedEvent> & {
    /**
     * A callback handler function, called when the element is clicked.
     *
     * @note When set, this must always be a stable function reference. Use useCallback or define it
     * at a higher scope than the component that uses it.
     */
    onClick?: (event?: MouseEvent<Element>) => void;
  };

function useElementClickedHandler<Element extends HTMLElement = HTMLButtonElement>({
  onClick,
  trackedProperties,
  trackingDisabled = false,
}: UseElementClickedHandlerParams<Element> = {}) {
  const analytics = useAnalytics();
  const eventScope = useEventScope();

  const handleElementClicked = useCallback(
    (event: MouseEvent<Element>, eventTrackedProperties?: Partial<ElementClickedEvent>) => {
      if (!trackingDisabled) {
        trackElementClicked<Element>({
          analyticsClient: analytics,
          event,
          eventScope,
          trackedProperties: [trackedProperties, eventTrackedProperties],
        });
      }

      // 1. If tracking is disabled, we still want to call the passed in handler if provided.
      // 2. This needs to be called last so we can guarantee that the tracked analytic properties
      //    are correct.
      onClick?.(event);
    },
    [analytics, eventScope, onClick, trackedProperties, trackingDisabled]
  );

  return handleElementClicked;
}

export default useElementClickedHandler;

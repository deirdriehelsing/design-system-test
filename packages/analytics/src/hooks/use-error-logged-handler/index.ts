import type { ErrorLoggedEvent, UseHandlerParams } from '../../types';

import { useAnalytics, useEventScope } from '../../hooks';
import { ANALYTICS_EVENT_NAMES } from '../../constants';
import { addCommonEventProperties } from '../../helpers';
import { useCallback } from 'react';

type UseErrorLoggedHandlerParams<HandledError extends Error> =
  UseHandlerParams<ErrorLoggedEvent> & {
    /**
     * A callback handler function, called when the element is clicked.
     *
     * @note When set, this must always be a stable function reference. Use useCallback or define it
     * at a higher scope than the component that uses it.
     */
    onErrorLogged?: (error?: HandledError) => void;
    /**
     * The minimum set of properties to track.
     *
     * @note This must always be a stable object reference. Use useMemo or define it at a higher
     * scope than the component that uses it.
     */
    trackedProperties: Partial<ErrorLoggedEvent> & {
      error_category: string;
      error_severity: ErrorLoggedEvent['error_severity'];
      user_impact: ErrorLoggedEvent['user_impact'];
    };
  };

function useErrorLoggedHandler<HandledError extends Error>({
  onErrorLogged,
  trackedProperties,
  trackingDisabled = false,
}: UseErrorLoggedHandlerParams<HandledError>) {
  const analytics = useAnalytics();
  const eventScope = useEventScope();

  const handleErrorLogged = useCallback(
    (error: HandledError, errorTrackedProperties?: Partial<ErrorLoggedEvent>) => {
      if (!trackingDisabled) {
        const eventProperties: Partial<ErrorLoggedEvent> = {
          error_message: String(error),
          ...addCommonEventProperties({
            eventScope,
            trackedProperties: [trackedProperties, errorTrackedProperties],
          }),
        };

        analytics.track(ANALYTICS_EVENT_NAMES.errorLogged, eventProperties);
      }

      // 1. If tracking is disabled, we still want to call the passed in handler if provided.
      // 2. This needs to be called last so we can guarantee that the tracked analytic properties
      //    are correct.
      onErrorLogged?.(error);
    },
    [analytics, eventScope, onErrorLogged, trackedProperties, trackingDisabled]
  );

  return handleErrorLogged;
}

export default useErrorLoggedHandler;

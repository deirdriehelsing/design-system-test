import type { TrackEventParams } from '../../types';

import { useEffect, useRef } from 'react';
import useInteractionTracker from '../use-interaction-tracker';

function useViewTracking(params: TrackEventParams, enabled = true) {
  const { trackEvent } = useInteractionTracker();
  const paramCache = useRef<TrackEventParams>();

  useEffect(() => {
    if (JSON.stringify(paramCache.current) === JSON.stringify(params)) {
      return;
    }

    if (enabled) {
      paramCache.current = params;
      trackEvent(params);
    }
  }, [params, trackEvent, enabled]);
}

export default useViewTracking;

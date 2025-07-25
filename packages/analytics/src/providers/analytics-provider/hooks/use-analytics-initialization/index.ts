import type { InitOptions } from '@segment/analytics-next';

import { useCallback, useEffect } from 'react';
import { analyticsBrowser } from '../../../../clients';
import { initializeAnalytics } from '../../../../helpers';
import { supplementalEventContextAtom } from '../../../../state';
import { useAtomCallback } from 'jotai/utils';
import { useSetAtom } from 'jotai';

/**
 * Initializes Segment's browser analytics client.
 */
function useAnalyticsInitialization(writeKey?: string, options?: InitOptions) {
  const getSupplementalContext = useAtomCallback(
    useCallback((get) => get(supplementalEventContextAtom), [])
  );
  const setSupplementalContext = useSetAtom(supplementalEventContextAtom);

  useEffect(() => {
    if (!writeKey) {
      return;
    }

    const supplementalContextHelpers = { getSupplementalContext, setSupplementalContext };

    initializeAnalytics(analyticsBrowser, writeKey, options, supplementalContextHelpers);
  }, [getSupplementalContext, options, setSupplementalContext, writeKey]);
}

export default useAnalyticsInitialization;

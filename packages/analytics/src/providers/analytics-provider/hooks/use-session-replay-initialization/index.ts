import type { SessionReplayOptions } from '@amplitude/session-replay-browser';

import { analyticsBrowser } from '../../../../clients';
import { initializeSessionReplay } from '../../../../helpers';
import { useEffect } from 'react';

/**
 * Initializes Amplitude's session replay feature.
 *
 * @note When set, `options` must always be a stable object reference. Use useMemo or define it at a
 * scope higher than the component that uses it. Otherwise, it will cause unnecessary re-renders and
 * duplicative initializations.
 */
function useSessionReplayInitialization(apiKey?: string, options?: SessionReplayOptions) {
  useEffect(() => {
    initializeSessionReplay(analyticsBrowser, apiKey, options);
  }, [apiKey, options]);
}

export default useSessionReplayInitialization;

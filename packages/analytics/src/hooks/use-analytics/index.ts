import { analyticsBrowser } from '../../clients';

/**
 * Provides access to the analytics instance
 *
 * @note This hook must be used in a child of an {@link AnalyticsProvider}.
 */
function useAnalytics() {
  // It's technically not necessary to access this via a hook. This hook exists primarily to provide
  // an idiomatic way to access the analytics instance.
  return analyticsBrowser;
}

export default useAnalytics;

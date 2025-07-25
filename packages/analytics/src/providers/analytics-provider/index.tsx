import type { InitOptions } from '@segment/analytics-next';
import type { PropsWithChildren } from 'react';
import type { SessionReplayOptions } from '@amplitude/session-replay-browser';

import {
  useAnalyticsInitialization,
  useGuidesAndSurveysInitialization,
  useSessionReplayInitialization,
  useSpaUrlStorage,
} from './hooks';

const DEFAULT_OPTIONS = {};

type AnalyticsProviderProps = PropsWithChildren<{
  /**
   * Optional API key for Amplitude's guides and surveys. If not provided, guides and surveys will
   * not be enabled.
   *
   * @note This API key can be the same as the `sessionReplayKey` if you want to use the same API
   * key for both guides and surveys and session replays.
   */
  guidesAndSurveysKey?: string;
  /**
   * Flag to indicate if the application is a SPA. If true, the provider will customize how the
   * referrer is tracked
   * @default false
   * @see: https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/single-page-apps/
   */
  isSpa?: boolean;
  /**
   * Optional options for Segment's browser analytics client.
   *
   * @note When set, `sessionReplayOptions` must always be a stable object reference. Use useMemo or
   * define it at a scope higher than the component that uses it. Otherwise, it will cause unnecessary
   * re-renders and duplicative initializations.
   */
  options?: InitOptions;
  /**
   * Optional API key for Amplitude's session replays. If not provided, session replays will not
   * be enabled.
   *
   * @note This API key can be the same as the `guidesAndSurveysKey` if you want to use the same API
   * key for both guides and surveys and session replays.
   */
  sessionReplayKey?: string;
  /**
   * Optional options for Amplitude's session replays.
   *
   * @note When set, `sessionReplayOptions` must always be a stable object reference. Use useMemo or
   * define it at a scope higher than the component that uses it. Otherwise, it will cause unnecessary
   * re-renders and duplicative initializations.
   */
  sessionReplayOptions?: SessionReplayOptions;
  /**
   * Optional write key for Segment's browser analytics client. If not provided, analytics will not
   * be enabled.
   */
  writeKey?: string;
}>;

/**
 * Initializes Segment's browser analytics client and Amplitude's session replays (optionally).
 * Without this, events won't be sent.
 */
function AnalyticsProvider({
  children,
  guidesAndSurveysKey,
  isSpa = false,
  options = DEFAULT_OPTIONS,
  sessionReplayKey,
  sessionReplayOptions,
  writeKey,
}: AnalyticsProviderProps) {
  useAnalyticsInitialization(writeKey, options);

  useGuidesAndSurveysInitialization(guidesAndSurveysKey);

  useSessionReplayInitialization(sessionReplayKey, sessionReplayOptions);

  useSpaUrlStorage({ enabled: isSpa });

  return <>{children}</>;
}

export default AnalyticsProvider;

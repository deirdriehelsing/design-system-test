import type { AnalyticsBrowser } from '@segment/analytics-next';
import type { SessionReplayOptions } from '@amplitude/session-replay-browser';

import * as sessionReplay from '@amplitude/session-replay-browser';
import { getStoredSessionId, setStoredSessionId } from './helpers';
import ANALYTICS_EVENT_NAMES from '../../constants/generated/analytics-event-names';

type AmplitudeIntegration =
  | undefined
  | {
      session_id?: number;
    };

/**
 * Initializes Amplitude's session replay feature.
 *
 * @see: https://amplitude.com/docs/session-replay/session-replay-integration-with-segment#amplitude-actions-destination
 */
async function initializeSessionReplay(
  analytics: AnalyticsBrowser,
  apiKey?: string,
  options?: SessionReplayOptions
) {
  if (!apiKey) {
    return;
  }

  await analytics.ready(async () => {
    const user = await analytics.user();

    await sessionReplay.init(apiKey, {
      sessionId: getStoredSessionId(),
      deviceId: user.anonymousId() as string,
      ...options,
    }).promise;

    analytics.track(ANALYTICS_EVENT_NAMES.initializeAmplitudeSession);

    analytics.addSourceMiddleware(({ payload, next }) => {
      // 1. Check if the session id has changed. If so, update the session replay instance
      const storedSessionId = Number(getStoredSessionId());
      const integration = payload.obj.integrations?.['Actions Amplitude'] as AmplitudeIntegration;
      const nextSessionId = integration?.session_id ?? 0;

      if (storedSessionId < nextSessionId) {
        setStoredSessionId(nextSessionId);
        sessionReplay.setSessionId(nextSessionId);
      }

      // 2. Add session replay properties to track calls
      if (payload.type() === 'track') {
        payload.obj.properties = {
          ...payload.obj.properties,
          ...sessionReplay.getSessionReplayProperties(),
        };
      }

      next(payload);
    });
  });
}

export default initializeSessionReplay;

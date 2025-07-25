import type { AnalyticsBrowser } from '@segment/analytics-next';
import type { BaseEvent } from '@amplitude/analytics-types';

import ANALYTICS_EVENT_NAMES from '../../constants/generated/analytics-event-names';
import merge from 'lodash/merge';

interface EngagementIntegration {
  track: (event: BaseEvent) => void;
}

interface EngagementUser {
  device_id?: string;
  user_id?: string;
  user_properties?: Record<string, any>;
}

type EngagementBootOptions = {
  integrations: EngagementIntegration[];
  user: EngagementUser | (() => EngagementUser);
};

declare global {
  interface Window {
    engagement?: {
      boot: (options: EngagementBootOptions) => Promise<void>;
      forwardEvent: (event: BaseEvent) => void;
    };
  }
}

/**
 * Initializes Amplitude's guides and surveys feature.
 *
 * @see: https://amplitude.com/docs/guides-and-surveys/sdk
 */
async function initializeGuidesAndSurveys(analytics: AnalyticsBrowser, apiKey?: string) {
  if (!apiKey) {
    return;
  }

  if (window.engagement) {
    // If the engagement SDK is already initialized, we don't need to do anything.
    return;
  }

  // We need to import the engagement SDK at runtime. This is because the engagement SDK modifies
  // the window object at import time. This is a workaround while we don't support the use of
  // `'use client';` in our SSG/SSR builds.
  const { init: engagementInit } = await import('@amplitude/engagement-browser');

  engagementInit(apiKey);

  await analytics.ready(async () => {
    const user = await analytics.user();

    await window.engagement?.boot({
      integrations: [
        {
          track: (event) => {
            // Tracks user interactions with guides and surveys through Segment.
            analytics.track(
              event.event_type,
              merge({}, event.event_properties, {
                context: {
                  // We need to preserve the event format because Amplitude's SDK adds a specific
                  // prefix to the event name that is necessary for measuring interactions with
                  // Guides and Surveys.
                  preserve_event_format: true,
                },
              })
            );
          },
        },
      ],
      user: {
        device_id: user.anonymousId() ?? undefined,
        user_id: user.id() ?? undefined,
        user_properties: {},
      },
    });

    analytics.track(ANALYTICS_EVENT_NAMES.initializeAmplitudeGuidesAndSurveys);

    // Forward events from segment for event-based Guide/Survey triggers
    // Note: These events aren't sent to the Amplitude server
    analytics.addSourceMiddleware(({ payload, next }) => {
      if (['page', 'track'].includes(payload.type()) && payload.obj.event) {
        window.engagement?.forwardEvent({
          event_type: payload.obj.event,
          event_properties: payload.obj.properties,
        });
      }

      next(payload);
    });
  });
}

export default initializeGuidesAndSurveys;

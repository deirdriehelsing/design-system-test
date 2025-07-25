import type {
  IdentifyEventParams,
  InteractionTrackerParams,
  TrackEventParams,
} from '../../../../types';

import { ActionTracker, SegmentTracker } from '@varsitytutors/event-tracker';
import getBrowserSessionId from '../../../../helpers/get-browser-session-id';
import getInteractionPayload from '../../../../helpers/get-interaction-payload';
import getVisitorId from '../../../../helpers/get-visitor-id';
import identifySegmentTracker from './helpers/identify-segment-tracker';
import logHandledError from '../../../../helpers/log-handled-error';
import trackActionTracker from './helpers/track-action-tracker';
import trackNewRelic from './helpers/track-new-relic';
import trackSegmentTracker from './helpers/track-segment-tracker';
import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';

function useEventTracker({
  applicationId,
  clientUuid,
  disabled = process.env.NODE_ENV === 'development',
  newRelicDisabled = true,
  preview = false,
  segmentDisabled = true,
  segmentWriteKey,
  userId,
  useFormatData = false,
  visitorId,
  entity,
}: InteractionTrackerParams) {
  const actionTracker = useMemo(() => {
    if (disabled) {
      return null;
    }

    return new ActionTracker({
      applicationId,
      endpoint: `https://events.${
        preview ? 'vtstaging' : 'varsitytutors'
      }.com/v2/pages/interaction`,
    });
  }, [applicationId, disabled, preview]);

  const segmentTracker = useMemo(() => {
    if (segmentDisabled) {
      return null;
    }
    if (!segmentWriteKey) {
      logHandledError('Segment write key is required');
      return null;
    }

    return new SegmentTracker(segmentWriteKey, {
      segmentOptions: {
        integrations: {
          'Segment.io': {
            deliveryStrategy: {
              config: {
                keepalive: true,
              },
            },
          },
        },
      },
    });
  }, [segmentDisabled, segmentWriteKey]);

  return useMemo(
    () => ({
      trackEvent: async (params: TrackEventParams) => {
        const interaction = getInteractionPayload(
          {
            action: params.action,
            category: params.category,
            // llt-event-gateway expects a max length of 200 for the label
            label: params.label ? params.label.slice(0, 200) : undefined,
            value: params.value,
            clientUuid,
            sessionId: getBrowserSessionId(),
            visitorId: visitorId ?? getVisitorId(),
            pageRequestId: params.request_id ?? uuid(),
            userId,
            entity,
            domEventData: {
              target: 'page',
              ...params.dom_event_data,
            },
            tests: params.tests,
            divisionId: params.division_id,
            flagEvaluationDetail: params.flagEvaluationDetail,
          },
          {
            useFormatData,
          }
        );
        await trackActionTracker(actionTracker, interaction);

        await trackSegmentTracker(segmentTracker, { ...interaction, applicationId });

        if (!newRelicDisabled) {
          trackNewRelic(interaction);
        }
      },
      identify: async (params: IdentifyEventParams) => {
        await identifySegmentTracker(segmentTracker, params);
      },
    }),
    [
      clientUuid,
      userId,
      actionTracker,
      newRelicDisabled,
      segmentTracker,
      useFormatData,
      applicationId,
      visitorId,
      entity,
    ]
  );
}

export default useEventTracker;

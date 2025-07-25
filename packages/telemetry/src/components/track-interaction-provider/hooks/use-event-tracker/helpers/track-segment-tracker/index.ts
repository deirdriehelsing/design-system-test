import type { InteractionSchema, SegmentTracker } from '@varsitytutors/event-tracker';

import logHandledError from '../../../../../../helpers/log-handled-error';

async function trackSegmentTracker(
  segmentTracker: SegmentTracker | null,
  interaction: InteractionSchema
) {
  const action = interaction?.customEventData?.action;
  if (!segmentTracker) {
    return;
  }
  if (!action) {
    logHandledError('TrackInteractionProvider: action is required for tracking', { interaction });
    return;
  }

  const { success, message } = await segmentTracker.track({
    eventName: action,
    properties: interaction,
  });
  if (success !== true) {
    logHandledError('SegmentTracker: Error tracking user interaction event', { message });
  }
}

export default trackSegmentTracker;

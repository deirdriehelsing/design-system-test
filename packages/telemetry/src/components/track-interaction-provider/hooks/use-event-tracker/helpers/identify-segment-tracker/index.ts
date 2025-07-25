import type { IdentifyEventParams } from '../../../../../../types/identify-event-params';
import type { SegmentTracker } from '@varsitytutors/event-tracker';

import logHandledError from '../../../../../../helpers/log-handled-error';

async function identifySegmentTracker(
  segmentTracker: SegmentTracker | null,
  params: IdentifyEventParams
) {
  if (!segmentTracker) {
    return;
  }
  if (!params.userId) {
    logHandledError('TrackInteractionProvider: userId is required for identifying an user', params);
    return;
  }

  const { success, message } = await segmentTracker.identify(params);
  if (success !== true) {
    logHandledError('SegmentTracker: Error identifying user', { message });
  }
}

export default identifySegmentTracker;

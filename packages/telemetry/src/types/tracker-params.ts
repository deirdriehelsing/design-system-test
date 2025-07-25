import type { TrackEntity } from './track-entity';

interface InteractionTrackerParams {
  applicationId: string;
  clientUuid?: string;
  disabled?: boolean;
  entity?: TrackEntity;
  newRelicDisabled?: boolean;
  preview?: boolean;
  segmentDisabled?: boolean;
  segmentWriteKey?: string;
  useFormatData?: boolean;
  userId?: string;
  visitorId?: string;
}

export type { InteractionTrackerParams };

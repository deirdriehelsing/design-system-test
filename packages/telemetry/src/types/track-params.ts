import type { DomEventData } from './dom-event-data';
import type { LDEvaluationDetail } from '@blueshift-ui/core/dist/types/launchdarkly';
import type { TrackEntity } from './track-entity';

interface Test {
  experimentId: string;
  variantId: string;
}

interface TrackEventParams {
  action: string;
  category: string;
  content_version?: string;
  division_id?: string;
  dom_event_data?: DomEventData;
  entity?: TrackEntity;
  flagEvaluationDetail?: LDEvaluationDetail;
  label?: string;
  request_id?: string;
  tests?: Test[];
  value?: string;
}

export type { Test, TrackEventParams };

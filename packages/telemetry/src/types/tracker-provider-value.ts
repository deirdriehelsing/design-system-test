import type { IdentifyEventParams, TrackEventParams } from '.';

interface TrackInteractionProviderValue {
  identify: (params: IdentifyEventParams) => Promise<Response | void>;
  trackEvent: (params: TrackEventParams) => Promise<Response | void>;
}

export type { TrackInteractionProviderValue };

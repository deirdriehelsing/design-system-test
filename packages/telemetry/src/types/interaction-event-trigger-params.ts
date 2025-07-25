import type { TrackEventParams } from './track-params';

interface InteractionEventTriggerParams {
  analytics: TrackEventParams | ((...args: any[]) => any);
  children?: React.ReactNode;
  element: React.ElementType | string;
  elementProps?: React.PropsWithChildren<any>;
  trigger?: string;
}

export type { InteractionEventTriggerParams };

import type { InteractionTrackerParams } from '../../types';
import type { PropsWithChildren } from 'react';

import TrackInteractionContext from '../../contexts/track-interaction-context';
import useEventTracker from './hooks/use-event-tracker';

type TrackInteractionProviderProps = InteractionTrackerParams & PropsWithChildren<unknown>;

function TrackInteractionProvider({ children, ...trackerParams }: TrackInteractionProviderProps) {
  const { trackEvent, identify } = useEventTracker(trackerParams);
  return (
    <TrackInteractionContext.Provider
      value={{
        trackEvent,
        identify,
      }}
    >
      {children}
    </TrackInteractionContext.Provider>
  );
}

export default TrackInteractionProvider;

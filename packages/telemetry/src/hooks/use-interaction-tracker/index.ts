import type { TrackInteractionProviderValue } from '../../types';

import TrackInteractionContext from '../../contexts/track-interaction-context';
import { useContext } from 'react';

function useInteractionTracker() {
  return useContext<TrackInteractionProviderValue>(TrackInteractionContext);
}

export default useInteractionTracker;

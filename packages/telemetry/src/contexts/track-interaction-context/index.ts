import type {
  IdentifyEventParams,
  TrackEventParams,
  TrackInteractionProviderValue,
} from '../../types';

import React from 'react';
import logHandledError from '../../helpers/log-handled-error';

const TrackInteractionContext = React.createContext<TrackInteractionProviderValue>({
  identify: (_params: IdentifyEventParams) => {
    logHandledError(
      'Missing `TrackInteractionProvider`. Components that use `identify` need to be wrapped in a `TrackInteractionProvider`'
    );
    return Promise.resolve();
  },
  trackEvent: (_params: TrackEventParams) => {
    logHandledError(
      'Missing `TrackInteractionProvider`. Components that use `trackEvent` need to be wrapped in a `TrackInteractionProvider`'
    );
    return Promise.resolve();
  },
});

export default TrackInteractionContext;

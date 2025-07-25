import type { InteractionEventTriggerParams } from '../../types/interaction-event-trigger-params';

import React from 'react';
import callable from '../../helpers/callable';
import useInteractionTracker from '../../hooks/use-interaction-tracker';

function InteractionEventTrigger({
  analytics,
  children,
  element: Element,
  elementProps,
  trigger = 'onClick',
}: InteractionEventTriggerParams) {
  elementProps = elementProps || {};
  const { trackEvent } = useInteractionTracker();

  const handleTrigger = React.useCallback(
    function _handleTrigger(...args: any[]) {
      if (elementProps[trigger]) {
        // We're coopting the trigger (onClick by default), so we need to make sure to fire the
        // event from `elementProps` too (with any passed-in args) if it exists.
        elementProps[trigger](...args);
      }
      trackEvent(callable(analytics)(...args));
    },
    [analytics, elementProps, trackEvent, trigger]
  );

  return (
    <Element
      {...{
        ...elementProps,
        [trigger]: handleTrigger,
      }}
    >
      {children}
    </Element>
  );
}

export default InteractionEventTrigger;

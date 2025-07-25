import type { EventScopeProps } from '../../types';
import type { PropsWithChildren } from 'react';

import { EventScopeContext } from '../../state';
import merge from 'lodash/merge';
import useEventScope from '../../hooks/use-event-scope';
import { useMemo } from 'react';

/**
 * Provides an event scope to a subtree using React Context.
 *
 * This replaces the previous Jotai implementation in order to increase adoption by removing the
 * dependency on jotai-scope, which requires React 18 or newer.
 */
function EventScopeProvider({
  children,
  eventScope,
  inheritParentScope = false,
}: PropsWithChildren<EventScopeProps>) {
  const parentEventScope = useEventScope();

  const eventScopeValue = useMemo(
    () => (inheritParentScope ? merge({}, parentEventScope, eventScope) : eventScope),
    [inheritParentScope, eventScope, parentEventScope]
  );

  return (
    <EventScopeContext.Provider value={eventScopeValue}>{children}</EventScopeContext.Provider>
  );
}

export default EventScopeProvider;

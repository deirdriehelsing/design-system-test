import type { StateMachineParams } from '../../types';

import { useCallback, useState } from 'react';

const _shouldTransition = <T>(transitioningState: T | boolean | void): transitioningState is T =>
  !['boolean', 'undefined'].includes(typeof transitioningState);

/**
 * Sets up a simple Finite State Machine that can transition between states
 * and sends events before and after transitioning. The events can be interrupted,
 * cancelled, or redirected to a new state.
 */
function useStateMachine<T>(
  initialState: T,
  params: StateMachineParams<T> = {}
): {
  state: T;
  transition: (toState: T) => Promise<void>;
} {
  const [state, setState] = useState<T>(initialState);

  const transition = useCallback(
    async (toState: T): Promise<void> => {
      const transitioningState = await params.onTransitioning?.(toState, state);

      // we can interrupt transition by returning false from the callback
      if (transitioningState === false) {
        return;
      }

      // we can redirect transition by returning a new state from the callback
      if (_shouldTransition<T>(transitioningState)) {
        return transition(transitioningState);
      }

      setState(toState);

      // we can continue transitioning by returning a new state from the callback
      const transitionedState = await params.onTransitioned?.(toState, state);
      if (_shouldTransition<T>(transitionedState)) {
        return transition(transitionedState);
      }
    },
    [params, state]
  );

  return { state, transition };
}

export default useStateMachine;

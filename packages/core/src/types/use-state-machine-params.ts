export interface StateMachineParams<T> {
  /**
   * Called after the state machine has successfully transitioned to a new state.
   * If you return a state value, it will continue transitioning.
   */
  onTransitioned?: (toState: T, fromState: T) => Promise<void | T> | void | T;
  /**
   * Called when the state machine starts transitioning to a new state.
   * Return false to cancel the transition, or return a state value to redirect.
   */
  onTransitioning?: (toState: T, fromState: T) => Promise<boolean | void | T> | boolean | void | T;
}

import type { EventScope } from './event-scope';

type EventScopeProps = {
  /**
   * Event scope properties to aid in event grouping.
   *
   * @note
   * - This must always be a stable object reference. Use useMemo or define it at a higher
   * scope than the component that uses it.
   * - These properties will be merged with an event payload. If the same property is present in
   * both the event payload and the event context, the value from the event payload will be used.
   */
  eventScope: EventScope;
  /**
   * Whether to inherit the event scope from a parent EventScopeProvider component and merge it
   * with the event scope defined in the current component.
   *
   * @default false
   */
  inheritParentScope?: boolean;
};

export type { EventScopeProps };

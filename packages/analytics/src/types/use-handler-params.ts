import type { TrackedPropertiesParam } from '.';

type UseHandlerParams<TrackedEvent> = {
  /**
   * Additional properties to include in the event payload.
   *
   * @note This must always be a stable object reference. Use useMemo or define it at a higher
   * scope than the component that uses it.
   */
  trackedProperties?: TrackedPropertiesParam<TrackedEvent>;
  /**
   * Whether to disable event tracking for the handler. When true, the handler will still call the
   * passed in callback if provided.
   */
  trackingDisabled?: boolean;
};

export type { UseHandlerParams };

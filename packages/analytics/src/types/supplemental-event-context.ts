import type { UserTraits } from './user-traits';

/**
 * Supplemental event context data to aid in event filtering and grouping.
 *
 * These properties will be merged with event payload. If the same property is present in both the
 * event payload and the event context, the value from the event payload will be used.
 */
type SupplementalEventContext = {
  /**
   * Traits associated with the user that triggered the event.
   */
  user_traits?: UserTraits;
};

export type { SupplementalEventContext };

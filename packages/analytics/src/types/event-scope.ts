type EventScope = {
  /**
   * Metadata to include about the event context.
   */
  metadata?: Record<string, unknown>;
  /**
   * The section of the page where the event will occur.
   */
  pageSection: string;
};

export type { EventScope };

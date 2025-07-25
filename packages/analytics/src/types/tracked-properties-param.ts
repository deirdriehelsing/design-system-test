type TrackedPropertiesParam<TrackedEvent> = Partial<TrackedEvent> & {
  metadata?: Record<string, unknown>;
  page_section?: string;
};

export type { TrackedPropertiesParam };

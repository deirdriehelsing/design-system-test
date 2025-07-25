import type { BaseClientRequestOptions } from '.';

// Merges base request options with client-specific request options
type CustomClientRequestOptions<TRequestOptions = unknown> = BaseClientRequestOptions &
  Omit<TRequestOptions, keyof BaseClientRequestOptions>;

export type { CustomClientRequestOptions };

import type { CustomClientRequestOptions } from '.';

interface ParseRequestKeyOptions<TRequestOptions = any> {
  key?: unknown | unknown[];
  loadInBackground?: boolean;
  request?: CustomClientRequestOptions<TRequestOptions>;
}

export type { ParseRequestKeyOptions };

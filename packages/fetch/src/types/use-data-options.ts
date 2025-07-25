import type { CustomClientRequestOptions, QueryFunctionContext, UseQueryOptions } from '.';

interface UseDataOptions<TResponse, TSelectResult = unknown, TRequestOptions = any> {
  /** If true, the query will automatically cancel when its component unmounts, to save bandwidth */
  cancellable?: boolean;
  loadInBackground?: boolean;
  queryFn?: (context: QueryFunctionContext) => Promise<TResponse>;
  queryKey: unknown | unknown[];
  queryOptions?: UseQueryOptions<TResponse, TSelectResult>;
  request?: CustomClientRequestOptions<TRequestOptions>;
}

export type { UseDataOptions };

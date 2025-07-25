import type { CustomClientRequestOptions, QueryFunctionContext } from '.';
import type { UseInfiniteQueryOptions as ReactQueryUseInfiniteQueryOptions } from '@tanstack/react-query';

// React Query types for options are extremely convoluted
// These are simply wrappers to make it easier to type the options
type UseInfiniteQueryOptions<TResponse, TSelectResult = unknown> = Omit<
  ReactQueryUseInfiniteQueryOptions<TResponse, unknown, TSelectResult>,
  'queryKey' | 'queryFn'
>;

interface UseInfiniteDataOptions<TResponse, TSelectResult = unknown, TRequestOptions = any> {
  loadInBackground?: boolean;
  pageParamName?: string;
  queryFn?: (context: QueryFunctionContext) => Promise<TResponse>;
  queryKey?: unknown | unknown[];
  queryOptions?: UseInfiniteQueryOptions<TResponse, TSelectResult>;
  request?: CustomClientRequestOptions<TRequestOptions>;
}

export type { UseInfiniteDataOptions };

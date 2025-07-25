import type { UseQueryOptions as ReactQueryUseQueryOptions } from '@tanstack/react-query';

type UseQueryOptions<TResponse, TSelectResult = unknown> = Omit<
  ReactQueryUseQueryOptions<TResponse, unknown, TSelectResult>,
  'queryKey' | 'queryFn'
>;

export type { UseQueryOptions };

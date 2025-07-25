import type { UseDataOptions } from '@blueshift-ui/fetch';

import useAxiosClient from '@blueshift-ui/fetch/dist/hooks/use-axios-client';
import useData from '@blueshift-ui/fetch/dist/hooks/use-data';

type UseNspContentResponse<T> = {
  results: {
    data: T;
  }[];
};

type UseNspContentOptions<T, TSelect = T> = Pick<
  UseDataOptions<UseNspContentResponse<T>, TSelect>,
  'cancellable' | 'loadInBackground' | 'queryOptions'
> & {
  preview?: boolean;
  query: string;
  queryId: number | string;
  queryKey?: unknown | unknown[];
  variables?: Record<string, unknown>;
};

const selectNspContent = <T>(response: UseNspContentResponse<T>) => response?.results?.[0]?.data;

function useNspContent<T, TSelect = T>({
  preview = false,
  query,
  queryId,
  queryKey,
  queryOptions,
  variables,
  ...useDataOptions
}: UseNspContentOptions<T, TSelect>) {
  return useData<UseNspContentResponse<T>, TSelect>({
    queryKey: [
      'nsp-content',
      queryId,
      variables ? JSON.stringify(variables) : null,
      ...(Array.isArray(queryKey) ? queryKey : [JSON.stringify(queryKey)]),
    ],
    queryOptions: {
      meta: {
        client: useAxiosClient(),
      },
      select:
        queryOptions?.select ?? (selectNspContent as (data: UseNspContentResponse<T>) => TSelect),
      ...queryOptions,
    },
    request: {
      body: {
        preview,
        queries: [{ cacheKey: queryId, query, ...variables }],
      },
      method: 'POST',
      url: '/v2/cms/content',
    },
    ...useDataOptions,
  });
}

export default useNspContent;
export type { UseNspContentResponse };

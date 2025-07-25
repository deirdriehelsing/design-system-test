import type { QueryFunctionContext, UseDataOptions, UseDataResult } from '../../types';

import parseRequestKey from '../../helpers/parse-request-key';
import { useQuery } from '@tanstack/react-query';

function useData<TResponse, TSelectResult = TResponse, TRequestOptions = any>({
  cancellable = false,
  loadInBackground,
  queryKey,
  queryOptions,
  queryFn,
  request,
}: UseDataOptions<TResponse, TSelectResult, TRequestOptions>): UseDataResult<TSelectResult> {
  function defaultQueryFn({ meta, signal }: QueryFunctionContext) {
    return meta?.client?.makeRequest<TResponse>({
      ...request,
      signal: cancellable ? signal : null,
    }) as Promise<TResponse>;
  }

  return useQuery<TResponse, unknown, TSelectResult>(
    parseRequestKey({ key: queryKey, request, loadInBackground }),
    queryFn ?? defaultQueryFn,
    queryOptions
  );
}

export default useData;

import type {
  QueryFunctionContext,
  UseInfiniteDataOptions,
  UseInfiniteDataResult,
} from '../../types';

import merge from 'lodash/merge';
import parseRequestKey from '../../helpers/parse-request-key';
import { useInfiniteQuery } from '@tanstack/react-query';

function useInfiniteData<TResponse, TSelectResult = TResponse, TRequestOptions = any>({
  loadInBackground,
  pageParamName,
  queryKey,
  queryFn,
  queryOptions,
  request,
}: UseInfiniteDataOptions<
  TResponse,
  TSelectResult,
  TRequestOptions
>): UseInfiniteDataResult<TSelectResult> {
  function defaultQueryFn({ meta, pageParam = 1 }: QueryFunctionContext) {
    const requestWithPageParam = merge(
      {},
      request,
      pageParamName ? { params: { [pageParamName]: pageParam } } : {}
    );

    return meta?.client.makeRequest<TResponse>(requestWithPageParam) as Promise<TResponse>;
  }

  return useInfiniteQuery<TResponse, unknown, TSelectResult>(
    parseRequestKey({ key: queryKey, request, loadInBackground }),
    queryFn ?? defaultQueryFn,
    queryOptions
  );
}

export default useInfiniteData;

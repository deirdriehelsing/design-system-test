import type { ClassItem, SearchResult } from '../../types';
import type { UseDataResult } from '@blueshift-ui/fetch';

import { useCallback, useMemo, useState } from 'react';
import fetchClient from '../../request-clients/fetch';
import getBaseDomain from '../../helpers/get-base-domain';
import getClassSearchQuery from '../../helpers/get-class-search-query';
import useData from '@blueshift-ui/fetch/dist/hooks/use-data';
import useFeatureAccess from '@blueshift-ui/auth/dist/hooks/use-feature-access';

// Leaving filters as any until we have better direction from backend
interface UseClassesSearchParams {
  initialFilters?: Record<string, any>;
  initialPage?: number;
  initialSearchString?: string;
  perPage?: number;
}

const DEFAULT_INITIAL_FILTERS = {};

const DEFAULT_PARAMS = {};

const useClassesSearch = ({
  initialSearchString = '',
  initialFilters = DEFAULT_INITIAL_FILTERS,
  initialPage = 1,
  perPage = 10,
}: UseClassesSearchParams = DEFAULT_PARAMS) => {
  const { hasAccess: isVt4sUser, isLoading: isVt4sUserLoading } = useFeatureAccess({
    criteria: {
      productState: (userProductState) => userProductState === 'vt4s',
    },
  });
  const [searchString, setSearchString] = useState(initialSearchString);
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(initialPage);
  const baseDomain = useMemo(() => getBaseDomain(), []);

  const { data: results, isLoading } = useData<
    UseDataResult<SearchResult<ClassItem>>,
    SearchResult<ClassItem>
  >({
    queryKey: [
      'classes-search-result',
      JSON.stringify(filters),
      JSON.stringify({ isVt4sUser }),
      searchString,
      page,
    ],
    queryOptions: {
      enabled: !isVt4sUserLoading,
      keepPreviousData: true,
      meta: {
        client: fetchClient,
      },
    },
    request: {
      body: JSON.stringify({
        from: (page - 1) * perPage,
        query: getClassSearchQuery(searchString, filters, { isVt4sUser }),
        size: perPage,
        sort: ['_score', '_id'],
        min_score: 0,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      url: `${baseDomain}/catalog-items,catalog-topics/_search?search_type=dfs_query_then_fetch`,
    },
  });

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage((currentPage) => currentPage - 1);
    }
  }, [page]);

  const nextPage = useCallback(() => {
    if (results?.hits && page < Math.ceil(results.hits.total.value / perPage)) {
      setPage((currentPage) => currentPage + 1);
    }
  }, [page, perPage, results]);

  return {
    currentPage: page,
    filters,
    isLoading,
    nextPage,
    prevPage,
    results,
    searchString,
    setFilters,
    setPage,
    setSearchString,
  };
};

export default useClassesSearch;

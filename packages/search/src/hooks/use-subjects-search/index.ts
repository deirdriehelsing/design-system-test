import type { SearchResult, SubjectItem } from '../../types';
import type { UseDataResult } from '@blueshift-ui/fetch';

import { useCallback, useMemo, useState } from 'react';
import fetchClient from '../../request-clients/fetch';
import getBaseDomain from '../../helpers/get-base-domain';
import useAuthenticatedUser from '@blueshift-ui/auth/dist/hooks/use-authenticated-user';
import useData from '@blueshift-ui/fetch/dist/hooks/use-data';
import useFeatureAccess from '@blueshift-ui/auth/dist/hooks/use-feature-access';

// Leaving filters as any until we have better direction from backend
interface useSubjectsSearchParams {
  enabled?: boolean;
  initialFilters?: Record<string, any>;
  initialPage?: number;
  initialSearchString?: string;
  isInstantTutoringEnabled?: boolean;
  perPage?: number;
}

const DEFAULT_INITIAL_FILTERS = {};

const DEFAULT_PARAMS = {};

const useSubjectsSearch = ({
  enabled = true,
  initialSearchString = '',
  initialFilters = DEFAULT_INITIAL_FILTERS,
  initialPage = 1,
  isInstantTutoringEnabled,
  perPage = 10,
}: useSubjectsSearchParams = DEFAULT_PARAMS) => {
  const { data: { product_state: audience } = {}, isLoading: isLoadingAuthenticatedUser } =
    useAuthenticatedUser();

  const { hasAccess: hasCodeverseAccess } = useFeatureAccess({
    criteria: { enablement: 'codeverse' },
  });

  const [searchString, setSearchString] = useState(initialSearchString);
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(initialPage);
  const baseDomain = useMemo(() => getBaseDomain(), []);
  const selectedCategories = useMemo(() => {
    return filters.categories
      ? Object.keys(filters.categories)
          ?.filter((category) => filters.categories[category])
          .map(String)
      : [];
  }, [filters.categories]);

  const selectedGrades = useMemo(() => {
    return filters.grades
      ? Object.keys(filters.grades)
          ?.filter((grade) => filters.grades[grade])
          .map(String)
      : [];
  }, [filters.grades]);

  const excludeSlugs = audience === 'vt4s' && !hasCodeverseAccess ? ['codeverse'] : [];

  const {
    data: results,
    isLoading,
    isPreviousData,
  } = useData<UseDataResult<SearchResult<SubjectItem>>, SearchResult<SubjectItem>>({
    queryKey: [
      'subjects-search',
      JSON.stringify(filters),
      JSON.stringify({ isInstantTutoringEnabled }),
      JSON.stringify(excludeSlugs),
      searchString,
      page,
      audience,
    ],
    queryOptions: {
      enabled: enabled && !isLoadingAuthenticatedUser,
      keepPreviousData: true,
      meta: {
        client: fetchClient,
      },
    },
    request: {
      body: JSON.stringify({
        id: searchString ? 'subject-search-template' : 'subject-empty-search-template',
        params: {
          ...(selectedCategories.length ? { categories: selectedCategories } : {}),
          ...(selectedGrades.length ? { grade_ranges: selectedGrades } : {}),
          ...(excludeSlugs.length ? { exclude_slugs: excludeSlugs } : {}),
          from: (page - 1) * perPage,
          query_string: searchString,
          instant_tutoring_enabled: isInstantTutoringEnabled,
          size: perPage,
          audience,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      url: `${baseDomain}/subjects/_search/template?index=subjects`,
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
    isPreviousData,
    nextPage,
    prevPage,
    results,
    searchString,
    setFilters,
    setPage,
    setSearchString,
  };
};

export default useSubjectsSearch;

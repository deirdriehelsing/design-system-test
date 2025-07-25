import type { QueryFilters } from '../../types';

import { useIsFetching as useReactQueryIsFetching } from '@tanstack/react-query';

const defaultFilters: QueryFilters = {
  predicate(query) {
    return !query?.queryKey?.includes('in-background');
  },
};

function useIsFetching(filters: QueryFilters = defaultFilters) {
  return useReactQueryIsFetching(filters);
}

export { defaultFilters };

export default useIsFetching;

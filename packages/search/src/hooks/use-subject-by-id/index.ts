import type { SearchResult, SubjectItem } from '../../types';

import fetchClient from '../../request-clients/fetch';
import getBaseDomain from '../../helpers/get-base-domain';
import useData from '@blueshift-ui/fetch/dist/hooks/use-data';
import { useMemo } from 'react';

const useSubjectById = (id?: number) => {
  const baseDomain = useMemo(() => getBaseDomain(), []);

  const { data: subject, isLoading } = useData<SearchResult<SubjectItem>, SubjectItem>({
    queryKey: ['subject-by-id', id],
    queryOptions: {
      enabled: Boolean(id),
      meta: {
        client: fetchClient,
      },
      select(result: SearchResult<SubjectItem>) {
        return result?.hits?.hits?.[0]?._source;
      },
    },
    request: {
      body: {
        query: {
          match: {
            id,
          },
        },
      },
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      url: `${baseDomain}/subjects/_search`,
    },
  });

  return { subject, isLoading };
};

export default useSubjectById;

import type { FlexTag } from '../../types';

import useAuthenticatedUser from '../use-authenticated-user';
import useAxiosClient from '@blueshift-ui/fetch/dist/hooks/use-axios-client';
import useData from '@blueshift-ui/fetch/dist/hooks/use-data';

interface UseFlexTagsParams {
  /**
   * Whether or not the hook should bypass the cache.
   * @default false
   */
  bypassCache?: boolean;
  /**
   * Whether or not the hook should fetch the user flex tags data.
   * @default true
   */
  enabled?: boolean;
}

function useFlexTags({ bypassCache = false, enabled = true }: UseFlexTagsParams = {}) {
  const { data: user } = useAuthenticatedUser({ bypassCache, enabled });
  const { data: flexTags, ...queryStatusParams } = useData<FlexTag[]>({
    queryKey: ['flex-tags', user?.client_uuid],
    queryOptions: {
      enabled: Boolean(enabled && user?.client_uuid),
      meta: {
        client: useAxiosClient(),
      },
      refetchOnMount: bypassCache ? 'always' : true,
      retry: false,
      retryOnMount: false,
    },
    request: {
      attempts: 1,
      params: {
        entity_id: user?.client_uuid,
      },
      url: '/v1/tags',
    },
  });

  return {
    flexTags,
    ...queryStatusParams,
  };
}

export default useFlexTags;

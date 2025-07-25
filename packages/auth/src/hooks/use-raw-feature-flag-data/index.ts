import type { FlagData } from '../../types';

import useAxiosClient from '@blueshift-ui/fetch/dist/hooks/use-axios-client';
import useConfigValue from '@blueshift-ui/core/dist/hooks/use-config-value';
import useData from '@blueshift-ui/fetch/dist/hooks/use-data';

const EMPTY_FLAGS: FlagData[] = [];

interface UseRawFeatureFlagDataParams {
  tag?: string;
}

interface QueryResult {
  items: FlagData[];
}

const select = (data: QueryResult) => data?.items ?? EMPTY_FLAGS;

function useRawFeatureFlagData({ tag }: UseRawFeatureFlagDataParams) {
  const auth = useConfigValue('launchDarklyAuth');
  const baseUrl = useConfigValue('launchDarklyApiBaseUrl');
  const key = useConfigValue('launchDarklyAppKey');

  // The LaunchDarkly SDK provides limited flag data and filtering, so we're using their REST API
  // instead.
  const { data: rawFlagData, ...queryStatusParams } = useData<QueryResult, FlagData[]>({
    queryKey: ['useRawFeatureFlagData', tag],
    queryOptions: {
      meta: {
        client: useAxiosClient({ withCredentials: false }),
      },
      select,
    },
    request: {
      headers: {
        Authorization: auth,
      },
      params: {
        tag,
      },
      url: `${baseUrl}/flags/${key}`,
    },
  });

  return { rawFlagData, ...queryStatusParams };
}

export default useRawFeatureFlagData;

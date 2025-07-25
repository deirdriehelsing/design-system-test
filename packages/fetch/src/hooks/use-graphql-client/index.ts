import type { ClientAdapter } from '../../types';

import GraphQLClient from '../../clients/graphql';
import useConfigValue from '@blueshift-ui/core/dist/hooks/use-config-value';
import useHost from '@blueshift-ui/core/dist/hooks/use-host';
import { useMemo } from 'react';

function useGraphqlClient({ baseURL }: { baseURL?: string } = {}) {
  const host = useConfigValue('apiHost', useHost('api'));

  return useMemo<ClientAdapter>(
    () =>
      new GraphQLClient({
        url: `${baseURL ?? host}/graphql`,
      }),
    [baseURL, host]
  );
}

export default useGraphqlClient;

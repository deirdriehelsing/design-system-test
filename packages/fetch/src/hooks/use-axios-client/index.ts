import type { ClientAdapter } from '../../types';

import AxiosClient from '../../clients/axios';
import useConfigValue from '@blueshift-ui/core/dist/hooks/use-config-value';
import useHost from '@blueshift-ui/core/dist/hooks/use-host';
import { useMemo } from 'react';

function useAxiosClient({
  baseURL,
  method = 'GET',
  withCredentials,
}: {
  baseURL?: string;
  method?: string;
  withCredentials?: boolean;
} = {}) {
  const host = useConfigValue('apiHost', useHost('api'));

  return useMemo<ClientAdapter>(
    () =>
      new AxiosClient({
        baseURL: baseURL ?? host,
        headers: {
          'Content-Type': 'application/json',
        },
        method,
        withCredentials,
      }),
    [baseURL, host, method, withCredentials]
  );
}

export default useAxiosClient;

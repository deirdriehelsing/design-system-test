import type { ClientAdapter } from '../../types';
import type { QueryClientConfig } from '@tanstack/react-query';

import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { setupQueryClientAtom } from '../../state/atoms';
import { useAtomValue } from 'jotai/react';
import useAxiosClient from '../../hooks/use-axios-client';

interface FetchProviderProps {
  children: React.ReactNode;
  client?: ClientAdapter;
  config?: QueryClientConfig;
  host?: string;
  shareContext?: boolean;
}

declare module '@tanstack/react-query' {
  interface QueryMeta {
    client: ClientAdapter;
  }

  interface MutationMeta {
    client: ClientAdapter;
  }
}

function FetchProvider({ children, client, config, shareContext = false }: FetchProviderProps) {
  const defaultClient = useAxiosClient();
  const queryClient = useAtomValue(
    setupQueryClientAtom({ client: client || defaultClient, config })
  );

  return (
    <QueryClientProvider client={queryClient} contextSharing={shareContext}>
      {children}
    </QueryClientProvider>
  );
}

export default FetchProvider;

import type { Atom } from 'jotai';
import type { Channel } from 'pusher-js';
import type { ClientAdapter } from '../types';
import type Pusher from 'pusher-js';
import type { QueryClientConfig } from '@tanstack/react-query';

import { QueryClient } from '@tanstack/react-query';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import merge from 'lodash/merge';

const getDefaultQueryClientConfigAtom = atomFamily((client: ClientAdapter) =>
  atom<QueryClientConfig>(() => ({
    defaultOptions: {
      queries: {
        meta: {
          client,
        },
        queryFn: (options) => client.makeRequest(options.meta?.requestOptions ?? {}),
        staleTime: Infinity,
      },
      mutations: {
        meta: {
          client,
        },
        mutationFn: (variables) => client.makeRequest(variables ?? {}),
      },
    },
  }))
);

interface SetupQueryClientAtomProps {
  client: ClientAdapter;
  config?: QueryClientConfig;
}

const setupQueryClientAtom = atomFamily<SetupQueryClientAtomProps, Atom<QueryClient>>(
  ({ config, client }) =>
    atom((get) => {
      const configWithDefaults = merge({}, config, get(getDefaultQueryClientConfigAtom(client)));
      const queryClient = new QueryClient(configWithDefaults);

      return queryClient;
    }),
  (a, b) => a.client === b.client && a.config === b.config
);

const pusherInstancesAtom = atom<Record<string, Pusher | undefined>>({});

const setupPusherInstanceAtom = atomFamily((appKey: string) =>
  atom(
    (get) => get(pusherInstancesAtom)[appKey],
    (get, set, channel: Pusher | undefined) => {
      set(pusherInstancesAtom, (prev) => ({ ...prev, [appKey]: channel }));
    }
  )
);

const pusherChannelsAtom = atom<Record<string, Channel | undefined>>({});

const setupPusherChannelAtom = atomFamily((channelName: string) =>
  atom(
    (get) => get(pusherChannelsAtom)[channelName],
    (get, set, channel: Channel | undefined) => {
      set(pusherChannelsAtom, (prev) => ({ ...prev, [channelName]: channel }));
    }
  )
);

export {
  getDefaultQueryClientConfigAtom,
  pusherChannelsAtom,
  pusherInstancesAtom,
  setupPusherChannelAtom,
  setupPusherInstanceAtom,
  setupQueryClientAtom,
};

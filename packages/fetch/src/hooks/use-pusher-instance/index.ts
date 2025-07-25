import type { Options } from 'pusher-js';

import { useEffect, useMemo } from 'react';
import Pusher from 'pusher-js';
import { setupPusherInstanceAtom } from '../../state/atoms';
import { useAtom } from 'jotai';
import useAxiosClient from '../use-axios-client';
import useConfigValue from '@blueshift-ui/core/dist/hooks/use-config-value';
import useMutation from '../use-mutation';

interface PusherAuthRequest {
  channel_name: string;
  socket_id: string;
}

interface PusherAuthResponse {
  auth?: string;
}

function useChannelAuthorizationOptions(): Options['channelAuthorization'] {
  const { makeMutation } = useMutation<PusherAuthRequest, PusherAuthResponse>({
    mutationKey: 'pusher-channel-authorization',
    mutationOptions: {
      meta: {
        client: useAxiosClient(),
      },
    },
    request: { url: '/v1/pusher/auth' },
  });

  return useMemo(
    () => ({
      customHandler: async ({ channelName, socketId }, next) => {
        const authResponse = await makeMutation({
          channel_name: channelName,
          socket_id: socketId,
        });

        next(null, authResponse.auth ? { auth: authResponse.auth } : null);
      },
      endpoint: '/v1/pusher/auth',
      transport: 'ajax',
    }),
    [makeMutation]
  );
}

interface UsePusherInstanceParams {
  appKey?: string;
  options?: Options;
}

function usePusherInstance({ appKey, options }: UsePusherInstanceParams = {}) {
  const configAppKey = useConfigValue('pusherAppKey', 'default');
  const configCluster = useConfigValue('pusherCluster', 'mt1');

  const [pusherInstance, setPusherInstance] = useAtom(
    setupPusherInstanceAtom(appKey ?? configAppKey)
  );

  const channelAuthorizationOptions = useChannelAuthorizationOptions();

  useEffect(() => {
    const pusherAppKey = appKey ?? configAppKey;

    if (!pusherInstance && pusherAppKey) {
      const pusherOptions = options ?? { cluster: configCluster };

      setPusherInstance(
        new Pusher(pusherAppKey, {
          ...pusherOptions,
          channelAuthorization: channelAuthorizationOptions,
        })
      );
    }
  }, [
    appKey,
    channelAuthorizationOptions,
    options,
    configAppKey,
    configCluster,
    pusherInstance,
    setPusherInstance,
  ]);

  return pusherInstance;
}

export type { UsePusherInstanceParams };

export default usePusherInstance;

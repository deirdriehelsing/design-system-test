import type { Options } from 'pusher-js';

import { useEffect, useMemo } from 'react';
import { setupPusherChannelAtom } from '../../state/atoms';
import { useAtom } from 'jotai';
import usePusherInstance from '../use-pusher-instance';

interface BasePusherChannelParams {
  appKey?: string;
  options?: Options;
}

interface DisabledPusherChannelParams extends BasePusherChannelParams {
  channelName?: string;
  enabled: false;
}

interface EnabledPusherChannelParams extends BasePusherChannelParams {
  channelName: string;
  enabled?: true;
}

type UsePusherChannelParams = DisabledPusherChannelParams | EnabledPusherChannelParams;

function usePusherChannel({
  appKey,
  channelName,
  enabled = true,
  options,
}: UsePusherChannelParams) {
  const pusherInstance = usePusherInstance({ appKey, options });

  const [channel, setChannel] = useAtom(setupPusherChannelAtom(channelName || ''));

  useEffect(() => {
    if (enabled && channelName) {
      setChannel(pusherInstance?.subscribe(channelName));

      return () => {
        pusherInstance?.unsubscribe(channelName);
        setChannel(undefined);
      };
    }
  }, [channelName, pusherInstance, setChannel, enabled]);

  return useMemo(
    () => ({
      bindEvent<D = unknown>(eventName: string, callback: (data: D) => void) {
        return channel?.bind(eventName, callback);
      },
      channel,
      triggerEvent<D = unknown>(eventName: string, data: D) {
        return channel?.trigger(eventName, { data });
      },
      unbindEvent<D = unknown>(eventName: string, callback: (data: D) => void) {
        return channel?.unbind(eventName, callback);
      },
    }),
    [channel]
  );
}

export type { UsePusherChannelParams };

export default usePusherChannel;

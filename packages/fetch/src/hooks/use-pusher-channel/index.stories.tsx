import type { Meta, StoryObj } from '@storybook/react';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useConfigValue from '@blueshift-ui/core/src/hooks/use-config-value';
import useHost from '@blueshift-ui/core/dist/hooks/use-host';
import usePusherChannel from '.';

function PusherMessages(props) {
  const { appKey, channelName, cluster, enabled = true, eventName } = props;

  const [messages, setMessages] = useState<unknown[]>([]);
  const host = useConfigValue('apiHost', useHost('api'));

  const options = useMemo(
    () => ({ authEndpoint: `${host}/v1/pusher/auth`, cluster }),
    [cluster, host]
  );

  const { bindEvent, unbindEvent } = usePusherChannel({ appKey, channelName, enabled, options });

  const onEvent = useCallback(
    (data) => {
      setMessages((prev) => [...prev, data]);
    },
    [setMessages]
  );

  useEffect(() => {
    bindEvent(eventName, onEvent);

    return () => {
      unbindEvent(eventName, onEvent);
    };
  }, [bindEvent, eventName, onEvent, setMessages, unbindEvent]);

  return (
    <div>
      <div>Enabled: {String(enabled)}</div>
      <div>Messages:</div>
      <pre>{JSON.stringify(messages, undefined, 2)}</pre>
    </div>
  );
}

function UsePusherChannelStory(props) {
  const { appKey, channelName, cluster, enabled, eventName } = props;

  if (!appKey || !channelName || !cluster || !eventName) {
    return (
      <div>
        Please fill the values for <code>appKey</code>, <code>channelName</code>,{' '}
        <code>cluster</code>, and <code>eventName</code>.
      </div>
    );
  }

  return (
    <PusherMessages
      appKey={appKey}
      channelName={channelName}
      cluster={cluster}
      enabled={enabled}
      eventName={eventName}
    />
  );
}

const meta: Meta<typeof UsePusherChannelStory> = {
  title: 'Fetch/Hooks/usePusherChannel',
  component: UsePusherChannelStory,
  argTypes: {
    appKey: {
      control: 'text',
      description: 'The appKey for the Pusher channel.',
      table: {
        type: { summary: 'string' },
      },
    },
    channelName: {
      control: 'text',
      description: 'The name of the Pusher channel.',
      table: {
        type: { summary: 'string' },
      },
    },
    cluster: {
      control: 'text',
      description: 'The cluster name for the Pusher channel.',
      table: {
        type: { summary: 'string' },
      },
    },
    enabled: {
      control: 'boolean',
      defaultValue: true,
      description: 'Whether the Pusher channel subscription is enabled.',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    eventName: {
      control: 'text',
      description: 'The event name to listen to.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

type Story = StoryObj<typeof UsePusherChannelStory>;

const Default: Story = {};

export { Default };

export default meta;

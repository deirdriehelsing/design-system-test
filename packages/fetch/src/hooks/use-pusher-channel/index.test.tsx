import type { Options } from 'pusher-js';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { Provider as JotaiProvider } from 'jotai';
import React from 'react';
import usePusherChannel from '.';

const mockChannel = {
  bind: jest.fn(() => mockChannel),
  unbind: jest.fn(() => mockChannel),
  trigger: jest.fn(() => true),
};

const mockPusher = {
  bind: jest.fn(),
  subscribe: jest.fn(() => mockChannel),
  unsubscribe: jest.fn(),
};

jest.mock('pusher-js', () => jest.fn(() => mockPusher));

const mockPusherAppKey = 'mock-app-key';

const mockPusherOptions: Options = {
  cluster: 'mock-cluster',
};

interface MockProviderProps {
  children: React.ReactNode;
}

function MockProvider({ children }: MockProviderProps) {
  const queryClient = new QueryClient();

  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </JotaiProvider>
  );
}

describe('usePusherChannel', () => {
  const renderPusherHook = () =>
    renderHook(
      () =>
        usePusherChannel({
          appKey: mockPusherAppKey,
          channelName: 'mock-channel',
          options: mockPusherOptions,
        }),
      { wrapper: MockProvider }
    );

  describe('setup', () => {
    it('defines channel', async () => {
      const { result: pusherChannelResult } = renderPusherHook();
      await waitFor(() => {
        expect(pusherChannelResult.current.channel).toBeDefined();
      });

      expect(pusherChannelResult.current.channel).toEqual(mockChannel);

      expect(mockChannel.bind).not.toHaveBeenCalled();
    });
  });

  describe('channel functionality', () => {
    const callback = () => 'binded';

    it('should call bind function', async () => {
      const { result: pusherChannelResult } = renderPusherHook();
      await waitFor(() => {
        expect(pusherChannelResult.current.channel).toBeDefined();
      });

      expect(pusherChannelResult.current.bindEvent).toBeDefined();

      const channel = pusherChannelResult.current.bindEvent('binding function', callback);
      expect(channel).toEqual(mockChannel);
      expect(mockChannel.bind).toHaveBeenCalledTimes(1);
      expect(mockChannel.bind).toHaveBeenCalledWith('binding function', callback);
    });

    it('should call unbind function', async () => {
      const { result: pusherChannelResult } = renderPusherHook();
      const callback = () => 'unbinded';

      await waitFor(() => {
        expect(pusherChannelResult.current.channel).toBeDefined();
      });

      expect(pusherChannelResult.current.unbindEvent).toBeDefined();

      const channel = pusherChannelResult.current.unbindEvent('unbiding function', callback);
      expect(channel).toEqual(mockChannel);
      expect(mockChannel.unbind).toHaveBeenCalledTimes(1);
      expect(mockChannel.unbind).toHaveBeenCalledWith('unbiding function', callback);
    });

    it('should call trigger function', async () => {
      const { result: pusherChannelResult } = renderPusherHook();
      await waitFor(() => {
        expect(pusherChannelResult.current.channel).toBeDefined();
      });

      expect(pusherChannelResult.current.triggerEvent).toBeDefined();

      pusherChannelResult.current.triggerEvent('trigger function', { triggered: true });
      expect(mockChannel.trigger).toHaveBeenCalledTimes(1);
      expect(mockChannel.trigger).toHaveBeenCalledWith('trigger function', {
        data: { triggered: true },
      });
    });
  });

  it('does not subscribe to channel when enabled is false', async () => {
    const { result } = renderHook(
      () =>
        usePusherChannel({
          appKey: mockPusherAppKey,
          channelName: 'mock-channel',
          enabled: false,
          options: mockPusherOptions,
        }),
      { wrapper: MockProvider }
    );

    await waitFor(() => {
      expect(result.current.channel).toBeUndefined();
    });

    expect(mockPusher.subscribe).not.toHaveBeenCalled();
  });

  it('unsubscribes from channel when enabled changes from true to false', async () => {
    const { result, rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) =>
        usePusherChannel({
          appKey: mockPusherAppKey,
          channelName: 'mock-channel',
          enabled,
          options: mockPusherOptions,
        }),
      {
        initialProps: { enabled: true },
        wrapper: MockProvider,
      }
    );

    // Verify initial subscription
    await waitFor(() => {
      expect(result.current.channel).toBeDefined();
    });
    expect(mockPusher.subscribe).toHaveBeenCalledWith('mock-channel');

    // Change enabled to false
    rerender({ enabled: false });

    await waitFor(() => {
      expect(result.current.channel).toBeUndefined();
    });
    expect(mockPusher.unsubscribe).toHaveBeenCalledWith('mock-channel');
  });

  it('subscribes to channel when enabled changes from false to true', async () => {
    const { result, rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) =>
        usePusherChannel({
          appKey: mockPusherAppKey,
          channelName: 'mock-channel',
          enabled,
          options: mockPusherOptions,
        }),
      {
        wrapper: MockProvider,
        initialProps: { enabled: false },
      }
    );

    // Verify no initial subscription
    await waitFor(() => {
      expect(result.current.channel).toBeUndefined();
    });
    expect(mockPusher.subscribe).not.toHaveBeenCalled();

    // Change enabled to true
    rerender({ enabled: true });

    await waitFor(() => {
      expect(result.current.channel).toBeDefined();
    });
    expect(mockPusher.subscribe).toHaveBeenCalledWith('mock-channel');
    expect(result.current.channel).toEqual(mockChannel);
  });

  it('allows channelName to be undefined when enabled is false', async () => {
    const { result } = renderHook(
      () =>
        usePusherChannel({
          appKey: mockPusherAppKey,
          enabled: false,
          options: mockPusherOptions,
        }),
      { wrapper: MockProvider }
    );

    await waitFor(() => {
      expect(result.current.channel).toBeUndefined();
    });

    expect(mockPusher.subscribe).not.toHaveBeenCalled();
  });
});

import type { Options } from 'pusher-js';
import type { PropsWithChildren } from 'react';

import { Provider as JotaiProvider, useAtomValue } from 'jotai';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import ConfigProvider from '@blueshift-ui/core/dist/providers/config-provider';
import React from 'react';
import { pusherInstancesAtom } from '../../state/atoms';
import usePusherInstance from '.';

const mockPusher = {
  bind: jest.fn(),
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
};

const mockedMakeMutation = jest.fn();

jest.mock('@blueshift-ui/fetch/dist/hooks/use-mutation', () =>
  jest.fn(() => ({ makeMutation: mockedMakeMutation }))
);
jest.mock('js-cookie', () => ({ get: jest.fn((key) => key) }));
jest.mock('pusher-js', () => jest.fn((key, config) => ({ ...mockPusher, key, config })));

const mockAppKey = 'mock-app-key';

const mockPusherOptions: Options = {
  authEndpoint: '/v1/pusher/auth',
  cluster: 'mock-cluster',
};

function MockProvider({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();

  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </JotaiProvider>
  );
}

describe('usePusherInstance', () => {
  it('defines an instance', async () => {
    const { result: pusherInstance } = renderHook(
      () => {
        usePusherInstance({ appKey: mockAppKey, options: mockPusherOptions });

        return useAtomValue(pusherInstancesAtom);
      },
      { wrapper: MockProvider }
    );

    await waitFor(() => {
      expect(pusherInstance.current).toMatchObject({
        [mockAppKey]: mockPusher,
      });
    });
  });

  describe('reading options fron config', () => {
    function ConfigWrapper({ children }: PropsWithChildren) {
      return (
        <MockProvider>
          <ConfigProvider
            config={{ pusherAppKey: mockAppKey, pusherCluster: mockPusherOptions.cluster }}
          >
            {children}
          </ConfigProvider>
        </MockProvider>
      );
    }

    it('defines an instance with proper settings', async () => {
      const { result: pusherInstance } = renderHook(
        () => {
          usePusherInstance();

          return useAtomValue(pusherInstancesAtom);
        },
        { wrapper: ConfigWrapper }
      );

      await waitFor(() => {
        expect(pusherInstance.current).toMatchObject({ [mockAppKey]: mockPusher });
      });

      expect(pusherInstance.current[mockAppKey]?.key).toEqual(mockAppKey);

      expect(pusherInstance.current[mockAppKey]?.config).toBeDefined();

      const pusherConfig = pusherInstance.current[mockAppKey]?.config as Options;

      await waitFor(() => {
        expect(pusherConfig.cluster).toEqual(mockPusherOptions.cluster);
      });

      expect(pusherConfig.channelAuthorization).toEqual({
        customHandler: expect.any(Function),
        endpoint: mockPusherOptions.authEndpoint,
        transport: 'ajax',
      });
    });
  });
});

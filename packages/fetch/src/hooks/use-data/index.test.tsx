import type { ClientAdapter } from '../../types';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import React from 'react';
import { renderHook } from '@testing-library/react';
import useData from '.';

const mockedUseQuery = useQuery as jest.MockedFunction<typeof useQuery>;

jest.mock('@tanstack/react-query', () => ({
  QueryClient: jest.requireActual('@tanstack/react-query').QueryClient,
  QueryClientProvider: jest.requireActual('@tanstack/react-query').QueryClientProvider,
  useQuery: jest.fn(),
}));

const mockedParseRequestKey = jest.fn((..._args: any) => ['mock']);

jest.mock(
  '../../helpers/parse-request-key',
  () =>
    (...args: any[]) =>
      mockedParseRequestKey(...args)
);

class MockClient implements ClientAdapter {
  public readonly instance = global.fetch;

  public makeRequest: jest.Mock = jest.fn(() => Promise.resolve({ data: 'mock' }));
}

describe('useData()', () => {
  beforeEach(() => {
    mockedUseQuery.mockClear();
  });

  it('uses client for fetching', () => {
    // Unmock once
    mockedUseQuery.mockImplementationOnce(jest.requireActual('@tanstack/react-query').useQuery);
    const mockClient = new MockClient();

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          meta: {
            client: mockClient,
          },
        },
      },
    });

    renderHook(() => useData({ queryKey: '', request: { url: '/mock' } }), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    expect(mockedUseQuery).toHaveBeenCalledTimes(1);
    expect(mockClient.makeRequest).toHaveBeenCalledTimes(1);
    expect(mockClient.makeRequest).toHaveBeenCalledWith({ url: '/mock', signal: null });
  });

  it('forwards query options to useQuery', () => {
    const queryOptions = {
      enabled: true,
    };

    renderHook(() => useData({ queryKey: '', queryOptions, request: { url: '/mock' } }));

    expect(mockedUseQuery).toHaveBeenCalledTimes(1);
    expect(mockedUseQuery).toHaveBeenCalledWith(expect.anything(), expect.anything(), queryOptions);
  });

  it('parses query key', () => {
    const options = {
      loadInBackground: true,
      queryKey: 'mock',
      request: {
        url: '/mock',
      },
    };

    renderHook(() => useData(options));

    expect(mockedUseQuery).toHaveBeenCalledTimes(1);
    expect(mockedUseQuery).toHaveBeenCalledWith(['mock'], expect.anything(), undefined);
    expect(mockedParseRequestKey).toHaveBeenCalledTimes(1);
    expect(mockedParseRequestKey).toHaveBeenCalledWith({
      key: 'mock',
      loadInBackground: true,
      request: {
        url: '/mock',
      },
    });
  });

  it('sends an abort signal if cancellable', () => {
    const options = {
      cancellable: true,
      queryKey: 'mock',
      request: {
        url: '/mock',
      },
    };

    const mockClient = new MockClient();
    const signal = 'SIGNAL';

    mockedUseQuery.mockImplementationOnce((_key, fn, _options) => {
      // call the callback function immediately with our mock client and signal
      return (fn as any)({ meta: { client: mockClient }, signal });
    });

    renderHook(() => useData(options));
    expect(mockClient.makeRequest).toHaveBeenCalledWith({
      url: '/mock',
      signal,
    });
  });

  it('accepts a custom query function', () => {
    const options = {
      queryFn: jest.fn(),
      queryKey: 'mock',
      request: {
        url: '/mock',
      },
    };

    renderHook(() => useData(options));

    expect(mockedUseQuery).toHaveBeenCalledTimes(1);
    expect(mockedUseQuery).toHaveBeenCalledWith(expect.anything(), options.queryFn, undefined);
  });
});

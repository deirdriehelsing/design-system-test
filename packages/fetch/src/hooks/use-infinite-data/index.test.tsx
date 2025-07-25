import type { ClientAdapter } from '../../types';

import { QueryClient, QueryClientProvider, useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { renderHook } from '@testing-library/react';
import useInfiniteData from '.';

const mockedUseInfiniteQuery = useInfiniteQuery as jest.Mock;

jest.mock('@tanstack/react-query', () => ({
  QueryClient: jest.requireActual('@tanstack/react-query').QueryClient,
  QueryClientProvider: jest.requireActual('@tanstack/react-query').QueryClientProvider,
  useInfiniteQuery: jest.fn(),
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

describe('useInfiniteData()', () => {
  beforeEach(() => {
    mockedUseInfiniteQuery.mockClear();
  });

  it('uses client for fetching', () => {
    // Unmock once
    mockedUseInfiniteQuery.mockImplementationOnce(
      jest.requireActual('@tanstack/react-query').useInfiniteQuery
    );
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

    renderHook(() => useInfiniteData({ request: { url: '/mock' } }), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    expect(mockedUseInfiniteQuery).toHaveBeenCalledTimes(1);
    expect(mockClient.makeRequest).toHaveBeenCalledTimes(1);
    expect(mockClient.makeRequest).toHaveBeenCalledWith({ url: '/mock' });
  });

  it('forwards query options to useInfiniteQuery', () => {
    const queryOptions = {
      enabled: true,
    };

    renderHook(() => useInfiniteData({ queryOptions, request: { url: '/mock' } }));

    expect(mockedUseInfiniteQuery).toHaveBeenCalledTimes(1);
    expect(mockedUseInfiniteQuery).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      queryOptions
    );
  });

  it('adds a page param when provided', () => {
    // Unmock once
    mockedUseInfiniteQuery.mockImplementationOnce(
      jest.requireActual('@tanstack/react-query').useInfiniteQuery
    );
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

    renderHook(() => useInfiniteData({ pageParamName: 'mock', request: { url: '/mock' } }), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    expect(mockedUseInfiniteQuery).toHaveBeenCalledTimes(1);
    expect(mockClient.makeRequest).toHaveBeenCalledTimes(1);
    expect(mockClient.makeRequest).toHaveBeenCalledWith({ params: { mock: 1 }, url: '/mock' });
  });

  it('accepts a custom query function', () => {
    // Unmock once
    mockedUseInfiniteQuery.mockImplementationOnce(
      jest.requireActual('@tanstack/react-query').useInfiniteQuery
    );
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

    const queryFn = jest.fn();

    renderHook(() => useInfiniteData({ queryFn, request: { url: '/mock' } }), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    expect(mockedUseInfiniteQuery).toHaveBeenCalledTimes(1);
    expect(queryFn).toHaveBeenCalledTimes(1);
  });
});

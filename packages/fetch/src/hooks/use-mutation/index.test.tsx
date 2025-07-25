import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import useMutation from '.';

class MockClient {
  instance = jest.fn();
  makeRequest = jest.fn();
}

describe('useMutation()', () => {
  it('defaults to the configured Provider client for making requests', async () => {
    const mockClient = new MockClient();

    const queryClient = new QueryClient({
      defaultOptions: {
        mutations: {
          meta: {
            client: mockClient,
          },
        },
      },
    });

    const { result } = renderHook(() => useMutation({ request: { url: '/mock' } }), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    result.current.makeMutation('mock');

    await waitFor(() => {
      expect(mockClient.makeRequest).toHaveBeenCalledTimes(1);
    });

    expect(mockClient.makeRequest).toHaveBeenCalledWith(expect.objectContaining({ body: 'mock' }));
  });

  it('allows the default client to be overridden', async () => {
    const mockDefaultClient = new MockClient();
    const mockOverrideClient = new MockClient();

    const queryClient = new QueryClient({
      defaultOptions: {
        mutations: {
          meta: {
            client: mockDefaultClient,
          },
        },
      },
    });

    const { result } = renderHook(
      () =>
        useMutation({
          mutationOptions: { meta: { client: mockOverrideClient } },
          request: { url: '/mock' },
        }),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        ),
      }
    );

    result.current.makeMutation('mock');

    await waitFor(() => {
      expect(mockOverrideClient.makeRequest).toHaveBeenCalledTimes(1);
    });

    expect(mockOverrideClient.makeRequest).toHaveBeenCalledWith(
      expect.objectContaining({ body: 'mock' })
    );
    expect(mockDefaultClient.makeRequest).not.toHaveBeenCalled();
  });

  it('throws when no client is found', async () => {
    expect.assertions(2);

    // No client provided to query client
    const queryClient = new QueryClient();
    const mockedOnError = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence console.error

    const { result } = renderHook(
      () => useMutation({ request: { url: '/mock' }, mutationOptions: { onError: mockedOnError } }),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        ),
      }
    );

    try {
      await result.current.makeMutation('mock');
    } catch (error) {
      expect(mockedOnError).toHaveBeenCalledTimes(1);
      expect(mockedOnError).toHaveBeenCalledWith(
        new Error('No client found in options. Did you pass a client to the context provider?'),
        'mock',
        undefined
      );
    }
  });

  it('parses request options', async () => {
    const mockClient = new MockClient();

    const queryClient = new QueryClient({
      defaultOptions: {
        mutations: {
          meta: {
            client: mockClient,
          },
        },
      },
    });

    const { result } = renderHook(
      () =>
        useMutation({
          request: {
            attempts: 2,
            url: '/mock',
          },
        }),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        ),
      }
    );

    result.current.makeMutation('mock');

    await waitFor(() => {
      expect(mockClient.makeRequest).toHaveBeenCalledTimes(1);
    });

    expect(mockClient.makeRequest).toHaveBeenCalledWith({
      attempts: 1,
      body: 'mock',
      method: 'POST',
      url: '/mock',
      variables: 'mock',
    });
  });

  it('accepts a custom mutation function', async () => {
    const mockClient = new MockClient();
    const mockMutationFn = jest.fn();

    const queryClient = new QueryClient({
      defaultOptions: {
        mutations: {
          meta: {
            client: mockClient,
          },
        },
      },
    });

    const { result } = renderHook(
      () =>
        useMutation({
          mutationFn: mockMutationFn,
          request: {
            url: '/mock',
          },
        }),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        ),
      }
    );

    result.current.makeMutation('mock');

    await waitFor(() => {
      expect(mockMutationFn).toHaveBeenCalledTimes(1);
    });

    expect(mockMutationFn).toHaveBeenCalledWith('mock');
  });

  it('returns correct loading and success states', async () => {
    const mockClient = new MockClient();

    const queryClient = new QueryClient({
      defaultOptions: {
        mutations: {
          meta: {
            client: mockClient,
          },
        },
      },
    });

    const { result } = renderHook(() => useMutation({ request: { url: '/mock' } }), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    result.current.makeMutation('mock');

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
  });

  it('returns correct loading and success states with custom mutation function', async () => {
    const mockClient = new MockClient();
    const mockMutationFn = jest.fn();

    const queryClient = new QueryClient({
      defaultOptions: {
        mutations: {
          meta: {
            client: mockClient,
          },
        },
      },
    });

    const { result } = renderHook(
      () =>
        useMutation({
          mutationFn: mockMutationFn,
          request: {
            url: '/mock',
          },
        }),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        ),
      }
    );

    result.current.makeMutation('mock');

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
  });

  it('returns correct loading and success states with custom mutation function and error', async () => {
    const mockClient = new MockClient();
    const mockMutationFn = jest.fn();

    const queryClient = new QueryClient({
      defaultOptions: {
        mutations: {
          meta: {
            client: mockClient,
          },
        },
      },
    });

    const { result } = renderHook(
      () =>
        useMutation({
          mutationFn: mockMutationFn,
          request: {
            url: '/mock',
          },
        }),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        ),
      }
    );

    result.current.makeMutation('mock');

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
  });
});

import type { ReactNode } from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import DEFAULT_CLIENT_OPTIONS from './constants/default-client-options';
import { Provider as JotaiProvider } from 'jotai';
import React from 'react';
import { initialize } from 'launchdarkly-js-client-sdk';
import { useAnalytics } from '@blueshift-ui/analytics';
import useAuthenticatedUser from '../use-authenticated-user';
import useData from '@blueshift-ui/fetch/dist/hooks/use-data';
import useFeatureFlagClient from '.';

const mockedInitialize = initialize as jest.Mock;
const mockedUseAuthenticatedUser = useAuthenticatedUser as jest.Mock;
const mockedUseData = useData as jest.Mock;
const mockedUseAnalytics = useAnalytics as jest.Mock;

const mockAnalyticsInstance = {
  track: jest.fn(),
};

const mockedClient = {
  allFlags: jest.fn(),
  getContext: jest.fn(() => ({ key: 'mock-student-id' })),
  identify: jest.fn(() => Promise.resolve()),
  waitUntilReady: jest.fn(() => Promise.resolve()),
};

const mockedDefaultContextWithAuthenticatedUser = {
  email: 'test.user@example.com',
  enablements: 'one_on_one,ai_chat',
  gradeListId: 1,
  key: 'mock-student-id',
  kind: 'user',
  productState: '',
  viewportSize: 'large',
};

const mockedDefaultContextWithoutAuthenticatedUser = {
  key: 'anonymous',
  kind: 'user',
};

interface MockProviderProps {
  children: ReactNode;
}

function MockProvider({ children }: MockProviderProps) {
  return <JotaiProvider>{children}</JotaiProvider>;
}

jest.mock('@blueshift-ui/analytics');
jest.mock('@blueshift-ui/fetch/dist/hooks/use-data');

jest.mock('launchdarkly-js-client-sdk');

jest.mock('../../hooks/use-authenticated-user');

describe('useFeatureFlagClient()', () => {
  beforeEach(() => {
    mockedClient.allFlags.mockReset();
    mockedClient.waitUntilReady.mockReset();
    mockedClient.identify.mockReset();

    mockedInitialize.mockReset();
    mockedInitialize.mockReturnValue(mockedClient);

    mockAnalyticsInstance.track.mockReset();
    mockedUseAnalytics.mockReset();
    mockedUseAnalytics.mockReturnValue({
      ...mockAnalyticsInstance,
      instance: mockAnalyticsInstance,
    });

    mockedUseAuthenticatedUser.mockReset();

    mockedUseData.mockReset();
    mockedUseData.mockImplementation(({ queryFn }) => ({ data: queryFn() }));
  });

  it('returns undefined client when authenticated user is loading', () => {
    mockedUseAuthenticatedUser.mockReturnValue({
      isLoading: true,
    });
    mockedUseData.mockReturnValue({ data: undefined });

    const { result } = renderHook(() => useFeatureFlagClient(), { wrapper: JotaiProvider });

    expect(result.current.client).toBeUndefined();
  });

  it('initializes client with anonymous user when authenticated user is undefined', async () => {
    mockedUseAuthenticatedUser.mockReturnValue({
      isLoading: false,
      data: undefined,
    });

    renderHook(() => useFeatureFlagClient(), { wrapper: JotaiProvider });

    await waitFor(() => {
      expect(mockedInitialize).toHaveBeenCalledTimes(1);
    });

    expect(mockedInitialize).toHaveBeenCalledWith(
      expect.any(String),
      mockedDefaultContextWithoutAuthenticatedUser,
      expect.any(Object)
    );
  });

  describe('with authenticated user', () => {
    beforeEach(() => {
      const activeLearner = {
        enablements: [
          { product: { short_name: 'one_on_one' } },
          { product: { short_name: 'ai_chat' } },
        ],
        first_name: 'Test',
        grade_list_id: 1,
        last_name: 'User',
      };

      mockedUseAuthenticatedUser.mockReturnValue({
        data: {
          email: 'test.user@example.com',
          user_id: 'mock-student-id',
          students: [activeLearner],
        },
        activeLearner,
        isLoading: false,
      });
    });

    it('initializes client with defaults', async () => {
      await renderHook(() => useFeatureFlagClient(), { wrapper: MockProvider });

      expect(mockedInitialize).toHaveBeenCalledWith(
        expect.any(String),
        mockedDefaultContextWithAuthenticatedUser,
        expect.objectContaining(DEFAULT_CLIENT_OPTIONS)
      );
    });

    it('does not track non-internal emails', async () => {
      mockedUseAuthenticatedUser.mockReturnValue({
        data: {
          email: 'joe@hotmail.com',
          user_id: 'mock-student-id',
        },
        isLoading: false,
      });

      await renderHook(() => useFeatureFlagClient(), { wrapper: MockProvider });

      expect(mockedInitialize).toHaveBeenCalledWith(
        expect.any(String),
        {
          key: 'mock-student-id',
          enablements: '',
          kind: 'user',
          productState: '',
          viewportSize: 'large',
        },
        expect.objectContaining(DEFAULT_CLIENT_OPTIONS)
      );
    });

    it('initializes with custom context when provided', async () => {
      const mockedContext = {
        key: 'yet-another-mock-student-id',
        kind: 'yet-another-user',
        custom: 'mock-custom-context',
      };

      await renderHook(() => useFeatureFlagClient({ context: mockedContext }), {
        wrapper: MockProvider,
      });

      expect(mockedInitialize).toHaveBeenCalledWith(
        expect.any(String),
        mockedContext,
        expect.any(Object)
      );
    });

    it('initializes with custom options when provided', async () => {
      const mockedOptions = {
        application: {
          id: 'mock-application-id',
          version: '0.0.0',
        },
      };

      await renderHook(() => useFeatureFlagClient({ options: mockedOptions }), {
        wrapper: MockProvider,
      });

      expect(mockedInitialize).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.objectContaining(mockedOptions)
      );
    });

    it('calls identify with updated context', async () => {
      const mockContext = {
        key: 'mock-key',
        kind: 'custom',
      };

      await renderHook(() => useFeatureFlagClient({ context: mockContext }), {
        wrapper: MockProvider,
      });

      expect(mockedClient.identify).toHaveBeenCalledWith(mockContext);
    });

    it('returns undefined client when enabled is false', () => {
      mockedUseData.mockReturnValue({ data: undefined });

      const { result } = renderHook(() => useFeatureFlagClient({ enabled: false }), {
        wrapper: MockProvider,
      });

      expect(result.current.client).toBeUndefined();
      expect(mockedInitialize).not.toHaveBeenCalled();
    });

    it('reuses cached client and calls identify when context key changes', async () => {
      // First render to create a cached client
      const { rerender } = renderHook((props) => useFeatureFlagClient(props), {
        wrapper: MockProvider,
        initialProps: { context: { key: 'initial-key', kind: 'user' } },
      });

      // Reset mocks to verify next calls
      mockedInitialize.mockClear();
      mockedClient.identify.mockClear();

      // Render with different context
      rerender({ context: { key: 'new-key', kind: 'user' } });

      await waitFor(() => {
        expect(mockedClient.identify).toHaveBeenCalledWith({ key: 'new-key', kind: 'user' });
      });

      expect(mockedInitialize).not.toHaveBeenCalled(); // Should not initialize again
    });

    it('reuses cached client without calling identify when context key is unchanged', async () => {
      // First render to create a cached client
      const { rerender } = renderHook((props) => useFeatureFlagClient(props), {
        wrapper: MockProvider,
        initialProps: { context: { key: 'same-key', kind: 'user' } },
      });

      // Reset mocks to verify next calls
      mockedInitialize.mockClear();
      mockedClient.identify.mockClear();
      mockedClient.getContext.mockReturnValue({ key: 'same-key' });

      // Render with same context key
      rerender({ context: { key: 'same-key', kind: 'user' } });

      // Use a small timeout to ensure all promises have resolved
      await waitFor(() => new Promise((resolve) => setTimeout(resolve, 100)));

      expect(mockedInitialize).not.toHaveBeenCalled();
      expect(mockedClient.identify).not.toHaveBeenCalled();
    });
  });
});

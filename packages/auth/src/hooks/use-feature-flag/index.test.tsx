import * as useFeatureFlagClient from '../use-feature-flag-client';
import ConfigProvider from '@blueshift-ui/core/dist/providers/config-provider';
import React from 'react';
import { renderHook } from '@testing-library/react';
import useFeatureFlag from '.';

jest.mock('../use-feature-flag-client', () => ({
  __esModule: true,
  ...jest.requireActual('@blueshift-ui/auth/dist/hooks/use-feature-flag-client'),
}));

interface MockProviderProps {
  children: React.ReactNode;
}

function MockProvider({ children }: MockProviderProps) {
  return <ConfigProvider config={{ allowFeatureFlagOverride: 'true' }}>{children}</ConfigProvider>;
}

const flags = { 'mock-flag-1': true };
const mockVariation = jest.fn((flag: string) => flags[flag]);

function mockFeatureFlags() {
  return jest.spyOn(useFeatureFlagClient, 'default').mockReturnValue({
    client: {
      variation: mockVariation,
    } as Partial<ReturnType<typeof useFeatureFlagClient.default>['client']> as any,
  } as Partial<ReturnType<typeof useFeatureFlagClient.default>> as any);
}

describe('useFeatureFlag()', () => {
  describe('when the URL param is not set', () => {
    beforeEach(() => {
      mockVariation.mockClear();
    });

    it('returns flag value', () => {
      mockFeatureFlags();
      const { result } = renderHook(() => useFeatureFlag('mock-flag-1'), { wrapper: MockProvider });
      expect(result.current.value).toBe(true);
      expect(mockVariation).toHaveBeenCalledTimes(1);
    });

    it('memoizes result', () => {
      // mock as still loading
      jest.spyOn(useFeatureFlagClient, 'default').mockReturnValue({} as any);

      const { result, rerender } = renderHook(() => useFeatureFlag('mock-flag-1'), {
        wrapper: MockProvider,
      });
      expect(result.current.value).toBe(null);
      expect(mockVariation).toHaveBeenCalledTimes(0);

      // now finished loading
      mockFeatureFlags();

      rerender();
      expect(mockVariation).toHaveBeenCalledTimes(1);

      rerender();
      expect(mockVariation).toHaveBeenCalledTimes(1);

      // entirely new hook
      renderHook(() => useFeatureFlag('mock-flag-1'));
      expect(mockVariation).toHaveBeenCalledTimes(2);
    });
  });

  describe('when the URL param is set', () => {
    describe('when the URL param is a boolean', () => {
      beforeEach(() => {
        const searchParams = new URLSearchParams();
        searchParams.set('mock-flag-1', 'false');

        Object.defineProperty(window, 'location', {
          value: {
            search: searchParams.toString(),
          },
          writable: true,
        });
      });

      it('returns flag value from URL param', () => {
        const { result } = renderHook(() => useFeatureFlag('mock-flag-1'), {
          wrapper: MockProvider,
        });

        expect(result.current.value).toBe(false);
      });
    });

    describe('when the URL param is not a boolean', () => {
      beforeEach(() => {
        const searchParams = new URLSearchParams();
        searchParams.set('mock-flag-1', 'mock-value');

        Object.defineProperty(window, 'location', {
          value: {
            search: searchParams.toString(),
          },
          writable: true,
        });
      });

      it('returns flag value from URL param', () => {
        const { result } = renderHook(() => useFeatureFlag('mock-flag-1'), {
          wrapper: MockProvider,
        });

        expect(result.current.value).toBe('mock-value');
      });
    });
  });
});

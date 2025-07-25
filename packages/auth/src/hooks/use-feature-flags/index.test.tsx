import type { ReactNode } from 'react';

import ConfigProvider from '@blueshift-ui/core/dist/providers/config-provider';
import React from 'react';
import { renderHook } from '@testing-library/react';
import useFeatureFlags from '.';

jest.mock('../use-feature-flag-client', () =>
  jest.fn(() => ({
    client: {
      allFlags: jest.fn(() => ({
        'mock-flag-1': true,
        'mock-flag-2': true,
      })),
    },
  }))
);

interface MockProviderProps {
  children: ReactNode;
}

function MockProvider({ children }: MockProviderProps) {
  return <ConfigProvider config={{ allowFeatureFlagOverride: 'true' }}>{children}</ConfigProvider>;
}

describe('useFeatureFlags()', () => {
  describe('when the URL param is not set', () => {
    it('returns all Launch Darkly flags', () => {
      const { result } = renderHook(() => useFeatureFlags(), { wrapper: MockProvider });

      expect(result.current.flags).toEqual({
        'mock-flag-1': true,
        'mock-flag-2': true,
      });
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

      it('returns the URL param value(s)', () => {
        const { result } = renderHook(() => useFeatureFlags(), { wrapper: MockProvider });

        expect(result.current.flags).toEqual({
          'mock-flag-1': false,
          'mock-flag-2': true,
        });
      });
    });

    describe('when the URL param is not a boolean', () => {
      beforeEach(() => {
        const searchParams = new URLSearchParams();
        searchParams.set('mock-flag-1', 'mock-value');
        searchParams.set('mock-flag-2', 'false');

        Object.defineProperty(window, 'location', {
          value: {
            search: searchParams.toString(),
          },
          writable: true,
        });
      });

      it('returns the URL param value(s)', () => {
        const { result } = renderHook(() => useFeatureFlags(), { wrapper: MockProvider });

        expect(result.current.flags).toEqual({
          'mock-flag-1': 'mock-value',
          'mock-flag-2': false,
        });
      });
    });
  });
});

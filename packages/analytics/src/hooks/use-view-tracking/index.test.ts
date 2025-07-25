import type { AnalyticsBrowser } from '@segment/analytics-next';
import type { EventScope } from '../../types';

import { useAnalytics, useEventScope } from '..';
import { ANALYTICS_EVENT_NAMES } from '../../constants';
import { renderHook } from '@testing-library/react';
import useViewTracking from '.';

jest.mock('..', () => ({
  useAnalytics: jest.fn(),
  useEventScope: jest.fn(),
}));

describe('useViewTracking()', () => {
  const mockAnalytics = { page: jest.fn(), track: jest.fn() } as unknown as AnalyticsBrowser;
  const mockUseAnalytics = jest.mocked(useAnalytics);
  const mockUseEventScope = jest.mocked(useEventScope);
  const mockEventScope: EventScope = {
    pageSection: 'test-section',
    metadata: {
      testKey: 'testValue',
    },
  };

  beforeEach(() => {
    mockUseAnalytics.mockReturnValue(mockAnalytics);
    mockUseEventScope.mockReturnValue(mockEventScope);
    jest.clearAllMocks();
  });

  describe('page view tracking', () => {
    const defaultPageProperties = {
      category: 'Home',
      other_property: 'value',
      user_type: 'student',
    };

    it('tracks page view with event context', () => {
      renderHook(() =>
        useViewTracking({
          enabled: true,
          trackedProperties: defaultPageProperties,
          type: 'page',
        })
      );

      expect(mockAnalytics.page).toHaveBeenCalledTimes(1);
      expect(mockAnalytics.page).toHaveBeenCalledWith('Home', {
        other_property: 'value',
        user_type: 'student',
        page_path: '/',
        page_section: 'test-section',
        metadata: {
          testKey: 'testValue',
        },
      });
      expect(mockAnalytics.track).not.toHaveBeenCalled();
    });

    it('handles empty event context gracefully', () => {
      mockUseEventScope.mockReturnValue({ pageSection: '', metadata: {} });
      renderHook(() =>
        useViewTracking({
          enabled: true,
          trackedProperties: defaultPageProperties,
          type: 'page',
        })
      );
      expect(mockAnalytics.page).toHaveBeenCalledWith('Home', {
        other_property: 'value',
        user_type: 'student',
        page_path: '/',
        page_section: '',
        metadata: {},
      });
    });
  });

  describe('content view tracking', () => {
    const defaultContentProperties = {
      content_name: 'Article Title',
      content_type: 'blog',
      content_id: '123',
    };

    it('tracks content view with event context', () => {
      renderHook(() =>
        useViewTracking({
          enabled: true,
          trackedProperties: defaultContentProperties,
          type: 'content',
        })
      );

      expect(mockAnalytics.track).toHaveBeenCalledTimes(1);
      expect(mockAnalytics.track).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.contentViewed, {
        ...defaultContentProperties,
        metadata: {
          testKey: 'testValue',
        },
        page_path: '/',
        page_section: 'test-section',
      });
      expect(mockAnalytics.page).not.toHaveBeenCalled();
    });
  });

  describe('tracking control', () => {
    const trackedProperties = {
      category: 'Home',
      other_property: 'value',
    };

    it('does not track when enabled is false', () => {
      renderHook(() =>
        useViewTracking({
          enabled: false,
          trackedProperties,
          type: 'page',
        })
      );

      expect(mockAnalytics.page).not.toHaveBeenCalled();
      expect(mockAnalytics.track).not.toHaveBeenCalled();
    });

    it('handles null event context', () => {
      mockUseEventScope.mockReturnValue(null);
      renderHook(() =>
        useViewTracking({
          enabled: true,
          trackedProperties,
          type: 'page',
        })
      );

      expect(mockAnalytics.page).toHaveBeenCalledWith('Home', {
        other_property: 'value',
        page_path: '/',
      });
    });

    it('tracks again when event context changes', () => {
      const { rerender } = renderHook(() =>
        useViewTracking({
          enabled: true,
          trackedProperties,
          type: 'page',
        })
      );

      expect(mockAnalytics.page).toHaveBeenCalledTimes(1);
      mockUseEventScope.mockReturnValue({
        pageSection: 'new-section',
        metadata: {
          newKey: 'newValue',
        },
      });

      rerender();

      expect(mockAnalytics.page).toHaveBeenCalledTimes(2);
      expect(mockAnalytics.page).toHaveBeenLastCalledWith('Home', {
        other_property: 'value',
        page_path: '/',
        page_section: 'new-section',
        metadata: {
          newKey: 'newValue',
        },
      });
    });

    it('does not duplicate track calls when nothing changes', () => {
      const { rerender } = renderHook(() =>
        useViewTracking({
          enabled: true,
          trackedProperties,
          type: 'page',
        })
      );

      expect(mockAnalytics.page).toHaveBeenCalledTimes(1);

      rerender();

      expect(mockAnalytics.page).toHaveBeenCalledTimes(1);
    });
  });
});

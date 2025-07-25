import type { AnalyticsBrowser } from '@segment/analytics-next';
import type { ErrorLoggedEvent } from '../../types';

import { act, renderHook } from '@testing-library/react';
import { ANALYTICS_EVENT_NAMES } from '../../constants';
import useErrorLoggedHandler from '.';

const mockTrack = jest.fn();
const mockAnalytics = { track: mockTrack } as unknown as AnalyticsBrowser;
const mockEventScope = { pageSection: 'test-section' };

jest.mock('../use-analytics', () => jest.fn(() => mockAnalytics));
jest.mock('../use-event-scope', () => jest.fn(() => mockEventScope));

describe('useErrorLoggedHandler()', () => {
  const mockError = new Error('Test error message');
  const mockOnErrorLogged = jest.fn();
  const requiredTrackedProperties = {
    error_category: 'test-category',
    error_severity: 'critical',
    user_impact: 'blocking',
  };

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        pathname: 'test/path',
      },
      writable: true,
    });
  });

  it('returns a handler function', () => {
    const { result } = renderHook(() =>
      useErrorLoggedHandler({
        onErrorLogged: mockOnErrorLogged,
        trackedProperties: requiredTrackedProperties,
      })
    );

    expect(typeof result.current).toBe('function');
  });

  it('tracks error logged event with correct properties', () => {
    const { result } = renderHook(() =>
      useErrorLoggedHandler({
        onErrorLogged: mockOnErrorLogged,
        trackedProperties: requiredTrackedProperties,
      })
    );

    act(() => {
      result.current(mockError);
    });

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.errorLogged, {
      error_message: 'Error: Test error message',
      page_path: 'test/path',
      page_section: 'test-section',
      error_category: 'test-category',
      error_severity: 'critical',
      user_impact: 'blocking',
    });
  });

  it('calls the provided onErrorLogged handler', () => {
    const { result } = renderHook(() =>
      useErrorLoggedHandler({
        onErrorLogged: mockOnErrorLogged,
        trackedProperties: requiredTrackedProperties,
      })
    );

    act(() => {
      result.current(mockError);
    });

    expect(mockOnErrorLogged).toHaveBeenCalledTimes(1);
    expect(mockOnErrorLogged).toHaveBeenCalledWith(mockError);

    // Ensure the handler is called after the analytics call
    expect(mockTrack.mock.invocationCallOrder[0]).toBeLessThan(
      mockOnErrorLogged.mock.invocationCallOrder[0]
    );
  });

  it('includes additional tracked properties in the event payload', () => {
    const trackedProperties: Partial<ErrorLoggedEvent> & typeof requiredTrackedProperties = {
      ...requiredTrackedProperties,
      metadata: { test: 'value' },
    };

    const { result } = renderHook(() =>
      useErrorLoggedHandler({
        onErrorLogged: mockOnErrorLogged,
        trackedProperties,
      })
    );

    act(() => {
      result.current(mockError);
    });

    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.errorLogged, {
      error_message: 'Error: Test error message',
      page_path: 'test/path',
      page_section: 'test-section',
      error_category: 'test-category',
      error_severity: 'critical',
      user_impact: 'blocking',
      metadata: { test: 'value' },
    });
  });

  it('does not track the event when disabled is true', () => {
    const { result } = renderHook(() =>
      useErrorLoggedHandler({
        onErrorLogged: mockOnErrorLogged,
        trackedProperties: requiredTrackedProperties,
        trackingDisabled: true,
      })
    );

    act(() => {
      result.current(mockError);
    });

    expect(mockOnErrorLogged).toHaveBeenCalledTimes(1);
    expect(mockTrack).not.toHaveBeenCalled();
  });

  it('includes handler call properties in the event payload', () => {
    const trackedProperties: Partial<ErrorLoggedEvent> & typeof requiredTrackedProperties = {
      ...requiredTrackedProperties,
      metadata: { test: 'value' },
    };

    const { result } = renderHook(() =>
      useErrorLoggedHandler({
        onErrorLogged: mockOnErrorLogged,
        trackedProperties,
      })
    );

    act(() => {
      result.current(mockError, {
        user_impact: 'frustrating',
        metadata: { custom_metadata: 'custom_value' },
      });
    });

    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.errorLogged, {
      error_category: 'test-category',
      error_message: 'Error: Test error message',
      error_severity: 'critical',
      metadata: { custom_metadata: 'custom_value', test: 'value' },
      page_path: 'test/path',
      page_section: 'test-section',
      user_impact: 'frustrating',
    });
  });
});

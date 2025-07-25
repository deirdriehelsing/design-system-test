import '@testing-library/jest-dom';
import type { ElementClickedEvent } from '../../types';
import type { MouseEvent } from 'react';

import { act, renderHook } from '@testing-library/react';
import { ANALYTICS_EVENT_NAMES } from '../../constants';
import useElementClickedHandler from '.';

const mockTrack = jest.fn();

jest.mock('../../hooks/use-analytics', () => ({
  __esModule: true,
  default: () => ({ track: mockTrack }),
}));

jest.mock('../../hooks/use-event-scope', () => ({
  __esModule: true,
  default: () => ({ pageSection: 'test-section' }),
}));

describe('useElementClickedHandler()', () => {
  const mockEvent = {
    currentTarget: {
      getAttribute: jest.fn(),
      id: 'test-button',
      innerText: 'Test Button',
      tagName: 'BUTTON',
    },
  } as unknown as MouseEvent<HTMLButtonElement>;
  const mockOnClick = jest.fn();

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
      useElementClickedHandler({
        onClick: mockOnClick,
      })
    );

    expect(typeof result.current).toBe('function');
  });

  it('tracks element clicked event with correct properties', () => {
    const { result } = renderHook(() =>
      useElementClickedHandler({
        onClick: mockOnClick,
      })
    );

    act(() => {
      result.current(mockEvent);
    });

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.elementClicked, {
      element_id: 'test-button',
      element_text: 'Test Button',
      element_type: 'button',
      page_path: 'test/path',
      page_section: 'test-section',
    });
  });

  it('calls the provided onClick handler', () => {
    const { result } = renderHook(() =>
      useElementClickedHandler({
        onClick: mockOnClick,
      })
    );

    act(() => {
      result.current(mockEvent);
    });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(mockEvent);

    // Ensure the handler is called after the analytics call
    expect(mockTrack.mock.invocationCallOrder[0]).toBeLessThan(
      mockOnClick.mock.invocationCallOrder[0]
    );
  });

  it('includes additional tracked properties in the event payload', () => {
    const trackedProperties: Partial<ElementClickedEvent> = {
      metadata: { test: 'value' },
    };

    const { result } = renderHook(() =>
      useElementClickedHandler({
        onClick: mockOnClick,
        trackedProperties,
      })
    );

    act(() => {
      result.current(mockEvent);
    });

    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.elementClicked, {
      element_id: 'test-button',
      element_text: 'Test Button',
      element_type: 'button',
      page_path: 'test/path',
      page_section: 'test-section',
      metadata: { test: 'value' },
    });
  });

  it('handles undefined innerText correctly', () => {
    const { result } = renderHook(() =>
      useElementClickedHandler({
        onClick: mockOnClick,
      })
    );

    const mockEvent = {
      currentTarget: {
        getAttribute: jest.fn(),
        id: 'test-button',
        innerText: undefined,
        tagName: 'BUTTON',
      },
    } as unknown as MouseEvent<HTMLButtonElement>;

    act(() => {
      result.current(mockEvent);
    });

    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.elementClicked, {
      element_id: 'test-button',
      element_text: undefined,
      element_type: 'button',
      page_path: 'test/path',
      page_section: 'test-section',
    });
  });

  it('includes handler call properties in the event payload', () => {
    const trackedProperties: Partial<ElementClickedEvent> = {
      metadata: { test: 'value' },
    };

    const { result } = renderHook(() =>
      useElementClickedHandler({
        onClick: mockOnClick,
        trackedProperties,
      })
    );

    act(() => {
      result.current(mockEvent, {
        element_type: 'link',
        metadata: { custom_metadata: 'custom_value' },
      });
    });

    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.elementClicked, {
      element_id: 'test-button',
      element_text: 'Test Button',
      element_type: 'link',
      metadata: { custom_metadata: 'custom_value', test: 'value' },
      page_path: 'test/path',
      page_section: 'test-section',
    });
  });
});

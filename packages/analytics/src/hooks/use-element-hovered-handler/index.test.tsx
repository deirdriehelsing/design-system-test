import '@testing-library/jest-dom';
import type { ElementHoveredEvent } from '../../types';
import type { MouseEvent } from 'react';

import { act, renderHook } from '@testing-library/react';
import { ANALYTICS_EVENT_NAMES } from '../../constants';
import useElementHoveredHandler from '.';

const mockTrack = jest.fn();

jest.mock('../../hooks/use-analytics', () => ({
  __esModule: true,
  default: () => ({ track: mockTrack }),
}));

jest.mock('../../hooks/use-event-scope', () => ({
  __esModule: true,
  default: () => ({ pageSection: 'test-section' }),
}));

describe('useElementHoveredHandler()', () => {
  const mockEvent = {
    currentTarget: {
      getAttribute: jest.fn(),
      id: 'test-button',
      innerText: 'Test Button',
      tagName: 'BUTTON',
    },
  } as unknown as MouseEvent<HTMLButtonElement>;
  const mockOnHover = jest.fn();

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
      useElementHoveredHandler({
        onHover: mockOnHover,
      })
    );

    expect(typeof result.current).toBe('function');
  });

  it('tracks element MouseEntered event with correct properties', () => {
    const { result } = renderHook(() =>
      useElementHoveredHandler({
        onHover: mockOnHover,
      })
    );

    act(() => {
      result.current(mockEvent);
    });

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.elementHovered, {
      element_id: 'test-button',
      element_text: 'Test Button',
      element_type: 'button',
      page_path: 'test/path',
      page_section: 'test-section',
    });
  });

  it('calls the provided onHover handler', () => {
    const { result } = renderHook(() =>
      useElementHoveredHandler({
        onHover: mockOnHover,
      })
    );

    act(() => {
      result.current(mockEvent);
    });

    expect(mockOnHover).toHaveBeenCalledTimes(1);
    expect(mockOnHover).toHaveBeenCalledWith(mockEvent);

    // Ensure the handler is called after the analytics call
    expect(mockTrack.mock.invocationCallOrder[0]).toBeLessThan(
      mockOnHover.mock.invocationCallOrder[0]
    );
  });

  it('includes additional tracked properties in the event payload', () => {
    const trackedProperties: Partial<ElementHoveredEvent> = {
      metadata: { test: 'value' },
    };

    const { result } = renderHook(() =>
      useElementHoveredHandler({
        onHover: mockOnHover,
        trackedProperties,
      })
    );

    act(() => {
      result.current(mockEvent);
    });

    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.elementHovered, {
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
      useElementHoveredHandler({
        onHover: mockOnHover,
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

    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.elementHovered, {
      element_id: 'test-button',
      element_text: undefined,
      element_type: 'button',
      page_path: 'test/path',
      page_section: 'test-section',
    });
  });

  it('includes handler call properties in the event payload', () => {
    const trackedProperties: Partial<ElementHoveredEvent> = {
      metadata: { test: 'value' },
    };

    const { result } = renderHook(() =>
      useElementHoveredHandler({
        onHover: mockOnHover,
        trackedProperties,
      })
    );

    act(() => {
      result.current(mockEvent, {
        element_type: 'link',
        metadata: { custom_metadata: 'custom_value' },
      });
    });

    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.elementHovered, {
      element_id: 'test-button',
      element_text: 'Test Button',
      element_type: 'link',
      metadata: { custom_metadata: 'custom_value', test: 'value' },
      page_path: 'test/path',
      page_section: 'test-section',
    });
  });
});

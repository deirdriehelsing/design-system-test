import type { ChangeEvent, FocusEvent } from 'react';

import { act, renderHook } from '@testing-library/react';
import { ANALYTICS_EVENT_NAMES } from '../../constants';
import useEnteredInputHandler from '.';

const mockTrack = jest.fn();

jest.mock('../../hooks/use-analytics', () => ({
  __esModule: true,
  default: () => ({ track: mockTrack }),
}));

jest.mock('../../hooks/use-event-scope', () => ({
  __esModule: true,
  default: () => ({ pageSection: 'Test' }),
}));

describe('useEnteredInputHandler()', () => {
  const mockId = 'test-input';

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/test-path',
      },
      writable: true,
    });
    jest.clearAllMocks();
  });

  it('tracks input events', () => {
    const mockEvent = {
      currentTarget: {
        id: mockId,
        tagName: 'input',
        type: 'text',
        value: 'test value',
      },
    } as unknown as ChangeEvent<HTMLInputElement>;

    const { result } = renderHook(() => useEnteredInputHandler());

    result.current(mockEvent);

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith(
      ANALYTICS_EVENT_NAMES.userEnteredInput,
      expect.objectContaining({
        element_id: mockId,
        element_type: 'input',
        input_action: 'blur',
        input_state: 'filled',
        input_type: 'text',
        is_input_masked: false,
        page_path: '/test-path',
        page_section: 'Test',
      })
    );
  });

  it('calls the passed in onEntered handler', () => {
    const mockEvent = {
      currentTarget: {
        id: mockId,
        tagName: 'input',
        type: 'text',
        value: 'test value',
      },
    } as unknown as FocusEvent<HTMLInputElement>;
    const mockOnEntered = jest.fn();

    const { result } = renderHook(() =>
      useEnteredInputHandler({
        onEntered: mockOnEntered,
      })
    );

    act(() => {
      result.current(mockEvent);
    });

    expect(mockOnEntered).toHaveBeenCalledTimes(1);
    expect(mockOnEntered).toHaveBeenCalledWith(mockEvent);

    // Ensure the handler is called after the analytics call
    expect(mockTrack.mock.invocationCallOrder[0]).toBeLessThan(
      mockOnEntered.mock.invocationCallOrder[0]
    );
  });

  it('does not track events when disabled', () => {
    const mockEvent = {
      currentTarget: {
        id: mockId,
        tagName: 'input',
        type: 'text',
        value: 'test value',
      },
    } as unknown as FocusEvent<HTMLInputElement>;

    const { result } = renderHook(() =>
      useEnteredInputHandler({
        trackingDisabled: true,
      })
    );

    result.current(mockEvent);

    expect(mockTrack).not.toHaveBeenCalled();
  });

  it('handles different input types correctly', () => {
    const mockEvent = {
      currentTarget: {
        id: mockId,
        tagName: 'input',
        type: 'email',
        value: 'test value',
      },
    } as unknown as FocusEvent<HTMLInputElement>;

    const { result } = renderHook(() => useEnteredInputHandler());

    result.current(mockEvent);

    expect(mockTrack).toHaveBeenCalledWith(
      ANALYTICS_EVENT_NAMES.userEnteredInput,
      expect.objectContaining({
        input_type: 'email',
      })
    );
  });

  it('handles checkable inputs correctly', () => {
    const mockCheckboxEvent = {
      currentTarget: {
        checked: true,
        id: mockId,
        tagName: 'input',
        type: 'checkbox',
        value: 'on',
      },
    } as unknown as ChangeEvent<HTMLInputElement>;

    const { result } = renderHook(() => useEnteredInputHandler());

    result.current(mockCheckboxEvent);

    expect(mockTrack).toHaveBeenCalledWith(
      ANALYTICS_EVENT_NAMES.userEnteredInput,
      expect.objectContaining({
        element_type: 'input',
        input_type: 'checkbox',
        input_state: 'filled', // Should be 'filled' when checked
      })
    );

    const mockRadioEvent = {
      currentTarget: {
        tagName: 'input',
        type: 'radio',
        checked: false,
        value: 'option1',
      },
    } as unknown as ChangeEvent<HTMLInputElement>;

    result.current(mockRadioEvent);

    expect(mockTrack).toHaveBeenCalledWith(
      ANALYTICS_EVENT_NAMES.userEnteredInput,
      expect.objectContaining({
        element_type: 'input',
        input_type: 'radio',
        input_state: 'empty', // Should be 'empty' when not checked
      })
    );
  });

  it('handles select elements correctly', () => {
    const mockSelectEvent = {
      currentTarget: {
        id: mockId,
        tagName: 'SELECT',
        type: 'select-one',
        value: 'option1',
      },
    } as unknown as ChangeEvent<HTMLSelectElement>;

    const { result } = renderHook(() => useEnteredInputHandler());

    result.current(mockSelectEvent);

    expect(mockTrack).toHaveBeenCalledWith(
      ANALYTICS_EVENT_NAMES.userEnteredInput,
      expect.objectContaining({
        element_type: 'select',
        input_type: 'select-one',
        input_state: 'filled',
      })
    );
  });

  it('respects isMasked parameter', () => {
    const mockEvent = {
      currentTarget: {
        id: mockId,
        tagName: 'input',
        type: 'text',
        value: 'sensitive data',
      },
    } as unknown as ChangeEvent<HTMLInputElement>;

    const { result } = renderHook(() =>
      useEnteredInputHandler({
        isMasked: true,
      })
    );

    result.current(mockEvent);

    expect(mockTrack).toHaveBeenCalledWith(
      ANALYTICS_EVENT_NAMES.userEnteredInput,
      expect.objectContaining({
        is_input_masked: true,
      })
    );
  });

  it('always masks password inputs regardless of isMasked parameter', () => {
    const mockEvent = {
      currentTarget: {
        id: mockId,
        tagName: 'input',
        type: 'password',
        value: 'password123',
      },
    } as unknown as ChangeEvent<HTMLInputElement>;

    const { result } = renderHook(() =>
      useEnteredInputHandler({
        isMasked: false,
      })
    );

    result.current(mockEvent);

    expect(mockTrack).toHaveBeenCalledWith(
      ANALYTICS_EVENT_NAMES.userEnteredInput,
      expect.objectContaining({
        is_input_masked: true,
      })
    );
  });

  it('includes tracked properties in the event', () => {
    const mockTrackedProperties = {
      custom_property: 'custom value',
      another_property: 123,
    };

    const mockEvent = {
      currentTarget: {
        id: mockId,
        tagName: 'input',
        type: 'text',
        value: 'test value',
      },
    } as unknown as ChangeEvent<HTMLInputElement>;

    const { result } = renderHook(() =>
      useEnteredInputHandler({
        trackedProperties: mockTrackedProperties,
      })
    );

    result.current(mockEvent);

    expect(mockTrack).toHaveBeenCalledWith(
      ANALYTICS_EVENT_NAMES.userEnteredInput,
      expect.objectContaining({
        ...mockTrackedProperties,
      })
    );
  });

  it('includes handler call properties in the event payload', () => {
    const mockTrackedProperties = {
      another_property: 123,
      custom_property: 'custom value',
      metadata: { test: 'value' },
    };

    const mockEvent = {
      currentTarget: {
        id: mockId,
        tagName: 'input',
        type: 'text',
        value: 'test value',
      },
    } as unknown as ChangeEvent<HTMLInputElement>;

    const { result } = renderHook(() =>
      useEnteredInputHandler({
        trackedProperties: mockTrackedProperties,
      })
    );

    result.current(mockEvent, {
      metadata: { custom_metadata: 'custom_value' },
    });

    expect(mockTrack).toHaveBeenCalledWith(
      ANALYTICS_EVENT_NAMES.userEnteredInput,
      expect.objectContaining({
        ...mockTrackedProperties,
        metadata: { custom_metadata: 'custom_value', test: 'value' },
      })
    );
  });
});

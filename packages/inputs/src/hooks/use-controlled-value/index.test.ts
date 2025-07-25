import { act, renderHook } from '@testing-library/react';
import useControlledValue from '.';

describe('useControlledValue', () => {
  it('should return as a useState', () => {
    const value = 'mock-value';

    const { result } = renderHook(() => useControlledValue(value));
    expect(result.current[0]).toBe(value);
    expect(result.current[1]).toBeInstanceOf(Function);
  });

  it('should update value on setControlledValue', () => {
    const value = 'mock-value';

    const { result } = renderHook(() => useControlledValue(value));
    expect(result.current[0]).toBe(value);

    const newValue = 'mock-value-2';
    act(() => {
      result.current[1](newValue);
    });
    expect(result.current[0]).toBe(newValue);
  });

  it('should accept a default value', () => {
    const defaultValue = 'mock-default-value';

    const { result } = renderHook(() => useControlledValue(undefined, defaultValue));
    expect(result.current[0]).toBe(defaultValue);
  });
});

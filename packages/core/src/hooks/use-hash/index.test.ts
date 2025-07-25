import { act, renderHook } from '@testing-library/react';
import useHash from '.';

describe('useHash', () => {
  it('should return the current hash', () => {
    const { result } = renderHook(() => useHash());
    expect(result.current[0]).toBe('');
  });

  it('can change the hash', () => {
    const { result } = renderHook(() => useHash());
    expect(result.current[0]).toBe('');

    act(() => {
      result.current[1]('test');
      window.dispatchEvent(new CustomEvent('hashchange')); // jsdom will not fire this otherwise
    });

    expect(window.location.hash).toBe('#test');
    expect(result.current[0]).toBe('test');
  });
});

import { renderHook } from '@testing-library/react';
import useSpaUrlStorage from './index';

describe('useSpaUrlStorage', () => {
  const mockHref = 'https://example.com/test';
  const mockLocalStorage = {
    getItem: jest.fn(),
    removeItem: jest.fn(),
    setItem: jest.fn(),
  };

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });

    Object.defineProperty(window, 'location', {
      value: {
        href: mockHref,
      },
      writable: true,
    });
  });

  it('tracks URL in localStorage when enabled is true', () => {
    renderHook(() => useSpaUrlStorage({ enabled: true }));

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('analytics-current-url');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('analytics-current-url', mockHref);
  });

  it('does not track URL in localStorage when enabled is false', () => {
    renderHook(() => useSpaUrlStorage({ enabled: false }));

    expect(mockLocalStorage.getItem).not.toHaveBeenCalled();
    expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
  });

  it('does not track URL in localStorage when enabled is not provided (defaults to false)', () => {
    renderHook(() => useSpaUrlStorage({}));

    expect(mockLocalStorage.getItem).not.toHaveBeenCalled();
    expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
  });

  it('clears URL storage on unmount when enabled is true', () => {
    const { unmount } = renderHook(() => useSpaUrlStorage({ enabled: true }));

    unmount();

    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('analytics-previous-url');
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('analytics-current-url');
  });

  it('does not clear URL storage on unmount when enabled is false', () => {
    const { unmount } = renderHook(() => useSpaUrlStorage({ enabled: false }));

    unmount();

    expect(mockLocalStorage.removeItem).not.toHaveBeenCalled();
  });
});

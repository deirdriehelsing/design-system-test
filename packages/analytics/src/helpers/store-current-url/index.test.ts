import storeCurrentUrl from '.';

describe('storeCurrentUrl()', () => {
  const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
  });

  it('stores current URL and updates previous URL when no previous URL exists', () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    storeCurrentUrl('/home');

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('analytics-previous-url', '');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('analytics-current-url', '/home');
  });

  it('stores current URL and updates previous URL when previous URL exists', () => {
    mockLocalStorage.getItem.mockReturnValue('/home');

    storeCurrentUrl('/about');

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('analytics-previous-url', '/home');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('analytics-current-url', '/about');
  });

  it('handles empty string URL input', () => {
    mockLocalStorage.getItem.mockReturnValue('/previous');

    storeCurrentUrl('');

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('analytics-previous-url', '/previous');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('analytics-current-url', '');
  });
});

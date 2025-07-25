import clearUrlStorage from '.';

describe('clearUrlStorage', () => {
  beforeEach(() => {
    window.localStorage.setItem('analytics-previous-url', '/previous');
    window.localStorage.setItem('analytics-current-url', '/current');
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('removes analytics URL items from localStorage', () => {
    expect(window.localStorage.getItem('analytics-previous-url')).toBe('/previous');
    expect(window.localStorage.getItem('analytics-current-url')).toBe('/current');

    clearUrlStorage();

    expect(window.localStorage.getItem('analytics-previous-url')).toBeNull();
    expect(window.localStorage.getItem('analytics-current-url')).toBeNull();
  });
});

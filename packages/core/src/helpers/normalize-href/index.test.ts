import normalizeHref from '.';

Object.defineProperty(window, 'location', {
  value: {
    origin: 'http://www.vtstaging.com',
  },
  writable: true,
});

describe('normalizeHref', () => {
  it('keeps relative paths if nothing specified', () => {
    expect(normalizeHref('/my/route')).toBe('/my/route');
  });

  it('strips host from paths for current subdomain', () => {
    expect(normalizeHref('http://www.vtstaging.com/my/route')).toBe('/my/route');
  });

  it('does not strip host if `full` is specified', () => {
    expect(normalizeHref('http://www.vtstaging.com/my/route', { full: true })).toBe(
      'http://www.vtstaging.com/my/route'
    );
  });

  it('keeps full paths for other subdomains', () => {
    expect(normalizeHref('http://other.vtstaging.com/my/route')).toBe(
      'http://other.vtstaging.com/my/route'
    );
  });

  it('translates to the correct VT environment', () => {
    expect(normalizeHref('http://api.varsitytutors.com/my/route')).toBe(
      'http://api.vtstaging.com/my/route'
    );

    expect(normalizeHref('http://www.varsitytutors.com/my/route')).toBe('/my/route');
  });

  it('works with ephemeral subdomains', () => {
    Object.defineProperty(window, 'location', {
      value: {
        origin: 'http://blueshift-v4-upgrade.ephemeral.vtstaging.com',
      },
      writable: true,
    });

    // relative paths
    expect(normalizeHref('/my/route')).toBe('/my/route');

    // different domains
    expect(normalizeHref('http://www.example.com/my/route')).toBe(
      'http://www.example.com/my/route'
    );

    // environment aware
    expect(normalizeHref('http://www.varsitytutors.com/my/route')).toBe(
      'http://www.vtstaging.com/my/route'
    );

    expect(normalizeHref('http://blueshift-v4-upgrade.ephemeral.vtstaging.com/my/route')).toBe(
      '/my/route'
    );
  });

  it('should preserve full URL for when subdomain is not the current subdomain', () => {
    Object.defineProperty(window, 'location', {
      value: {
        origin: 'https://other.vtstaging.com',
      },
      writable: true,
    });

    expect(normalizeHref('https://account.varsitytutors.com/client')).toBe(
      'https://account.vtstaging.com/client'
    );
  });
});

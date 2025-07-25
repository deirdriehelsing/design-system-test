import defaultUrlTransformationStrategy from './default-url-transformation-strategy';

Object.defineProperty(window, 'location', {
  value: {
    origin: 'http://www.vtstaging.com',
  },
  writable: true,
});

describe('defaultUrlTransformationStrategy', () => {
  let transformUrl: (href: string, applicationId?: string) => string;

  beforeEach(() => {
    transformUrl = defaultUrlTransformationStrategy();
  });

  it('returns empty href as-is', () => {
    expect(transformUrl('')).toBe('');
    expect(transformUrl(null as any)).toBe(null);
    expect(transformUrl(undefined as any)).toBe(undefined);
  });

  it('keeps relative paths unchanged', () => {
    expect(transformUrl('/settings')).toBe('/settings');
    expect(transformUrl('/my/route')).toBe('/my/route');
    expect(transformUrl('/path/to/resource')).toBe('/path/to/resource');
    expect(transformUrl('/path?query=param')).toBe('/path?query=param');
    expect(transformUrl('/path#fragment')).toBe('/path#fragment');
  });

  it('converts internal domains without subdomain to www', () => {
    expect(transformUrl('https://varsitytutors.com/path')).toBe(
      'https://www.varsitytutors.com/path'
    );
  });

  it('converts api subdomain to www for internal domains', () => {
    expect(transformUrl('https://api.varsitytutors.com/my/route')).toBe(
      'https://www.vtstaging.com/my/route'
    );
    expect(transformUrl('https://api.vtstaging.com/my/route')).toBe(
      'https://www.vtstaging.com/my/route'
    );
  });

  it('converts learn subdomain to www for internal domains', () => {
    expect(transformUrl('https://learn.varsitytutors.com/courses')).toBe(
      'https://www.vtstaging.com/courses'
    );
  });

  it('handles URLs with query parameters and hash fragments', () => {
    expect(transformUrl('https://api.varsitytutors.com/client?param=value')).toBe(
      'https://www.vtstaging.com/client?param=value'
    );
    expect(transformUrl('https://api.varsitytutors.com/client#section')).toBe(
      'https://www.vtstaging.com/client#section'
    );
  });

  it('preserves account subdomain for different environments', () => {
    expect(transformUrl('https://account.varsitytutors.com/client')).toBe(
      'https://account.vtstaging.com/client'
    );
    expect(transformUrl('https://account.vtstaging.com/client')).toBe(
      'https://account.vtstaging.com/client'
    );
  });

  it('preserves ai subdomain for different environments', () => {
    expect(transformUrl('https://ai.varsitytutors.com/client')).toBe(
      'https://ai.vtstaging.com/client'
    );
  });

  it('preserves ephemeral URLs', () => {
    expect(transformUrl('https://team-123.ephemeral.vtstaging.com/my-learning')).toBe(
      'https://team-123.ephemeral.vtstaging.com/my-learning'
    );
    expect(transformUrl('https://team-1234-branch-name.ephemeral.vtstaging.com/my-learning')).toBe(
      'https://team-1234-branch-name.ephemeral.vtstaging.com/my-learning'
    );
  });

  it('preserves subdomain with port', () => {
    expect(transformUrl('https://account.varsitytutors.com:3000/path')).toBe(
      'https://account.vtstaging.com:3000/path'
    );
  });

  it('preserves external domains', () => {
    expect(transformUrl('https://vtcrt.zendesk.com/hc/en-us')).toBe(
      'https://vtcrt.zendesk.com/hc/en-us'
    );
    expect(transformUrl('https://google.com/search')).toBe('https://google.com/search');
    expect(transformUrl('https://api.external-service.com/v1/data')).toBe(
      'https://api.external-service.com/v1/data'
    );
  });

  describe('when on ephemeral subdomain', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'http://blueshift-v4-upgrade.ephemeral.vtstaging.com',
        },
        writable: true,
      });
    });

    it('normalizes current ephemeral domain URLs to relative paths', () => {
      expect(transformUrl('http://blueshift-v4-upgrade.ephemeral.vtstaging.com/my/route')).toBe(
        '/my/route'
      );
    });

    it('translates production URLs to staging environment', () => {
      expect(transformUrl('https://www.varsitytutors.com/my/route')).toBe(
        'https://www.vtstaging.com/my/route'
      );
    });

    it('preserves external domains', () => {
      expect(transformUrl('http://www.example.com/my/route')).toBe(
        'http://www.example.com/my/route'
      );
    });
  });

  describe('when on different subdomain', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'https://other.vtstaging.com',
        },
        writable: true,
      });
    });

    it('preserves full URL and translates environment for non-current subdomains', () => {
      expect(transformUrl('https://account.varsitytutors.com/client')).toBe(
        'https://account.vtstaging.com/client'
      );
    });
  });
});

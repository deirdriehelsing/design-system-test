import asWww from './index';

describe('asWww', () => {
  it('converts internal domain without subdomain to www subdomain', () => {
    const url = 'https://varsitytutors.com/path';
    expect(asWww(url)).toBe('https://www.varsitytutors.com/path');
  });

  it('converts api subdomain to www for internal domains', () => {
    const url = 'https://api.vtstaging.com/my/route';
    expect(asWww(url)).toBe('https://www.vtstaging.com/my/route');
  });

  it('converts learn subdomain to www for internal domains', () => {
    const url = 'https://learn.varsitytutors.com/courses';
    expect(asWww(url)).toBe('https://www.varsitytutors.com/courses');
  });

  it('handles URLs with query parameters', () => {
    const url = 'https://api.varsitytutors.com/client?param=value';
    expect(asWww(url)).toBe('https://www.varsitytutors.com/client?param=value');
  });

  it('handles URLs with hash fragments', () => {
    const url = 'https://api.varsitytutors.com/client#section';
    expect(asWww(url)).toBe('https://www.varsitytutors.com/client#section');
  });

  it('preserves www subdomain', () => {
    const url = 'https://www.varsitytutors.com/path';
    expect(asWww(url)).toBe('https://www.varsitytutors.com/path');
  });

  it('preserves account subdomain', () => {
    const url = 'https://account.varsitytutors.com/client';
    expect(asWww(url)).toBe('https://account.varsitytutors.com/client');
  });

  it('preserves ai subdomain', () => {
    const url = 'https://ai.varsitytutors.com/client';
    expect(asWww(url)).toBe('https://ai.varsitytutors.com/client');
  });

  it('preserves ephemeral URLs', () => {
    const url = 'https://team-123.ephemeral.vtstaging.com/my-learning';
    expect(asWww(url)).toBe('https://team-123.ephemeral.vtstaging.com/my-learning');
  });

  it('preserves subdomain with port', () => {
    const url = 'https://account.varsitytutors.com:3000/path';
    expect(asWww(url)).toBe('https://account.varsitytutors.com:3000/path');
  });

  it('preserves ephemeral URLs with complex task names', () => {
    const url = 'https://team-1234-branch-name.ephemeral.vtstaging.com/my-learning';
    expect(asWww(url)).toBe('https://team-1234-branch-name.ephemeral.vtstaging.com/my-learning');
  });

  it('preserves external domains', () => {
    expect(asWww('https://vtcrt.zendesk.com/hc/en-us')).toBe('https://vtcrt.zendesk.com/hc/en-us');
    expect(asWww('https://google.com/search')).toBe('https://google.com/search');
    expect(asWww('https://api.external-service.com/v1/data')).toBe(
      'https://api.external-service.com/v1/data'
    );
  });

  it('preserves relative URLs', () => {
    expect(asWww('/settings')).toBe('/settings');
    expect(asWww('/a')).toBe('/a');
    expect(asWww('/b')).toBe('/b');
    expect(asWww('/path/to/resource')).toBe('/path/to/resource');
    expect(asWww('/path?query=param')).toBe('/path?query=param');
    expect(asWww('/path#fragment')).toBe('/path#fragment');
  });
});

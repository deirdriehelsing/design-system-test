import type { NavContentItem } from '../../../../types';

import isNavItemActive from './index';

describe('isNavItemActive', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    delete (window as any).location;
    window.location = {
      ...originalLocation,
      origin: 'https://example.com',
      pathname: '/current-path',
    };
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  it('returns false when item has no href', () => {
    const item: NavContentItem = {
      slug: 'test-item',
    };

    const result = isNavItemActive(item);

    expect(result).toBe(false);
  });

  it('returns false when item href is empty string', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      href: '',
    };

    const result = isNavItemActive(item);

    expect(result).toBe(false);
  });

  it('returns true when href matches current pathname exactly', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      href: '/current-path',
    };

    const result = isNavItemActive(item);

    expect(result).toBe(true);
  });

  it('returns false when href does not match current pathname', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      href: '/different-path',
    };

    const result = isNavItemActive(item);

    expect(result).toBe(false);
  });

  it('returns true when href includes origin and matches pathname', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      href: 'https://example.com/current-path',
    };

    const result = isNavItemActive(item);

    expect(result).toBe(true);
  });

  it('returns false when href includes origin but does not match pathname', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      href: 'https://example.com/different-path',
    };

    const result = isNavItemActive(item);

    expect(result).toBe(false);
  });

  it('returns false when href includes different origin', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      href: 'https://different.com/current-path',
    };

    const result = isNavItemActive(item);

    expect(result).toBe(false);
  });

  it('handles root path correctly', () => {
    window.location = {
      ...originalLocation,
      origin: 'https://example.com',
      pathname: '/',
    };

    const item: NavContentItem = {
      slug: 'test-item',
      href: '/',
    };

    const result = isNavItemActive(item);

    expect(result).toBe(true);
  });

  it('handles href with query parameters and hash', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      href: '/current-path?param=value#section',
    };

    const result = isNavItemActive(item);

    expect(result).toBe(false); // Should not match because pathname doesn't include query/hash
  });

  it('is case sensitive', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      href: '/Current-Path',
    };

    const result = isNavItemActive(item);

    expect(result).toBe(false);
  });
});

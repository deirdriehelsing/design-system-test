import type { NavItemApplicationId } from '../../../../types';

import resolveAlternativeLink from './index';

describe('resolveAlternativeLink', () => {
  const mockItem = {
    slug: 'test-item',
    href: '/original-link',
    alt_href: '/alternative-link',
  };

  it('returns null when item is enabled', () => {
    const result = resolveAlternativeLink(mockItem, true, false);

    expect(result).toBeNull();
  });

  it('returns null when feature access is loading', () => {
    const result = resolveAlternativeLink(mockItem, false, true);

    expect(result).toBeNull();
  });

  it('returns null when item is disabled but has no alt_href', () => {
    const itemWithoutAltHref = { ...mockItem, alt_href: undefined };

    const result = resolveAlternativeLink(itemWithoutAltHref, false, false);

    expect(result).toBeNull();
  });

  it('returns alternative link configuration when item is disabled and has alt_href', () => {
    const result = resolveAlternativeLink(mockItem, false, false);

    expect(result).toEqual({
      ...mockItem,
      href: '/alternative-link',
    });
  });

  it('includes alt_href_application_id when present', () => {
    const itemWithAltAppId = {
      ...mockItem,
      alt_href_application_id: 'client-account' as NavItemApplicationId,
    };

    const result = resolveAlternativeLink(itemWithAltAppId, false, false);

    expect(result).toEqual({
      ...itemWithAltAppId,
      application_id: 'client-account',
      href: '/alternative-link',
    });
  });
});

import type { NavContentItemWithApplicationId } from '../../../../types';

import isNavItemEnabled from '../is-nav-item-enabled';
import processItemUrls from '../apply-url-transformation-to-nav-item';
import processNavItem from './index';
import resolveDisabledItemFallback from '../resolve-disabled-item-fallback';

// Mock the new utility modules
jest.mock('../is-nav-item-enabled');
jest.mock('../resolve-disabled-item-fallback');
jest.mock('../apply-url-transformation-to-nav-item', () => jest.fn());

const mockIsNavItemEnabled = isNavItemEnabled as jest.MockedFunction<typeof isNavItemEnabled>;
const mockResolveAlternativeLink = resolveDisabledItemFallback as jest.MockedFunction<
  typeof resolveDisabledItemFallback
>;
const mockProcessItemUrls = processItemUrls as jest.MockedFunction<typeof processItemUrls>;

describe('processNavItem', () => {
  const mockCheckAccess = jest.fn();
  const mockUrlTransformationStrategy = jest.fn();

  beforeEach(() => {
    mockCheckAccess.mockReset();
    mockUrlTransformationStrategy.mockReset();
    mockIsNavItemEnabled.mockReset();
    mockResolveAlternativeLink.mockReset();
    mockProcessItemUrls.mockReset();

    // Default implementations
    mockUrlTransformationStrategy.mockImplementation((url) => url);
    mockProcessItemUrls.mockImplementation((item) => item);
  });

  const baseParams = {
    checkAccess: mockCheckAccess,
    isLoadingFeatureAccess: false,
    urlTransformationStrategy: mockUrlTransformationStrategy,
  };

  it('returns processed item when enabled', () => {
    const item: NavContentItemWithApplicationId = {
      slug: 'test-item',
      href: '/test-link',
    };
    const processedItem = { slug: 'test-item', href: '/test-link' };

    mockIsNavItemEnabled.mockReturnValue(true);
    mockProcessItemUrls.mockReturnValue(processedItem);
    mockResolveAlternativeLink.mockReturnValue(null);

    const result = processNavItem({
      ...baseParams,
      item,
    });

    expect(result).toEqual({
      slug: 'test-item',
      href: '/test-link',
    });
  });

  it('returns null when disabled and no alt_href', () => {
    const item: NavContentItemWithApplicationId = {
      slug: 'test-item',
      href: '/test-link',
      enablement: 'test-enablement',
    };
    const processedItem = { slug: 'test-item', href: '/test-link', enablement: 'test-enablement' };

    mockIsNavItemEnabled.mockReturnValue(false);
    mockProcessItemUrls.mockReturnValue(processedItem);
    mockResolveAlternativeLink.mockReturnValue(null);

    const result = processNavItem({
      ...baseParams,
      item,
    });

    expect(result).toBeNull();
  });

  it('returns alternative link when disabled but has alt_href', () => {
    const item: NavContentItemWithApplicationId = {
      slug: 'test-item',
      href: '/test-link',
      alt_href: '/alt-link',
      enablement: 'test-enablement',
    };
    const processedItem = { ...item };
    const altItem = { slug: 'test-item', href: '/alt-link', alt_href: '/alt-link' };

    mockIsNavItemEnabled.mockReturnValue(false);
    mockProcessItemUrls.mockReturnValue(processedItem);
    mockResolveAlternativeLink.mockReturnValue(altItem);

    const result = processNavItem({
      ...baseParams,
      item,
    });

    expect(result).toEqual({
      slug: 'test-item',
      href: '/alt-link',
      alt_href: '/alt-link',
    });
  });

  it('returns null when disabled with alt_href but loading', () => {
    const item: NavContentItemWithApplicationId = {
      slug: 'test-item',
      href: '/test-link',
      alt_href: '/alt-link',
      enablement: 'test-enablement',
    };
    const processedItem = { ...item };

    mockIsNavItemEnabled.mockReturnValue(false);
    mockProcessItemUrls.mockReturnValue(processedItem);
    mockResolveAlternativeLink.mockReturnValue(null);

    const result = processNavItem({
      ...baseParams,
      item,
      isLoadingFeatureAccess: true,
    });

    expect(result).toBeNull();
  });

  it('includes alt_href_application_id when present', () => {
    const item: NavContentItemWithApplicationId = {
      slug: 'test-item',
      href: '/test-link',
      alt_href: '/alt-link',
      alt_href_application_id: 'client-account',
      enablement: 'test-enablement',
    };
    const processedItem = { ...item };
    const altItem = {
      slug: 'test-item',
      href: '/alt-link',
      alt_href: '/alt-link',
      alt_href_application_id: 'client-account' as const,
      application_id: 'client-account' as const,
    };

    mockIsNavItemEnabled.mockReturnValue(false);
    mockProcessItemUrls.mockReturnValue(processedItem);
    mockResolveAlternativeLink.mockReturnValue(altItem);

    const result = processNavItem({
      ...baseParams,
      item,
    });

    expect(result).toEqual({
      slug: 'test-item',
      href: '/alt-link',
      alt_href: '/alt-link',
      alt_href_application_id: 'client-account',
      application_id: 'client-account',
    });
  });
});

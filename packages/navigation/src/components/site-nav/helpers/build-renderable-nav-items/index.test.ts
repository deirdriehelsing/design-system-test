import type { NavContentItem } from '../../../../types';

import buildRenderableNavItems from './index';
import generateComponentProps from '../generate-component-props';
import isNavItemActive from '../is-nav-item-active';
import selectLinkComponentType from '../select-link-component-type';

jest.mock('../generate-component-props');
jest.mock('../is-nav-item-active');
jest.mock('../select-link-component-type');

const mockGenerateComponentProps = generateComponentProps as jest.MockedFunction<
  typeof generateComponentProps
>;
const mockIsNavItemActive = isNavItemActive as jest.MockedFunction<typeof isNavItemActive>;
const mockSelectLinkComponentType = selectLinkComponentType as jest.MockedFunction<
  typeof selectLinkComponentType
>;

describe('buildRenderableNavItems', () => {
  beforeEach(() => {
    mockGenerateComponentProps.mockReset();
    mockIsNavItemActive.mockReset();
    mockSelectLinkComponentType.mockReset();

    // Default mock implementations
    mockGenerateComponentProps.mockReturnValue({ href: '/test' });
    mockIsNavItemActive.mockReturnValue(false);
    mockSelectLinkComponentType.mockReturnValue('a');
  });

  it('returns empty array when no items provided', () => {
    expect(buildRenderableNavItems()).toEqual([]);
  });

  it('returns empty array when items array is empty', () => {
    expect(buildRenderableNavItems([])).toEqual([]);
  });

  it('handles action items correctly', () => {
    const items: NavContentItem[] = [
      {
        slug: 'test-item',
        text: 'Test Item',
        href: '/test',
      },
    ];

    mockIsNavItemActive.mockReturnValue(true);
    mockSelectLinkComponentType.mockReturnValue('custom-link');
    mockGenerateComponentProps.mockReturnValue({ href: '/test', onClick: jest.fn() });

    expect(buildRenderableNavItems(items)).toEqual([
      {
        active: true,
        component: 'custom-link',
        componentProps: { href: '/test', onClick: expect.any(Function) },
        role: 'action',
        slug: 'test-item',
        text: 'Test Item',
      },
    ]);

    expect(mockIsNavItemActive).toHaveBeenCalledWith(items[0]);
    expect(mockSelectLinkComponentType).toHaveBeenCalledWith(items[0], {});
    expect(mockGenerateComponentProps).toHaveBeenCalledWith(items[0], {});
  });

  it('handles divider items correctly', () => {
    const items: NavContentItem[] = [
      {
        slug: 'divider-1',
        divider: true,
      },
    ];

    expect(buildRenderableNavItems(items)).toEqual([
      {
        role: 'divider',
        slug: 'divider-1',
      },
    ]);

    expect(mockIsNavItemActive).not.toHaveBeenCalled();
    expect(mockSelectLinkComponentType).not.toHaveBeenCalled();
    expect(mockGenerateComponentProps).not.toHaveBeenCalled();
  });

  it('handles nested items correctly', () => {
    const items: NavContentItem[] = [
      {
        slug: 'parent-item',
        text: 'Parent Item',
        items: [
          {
            slug: 'child-item',
            text: 'Child Item',
            href: '/child',
          },
        ],
      },
    ];

    expect(buildRenderableNavItems(items)).toEqual([
      {
        role: 'nested',
        slug: 'parent-item',
        text: 'Parent Item',
        items: [
          {
            active: false,
            component: 'a',
            componentProps: { href: '/test' },
            role: 'action',
            slug: 'child-item',
            text: 'Child Item',
          },
        ],
      },
    ]);
  });

  it('handles mixed item types', () => {
    const items: NavContentItem[] = [
      {
        slug: 'action-item',
        text: 'Action Item',
        href: '/action',
      },
      {
        slug: 'divider-1',
        divider: true,
      },
      {
        slug: 'nested-item',
        text: 'Nested Item',
        items: [
          {
            slug: 'nested-child',
            text: 'Nested Child',
            href: '/nested-child',
          },
        ],
      },
    ];

    /* eslint-disable-next-line testing-library/render-result-naming-convention */
    const navItems = buildRenderableNavItems(items);

    expect(navItems).toHaveLength(3);
    expect(navItems[0].role).toBe('action');
    expect(navItems[1].role).toBe('divider');
    expect(navItems[2].role).toBe('nested');
  });

  it('passes application props to utility functions', () => {
    const items: NavContentItem[] = [
      {
        slug: 'test-item',
        text: 'Test Item',
        href: '/test',
      },
    ];

    const applicationProps = {
      applicationId: 'client-account' as const,
      applicationLinkComponent: 'custom-component' as any,
    };

    buildRenderableNavItems(items, applicationProps);

    expect(mockSelectLinkComponentType).toHaveBeenCalledWith(items[0], applicationProps);
    expect(mockGenerateComponentProps).toHaveBeenCalledWith(items[0], applicationProps);
  });

  it('handles deeply nested items', () => {
    const items: NavContentItem[] = [
      {
        slug: 'level-1',
        text: 'Level 1',
        items: [
          {
            slug: 'level-2',
            text: 'Level 2',
            items: [
              {
                slug: 'level-3',
                text: 'Level 3',
                href: '/level-3',
              },
            ],
          },
        ],
      },
    ];

    /* eslint-disable-next-line testing-library/render-result-naming-convention */
    const navItems = buildRenderableNavItems(items);

    expect(navItems[0].role).toBe('nested');
    const nestedNavItem = navItems[0] as any;
    expect(nestedNavItem.items?.[0].role).toBe('nested');
    expect(nestedNavItem.items?.[0].items?.[0].role).toBe('action');
  });
});

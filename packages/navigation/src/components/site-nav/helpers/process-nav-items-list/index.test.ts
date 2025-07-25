import type { NavContentItemWithApplicationId } from '../../../../types';

import processNavItem from '../process-nav-item';
import processNavItems from './index';

// Mock the processNavItem helper
jest.mock('../process-nav-item', () => jest.fn());

const mockProcessNavItem = processNavItem as jest.MockedFunction<typeof processNavItem>;

describe('processNavItems', () => {
  const mockCheckAccess = jest.fn();
  const mockUrlTransformationStrategy = jest.fn();

  beforeEach(() => {
    mockCheckAccess.mockReset();
    mockUrlTransformationStrategy.mockReset();
    mockProcessNavItem.mockReset();
  });

  const baseParams = {
    checkAccess: mockCheckAccess,
    isLoadingFeatureAccess: false,
    urlTransformationStrategy: mockUrlTransformationStrategy,
  };

  it('processes flat items correctly', () => {
    const items: NavContentItemWithApplicationId[] = [
      { slug: 'item1', href: '/link1' },
      { slug: 'item2', href: '/link2' },
    ];

    mockProcessNavItem
      .mockReturnValueOnce({ slug: 'item1', href: '/link1' })
      .mockReturnValueOnce({ slug: 'item2', href: '/link2' });

    const result = processNavItems({
      ...baseParams,
      items,
    });

    expect(result).toEqual([
      { slug: 'item1', href: '/link1' },
      { slug: 'item2', href: '/link2' },
    ]);
    expect(mockProcessNavItem).toHaveBeenCalledTimes(2);
  });

  it('filters out null items', () => {
    const items: NavContentItemWithApplicationId[] = [
      { slug: 'item1', href: '/link1' },
      { slug: 'item2', href: '/link2' },
    ];

    mockProcessNavItem
      .mockReturnValueOnce({ slug: 'item1', href: '/link1' })
      .mockReturnValueOnce(null);

    const result = processNavItems({
      ...baseParams,
      items,
    });

    expect(result).toEqual([{ slug: 'item1', href: '/link1' }]);
  });

  it('processes nested items recursively', () => {
    const items: NavContentItemWithApplicationId[] = [
      {
        slug: 'parent',
        items: [
          { slug: 'child1', href: '/child1' },
          { slug: 'child2', href: '/child2' },
        ],
      },
    ];

    mockProcessNavItem
      .mockReturnValueOnce({
        slug: 'parent',
        items: [
          { slug: 'child1', href: '/child1' },
          { slug: 'child2', href: '/child2' },
        ],
      })
      .mockReturnValueOnce({ slug: 'child1', href: '/child1' })
      .mockReturnValueOnce({ slug: 'child2', href: '/child2' });

    const result = processNavItems({
      ...baseParams,
      items,
    });

    expect(result).toEqual([
      {
        slug: 'parent',
        items: [
          { slug: 'child1', href: '/child1' },
          { slug: 'child2', href: '/child2' },
        ],
      },
    ]);
    expect(mockProcessNavItem).toHaveBeenCalledTimes(3); // parent + 2 children
  });

  it('processes single item without children', () => {
    const items = [
      {
        text: 'Test Item',
        href: '/test-path',
        application_id: 'client-account' as const,
      },
    ];

    const processedItem = {
      text: 'Test Item',
      href: 'transformed-/test-path',
      application_id: 'client-account' as const,
    };

    mockProcessNavItem.mockReturnValue(processedItem);

    const result = processNavItems({
      items,
      urlTransformationStrategy: mockUrlTransformationStrategy,
      checkAccess: mockCheckAccess,
      isLoadingFeatureAccess: false,
    });

    expect(result).toEqual([processedItem]);
    expect(mockProcessNavItem).toHaveBeenCalledWith({
      item: items[0],
      urlTransformationStrategy: mockUrlTransformationStrategy,
      checkAccess: mockCheckAccess,
      isLoadingFeatureAccess: false,
    });
  });

  it('filters out disabled items', () => {
    const items = [
      {
        text: 'Enabled Item',
        href: '/enabled-path',
        application_id: 'client-account' as const,
      },
      {
        text: 'Disabled Item',
        href: '/disabled-path',
        application_id: 'client-account' as const,
      },
    ];

    const enabledProcessedItem = {
      text: 'Enabled Item',
      href: 'transformed-/enabled-path',
      application_id: 'client-account' as const,
    };

    mockProcessNavItem
      .mockReturnValueOnce(enabledProcessedItem) // First item enabled
      .mockReturnValueOnce(null); // Second item disabled

    const result = processNavItems({
      items,
      urlTransformationStrategy: mockUrlTransformationStrategy,
      checkAccess: mockCheckAccess,
      isLoadingFeatureAccess: false,
    });

    expect(result).toEqual([enabledProcessedItem]);
    expect(mockProcessNavItem).toHaveBeenCalledTimes(2);
  });

  it('processes multiple items without children', () => {
    const items = [
      {
        text: 'Item 1',
        href: '/path-1',
        application_id: 'client-account' as const,
      },
      {
        text: 'Item 2',
        href: '/path-2',
        application_id: 'my-learning' as const,
      },
    ];

    const processedItem1 = {
      text: 'Item 1',
      href: 'transformed-/path-1',
      application_id: 'client-account' as const,
    };

    const processedItem2 = {
      text: 'Item 2',
      href: 'transformed-/path-2',
      application_id: 'my-learning' as const,
    };

    mockProcessNavItem.mockReturnValueOnce(processedItem1).mockReturnValueOnce(processedItem2);

    const result = processNavItems({
      items,
      urlTransformationStrategy: mockUrlTransformationStrategy,
      checkAccess: mockCheckAccess,
      isLoadingFeatureAccess: false,
    });

    expect(result).toEqual([processedItem1, processedItem2]);
    expect(mockProcessNavItem).toHaveBeenCalledTimes(2);
  });

  it('processes parent item with nested children recursively', () => {
    const items = [
      {
        text: 'Parent Item',
        href: '/parent-path',
        application_id: 'client-account' as const,
        items: [
          {
            text: 'Child Item 1',
            href: '/child-1',
            application_id: 'my-learning' as const,
          },
          {
            text: 'Child Item 2',
            href: '/child-2',
            application_id: 'client-account' as const,
          },
        ],
      },
    ];

    const processedParent = {
      text: 'Parent Item',
      href: 'transformed-/parent-path',
      application_id: 'client-account' as const,
      items: [
        {
          text: 'Child Item 1',
          href: '/child-1',
          application_id: 'my-learning' as const,
        },
        {
          text: 'Child Item 2',
          href: '/child-2',
          application_id: 'client-account' as const,
        },
      ],
    };

    const processedChild1 = {
      text: 'Child Item 1',
      href: 'transformed-/child-1',
      application_id: 'my-learning' as const,
    };

    const processedChild2 = {
      text: 'Child Item 2',
      href: 'transformed-/child-2',
      application_id: 'client-account' as const,
    };

    mockProcessNavItem
      .mockReturnValueOnce(processedParent) // Parent item
      .mockReturnValueOnce(processedChild1) // First child
      .mockReturnValueOnce(processedChild2); // Second child

    const result = processNavItems({
      items,
      urlTransformationStrategy: mockUrlTransformationStrategy,
      checkAccess: mockCheckAccess,
      isLoadingFeatureAccess: false,
    });

    expect(result).toEqual([
      {
        ...processedParent,
        items: [processedChild1, processedChild2],
      },
    ]);

    expect(mockProcessNavItem).toHaveBeenCalledTimes(3);
    expect(mockProcessNavItem).toHaveBeenNthCalledWith(1, {
      item: items[0],
      urlTransformationStrategy: mockUrlTransformationStrategy,
      checkAccess: mockCheckAccess,
      isLoadingFeatureAccess: false,
    });
    expect(mockProcessNavItem).toHaveBeenNthCalledWith(2, {
      item: items[0].items[0],
      urlTransformationStrategy: mockUrlTransformationStrategy,
      checkAccess: mockCheckAccess,
      isLoadingFeatureAccess: false,
    });
    expect(mockProcessNavItem).toHaveBeenNthCalledWith(3, {
      item: items[0].items[1],
      urlTransformationStrategy: mockUrlTransformationStrategy,
      checkAccess: mockCheckAccess,
      isLoadingFeatureAccess: false,
    });
  });

  it('filters out disabled children from parent item', () => {
    const items = [
      {
        text: 'Parent Item',
        href: '/parent-path',
        application_id: 'client-account' as const,
        items: [
          {
            text: 'Enabled Child',
            href: '/enabled-child',
            application_id: 'my-learning' as const,
          },
          {
            text: 'Disabled Child',
            href: '/disabled-child',
            application_id: 'client-account' as const,
          },
        ],
      },
    ];

    const processedParent = {
      text: 'Parent Item',
      href: 'transformed-/parent-path',
      application_id: 'client-account' as const,
      items: [
        {
          text: 'Enabled Child',
          href: '/enabled-child',
          application_id: 'my-learning' as const,
        },
        {
          text: 'Disabled Child',
          href: '/disabled-child',
          application_id: 'client-account' as const,
        },
      ],
    };

    const processedEnabledChild = {
      text: 'Enabled Child',
      href: 'transformed-/enabled-child',
      application_id: 'my-learning' as const,
    };

    mockProcessNavItem
      .mockReturnValueOnce(processedParent) // Parent item
      .mockReturnValueOnce(processedEnabledChild) // Enabled child
      .mockReturnValueOnce(null); // Disabled child

    const result = processNavItems({
      items,
      urlTransformationStrategy: mockUrlTransformationStrategy,
      checkAccess: mockCheckAccess,
      isLoadingFeatureAccess: false,
    });

    expect(result).toEqual([
      {
        ...processedParent,
        items: [processedEnabledChild], // Only enabled child remains
      },
    ]);

    expect(mockProcessNavItem).toHaveBeenCalledTimes(3);
  });

  it('handles empty items array', () => {
    const result = processNavItems({
      items: [],
      urlTransformationStrategy: mockUrlTransformationStrategy,
      checkAccess: mockCheckAccess,
      isLoadingFeatureAccess: false,
    });

    expect(result).toEqual([]);
    expect(mockProcessNavItem).not.toHaveBeenCalled();
  });

  it('handles parent item with empty children array', () => {
    const items = [
      {
        text: 'Parent Item',
        href: '/parent-path',
        application_id: 'client-account' as const,
        items: [],
      },
    ];

    const processedParent = {
      text: 'Parent Item',
      href: 'transformed-/parent-path',
      application_id: 'client-account' as const,
      items: [],
    };

    mockProcessNavItem.mockReturnValue(processedParent);

    const result = processNavItems({
      items,
      urlTransformationStrategy: mockUrlTransformationStrategy,
      checkAccess: mockCheckAccess,
      isLoadingFeatureAccess: false,
    });

    expect(result).toEqual([processedParent]);
    expect(mockProcessNavItem).toHaveBeenCalledTimes(1);
  });

  it('filters out disabled parent item', () => {
    const items = [
      {
        text: 'Disabled Parent',
        href: '/disabled-parent',
        application_id: 'client-account' as const,
        items: [
          {
            text: 'Child Item',
            href: '/child',
            application_id: 'my-learning' as const,
          },
        ],
      },
    ];

    mockProcessNavItem.mockReturnValue(null); // Parent is disabled

    const result = processNavItems({
      items,
      urlTransformationStrategy: mockUrlTransformationStrategy,
      checkAccess: mockCheckAccess,
      isLoadingFeatureAccess: false,
    });

    expect(result).toEqual([]);
    expect(mockProcessNavItem).toHaveBeenCalledTimes(1); // Only parent processed, children skipped
  });
});

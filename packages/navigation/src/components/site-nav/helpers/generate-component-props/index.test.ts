import type { NavContentItem } from '../../../../types';

import generateComponentProps from './index';

describe('generateComponentProps', () => {
  it('returns base props with href when no application props provided', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      href: '/test-path',
      onClick: jest.fn(),
      target: '_blank',
    };

    const result = generateComponentProps(item, {});

    expect(result).toEqual({
      onClick: item.onClick,
      target: '_blank',
      href: '/test-path',
    });
  });

  it('returns base props with href when no applicationId in props', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      href: '/test-path',
      application_id: 'client-account',
    };

    const applicationProps = {
      getApplicationLinkComponentProps: jest.fn().mockReturnValue({ to: '/test-path' }),
    };

    const result = generateComponentProps(item, applicationProps);

    expect(result).toEqual({
      onClick: undefined,
      target: undefined,
      href: '/test-path',
    });
    expect(applicationProps.getApplicationLinkComponentProps).not.toHaveBeenCalled();
  });

  it('returns base props with href when no getApplicationLinkComponentProps in props', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      href: '/test-path',
      application_id: 'client-account',
    };

    const applicationProps = {
      applicationId: 'client-account' as const,
    };

    const result = generateComponentProps(item, applicationProps);

    expect(result).toEqual({
      onClick: undefined,
      target: undefined,
      href: '/test-path',
    });
  });

  it('returns base props with href when application IDs do not match', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      href: '/test-path',
      application_id: 'my-learning',
      onClick: jest.fn(),
      target: '_self',
    };

    const applicationProps = {
      applicationId: 'client-account' as const,
      getApplicationLinkComponentProps: jest.fn().mockReturnValue({ to: '/test-path' }),
    };

    const result = generateComponentProps(item, applicationProps);

    expect(result).toEqual({
      onClick: item.onClick,
      target: '_self',
      href: '/test-path',
    });
    expect(applicationProps.getApplicationLinkComponentProps).not.toHaveBeenCalled();
  });

  it('returns merged props when application IDs match and getApplicationLinkComponentProps provided', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      href: '/test-path',
      application_id: 'client-account',
      onClick: jest.fn(),
      target: '_blank',
    };

    const applicationLinkProps = {
      to: '/test-path',
      className: 'custom-link',
    };

    const applicationProps = {
      applicationId: 'client-account' as const,
      getApplicationLinkComponentProps: jest.fn().mockReturnValue(applicationLinkProps),
    };

    const result = generateComponentProps(item, applicationProps);

    expect(result).toEqual({
      onClick: item.onClick,
      target: '_blank',
      to: '/test-path',
      className: 'custom-link',
    });
    expect(applicationProps.getApplicationLinkComponentProps).toHaveBeenCalledWith(item);
  });

  it('handles item without onClick and target', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      href: '/test-path',
    };

    const result = generateComponentProps(item, {});

    expect(result).toEqual({
      onClick: undefined,
      target: undefined,
      href: '/test-path',
    });
  });

  it('handles item without href', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      onClick: jest.fn(),
    };

    const result = generateComponentProps(item, {});

    expect(result).toEqual({
      onClick: item.onClick,
      target: undefined,
      href: undefined,
    });
  });

  it('merges application props correctly with base props taking precedence', () => {
    const mockOnClick = jest.fn();
    const item: NavContentItem = {
      slug: 'test-item',
      href: '/test-path',
      application_id: 'client-account',
      onClick: mockOnClick,
      target: '_blank',
    };

    const applicationLinkProps = {
      to: '/test-path',
      className: 'custom-link',
    };

    const applicationProps = {
      applicationId: 'client-account' as const,
      getApplicationLinkComponentProps: jest.fn().mockReturnValue(applicationLinkProps),
    };

    const result = generateComponentProps(item, applicationProps);

    expect(result.onClick).toBe(mockOnClick);
    expect(result.target).toBe('_blank');
    expect(result.to).toBe('/test-path');
    expect(result.className).toBe('custom-link');
  });

  it('handles item without application_id', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      href: '/test-path',
    };

    const applicationProps = {
      applicationId: 'client-account' as const,
      getApplicationLinkComponentProps: jest.fn().mockReturnValue({ to: '/test-path' }),
    };

    const result = generateComponentProps(item, applicationProps);

    expect(result).toEqual({
      onClick: undefined,
      target: undefined,
      href: '/test-path',
    });
    expect(applicationProps.getApplicationLinkComponentProps).not.toHaveBeenCalled();
  });
});

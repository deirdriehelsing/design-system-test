import type { NavContentItem } from '../../../../types';

import selectLinkComponentType from './index';

describe('selectLinkComponentType', () => {
  it('returns anchor tag when no application props provided', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      application_id: 'client-account',
    };

    const result = selectLinkComponentType(item, {});

    expect(result).toBe('a');
  });

  it('returns anchor tag when no applicationId in props', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      application_id: 'client-account',
    };

    const applicationProps = {
      applicationLinkComponent: 'custom-link' as any,
    };

    const result = selectLinkComponentType(item, applicationProps);

    expect(result).toBe('a');
  });

  it('returns anchor tag when no applicationLinkComponent in props', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      application_id: 'client-account',
    };

    const applicationProps = {
      applicationId: 'client-account' as const,
    };

    const result = selectLinkComponentType(item, applicationProps);

    expect(result).toBe('a');
  });

  it('returns anchor tag when application IDs do not match', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      application_id: 'my-learning',
    };

    const applicationProps = {
      applicationId: 'client-account' as const,
      applicationLinkComponent: 'custom-link' as any,
    };

    const result = selectLinkComponentType(item, applicationProps);

    expect(result).toBe('a');
  });

  it('returns custom component when application IDs match and component provided', () => {
    const customComponent = 'custom-link';
    const item: NavContentItem = {
      slug: 'test-item',
      application_id: 'client-account',
    };

    const applicationProps = {
      applicationId: 'client-account' as const,
      applicationLinkComponent: customComponent as any,
    };

    const result = selectLinkComponentType(item, applicationProps);

    expect(result).toBe(customComponent);
  });

  it('returns React component when application IDs match and React component provided', () => {
    const CustomComponent = () => null;
    const item: NavContentItem = {
      slug: 'test-item',
      application_id: 'client-account',
    };

    const applicationProps = {
      applicationId: 'client-account' as const,
      applicationLinkComponent: CustomComponent,
    };

    const result = selectLinkComponentType(item, applicationProps);

    expect(result).toBe(CustomComponent);
  });

  it('handles item without application_id', () => {
    const item: NavContentItem = {
      slug: 'test-item',
    };

    const applicationProps = {
      applicationId: 'client-account' as const,
      applicationLinkComponent: 'custom-link' as any,
    };

    const result = selectLinkComponentType(item, applicationProps);

    expect(result).toBe('a');
  });

  it('handles empty application props', () => {
    const item: NavContentItem = {
      slug: 'test-item',
      application_id: 'client-account',
    };

    const result = selectLinkComponentType(item, {});

    expect(result).toBe('a');
  });
});

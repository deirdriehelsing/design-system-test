import processItemUrls from './index';

describe('processItemUrls', () => {
  const mockUrlTransformationStrategy = jest.fn();

  beforeEach(() => {
    mockUrlTransformationStrategy.mockClear();
    mockUrlTransformationStrategy.mockImplementation(
      (url, applicationId) => `transformed-${url}-${applicationId || 'default'}`
    );
  });

  it('processes item with href only', () => {
    const item = {
      text: 'Test Item',
      href: '/test-path',
      application_id: 'client-account' as const,
    };

    const result = processItemUrls(item, mockUrlTransformationStrategy);

    expect(result).toEqual({
      text: 'Test Item',
      href: 'transformed-/test-path-client-account',
      application_id: 'client-account',
    });
    expect(mockUrlTransformationStrategy).toHaveBeenCalledWith('/test-path', 'client-account');
    expect(mockUrlTransformationStrategy).toHaveBeenCalledTimes(1);
  });

  it('processes item with alt_href only', () => {
    const item = {
      text: 'Test Item',
      alt_href: '/alt-path',
      alt_href_application_id: 'my-learning' as const,
    };

    const result = processItemUrls(item, mockUrlTransformationStrategy);

    expect(result).toEqual({
      text: 'Test Item',
      alt_href: 'transformed-/alt-path-my-learning',
      alt_href_application_id: 'my-learning',
    });
    expect(mockUrlTransformationStrategy).toHaveBeenCalledWith('/alt-path', 'my-learning');
    expect(mockUrlTransformationStrategy).toHaveBeenCalledTimes(1);
  });

  it('processes item with both href and alt_href', () => {
    const item = {
      text: 'Test Item',
      href: '/main-path',
      alt_href: '/alt-path',
      application_id: 'vtwa' as const,
      alt_href_application_id: 'my-learning' as const,
    };

    const result = processItemUrls(item, mockUrlTransformationStrategy);

    expect(result).toEqual({
      text: 'Test Item',
      href: 'transformed-/main-path-vtwa',
      alt_href: 'transformed-/alt-path-my-learning',
      application_id: 'vtwa',
      alt_href_application_id: 'my-learning',
    });
    expect(mockUrlTransformationStrategy).toHaveBeenCalledWith('/main-path', 'vtwa');
    expect(mockUrlTransformationStrategy).toHaveBeenCalledWith('/alt-path', 'my-learning');
    expect(mockUrlTransformationStrategy).toHaveBeenCalledTimes(2);
  });

  it('uses application_id fallback when alt_href_application_id is not provided', () => {
    const item = {
      text: 'Test Item',
      href: '/main-path',
      alt_href: '/alt-path',
      application_id: 'client-account' as const,
    };

    const result = processItemUrls(item, mockUrlTransformationStrategy);

    expect(result).toEqual({
      text: 'Test Item',
      href: 'transformed-/main-path-client-account',
      alt_href: 'transformed-/alt-path-client-account',
      application_id: 'client-account',
    });
    expect(mockUrlTransformationStrategy).toHaveBeenCalledWith('/main-path', 'client-account');
    expect(mockUrlTransformationStrategy).toHaveBeenCalledWith('/alt-path', 'client-account');
  });

  it('uses applicationId fallback when application_id is not provided', () => {
    const item = {
      text: 'Test Item',
      href: '/main-path',
      alt_href: '/alt-path',
      applicationId: 'vtwa' as const,
    };

    const result = processItemUrls(item, mockUrlTransformationStrategy);

    expect(result).toEqual({
      text: 'Test Item',
      href: 'transformed-/main-path-vtwa',
      alt_href: 'transformed-/alt-path-vtwa',
      applicationId: 'vtwa',
    });
    expect(mockUrlTransformationStrategy).toHaveBeenCalledWith('/main-path', 'vtwa');
    expect(mockUrlTransformationStrategy).toHaveBeenCalledWith('/alt-path', 'vtwa');
  });

  it('handles item with no URLs', () => {
    const item = {
      text: 'Test Item',
      application_id: 'client-account' as const,
    };

    const result = processItemUrls(item, mockUrlTransformationStrategy);

    expect(result).toEqual({
      text: 'Test Item',
      application_id: 'client-account',
    });
    expect(mockUrlTransformationStrategy).not.toHaveBeenCalled();
  });

  it('does not mutate the original item', () => {
    const originalItem = {
      text: 'Test Item',
      href: '/test-path',
      application_id: 'client-account' as const,
    };
    const itemCopy = { ...originalItem };

    processItemUrls(originalItem, mockUrlTransformationStrategy);

    expect(originalItem).toEqual(itemCopy);
  });

  it('passes raw URLs directly to transformation strategy', () => {
    const item = {
      text: 'Test Item',
      href: 'test-path', // No leading slash
      alt_href: '//double-slash-path',
      application_id: 'client-account' as const,
    };

    const result = processItemUrls(item, mockUrlTransformationStrategy);

    // Raw URLs are passed directly to the transformation strategy
    expect(result.href).toBe('transformed-test-path-client-account');
    expect(result.alt_href).toBe('transformed-//double-slash-path-client-account');
    expect(mockUrlTransformationStrategy).toHaveBeenCalledWith('test-path', 'client-account');
    expect(mockUrlTransformationStrategy).toHaveBeenCalledWith(
      '//double-slash-path',
      'client-account'
    );
  });
});

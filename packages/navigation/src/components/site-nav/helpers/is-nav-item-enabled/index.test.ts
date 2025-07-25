import isItemEnabled from './index';

describe('isItemEnabled', () => {
  const mockCheckAccess = jest.fn();

  beforeEach(() => {
    mockCheckAccess.mockReset();
  });

  it('returns true when item has no enablement or feature flag', () => {
    const item = { slug: 'test-item' };

    const result = isItemEnabled(item, mockCheckAccess);

    expect(result).toBe(true);
    expect(mockCheckAccess).not.toHaveBeenCalled();
  });

  it('returns access result when item has enablement', () => {
    const item = { slug: 'test-item', enablement: 'test-enablement' };
    mockCheckAccess.mockReturnValue(true);

    const result = isItemEnabled(item, mockCheckAccess);

    expect(result).toBe(true);
    expect(mockCheckAccess).toHaveBeenCalledWith({
      criteria: {
        every: [{ enablement: 'test-enablement' }, true],
      },
    });
  });

  it('returns access result when item has feature flag', () => {
    const item = { slug: 'test-item', feature_flag: 'test-flag' };
    mockCheckAccess.mockReturnValue(false);

    const result = isItemEnabled(item, mockCheckAccess);

    expect(result).toBe(false);
    expect(mockCheckAccess).toHaveBeenCalledWith({
      criteria: {
        every: [true, { flag: 'test-flag' }],
      },
    });
  });

  it('returns false when checkAccess returns undefined', () => {
    const item = { slug: 'test-item', enablement: 'test-enablement' };
    mockCheckAccess.mockReturnValue(undefined);

    const result = isItemEnabled(item, mockCheckAccess);

    expect(result).toBe(false);
  });

  it('handles both enablement and feature flag', () => {
    const item = {
      slug: 'test-item',
      enablement: 'test-enablement',
      feature_flag: 'test-flag',
    };
    mockCheckAccess.mockReturnValue(true);

    const result = isItemEnabled(item, mockCheckAccess);

    expect(result).toBe(true);
    expect(mockCheckAccess).toHaveBeenCalledWith({
      criteria: {
        every: [{ enablement: 'test-enablement' }, { flag: 'test-flag' }],
      },
    });
  });
});

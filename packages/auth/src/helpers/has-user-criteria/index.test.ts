import hasUserCriteria from '.';

describe('hasUserCriteria()', () => {
  it('returns true if the criteria is a user criteria', () => {
    expect(hasUserCriteria({ enablement: 'test' })).toBe(true);
    expect(hasUserCriteria({ productState: 'free_class' })).toBe(true);
    expect(hasUserCriteria({ role: 'student' })).toBe(true);
    expect(
      hasUserCriteria({
        every: [
          { enablement: 'test' },
          { productState: 'one_on_one_membership' },
          { role: 'client' },
        ],
      })
    ).toBe(true);
    expect(
      hasUserCriteria({
        every: [{ enablement: 'test' }, { productState: 'tutoring' }, { role: 'tutor' }],
      })
    ).toBe(true);
  });

  it('returns false if the criteria is not a user criteria', () => {
    expect(hasUserCriteria({ flag: 'test' })).toBe(false);
    expect(hasUserCriteria({ every: [{ flag: 'test' }] })).toBe(false);
    expect(hasUserCriteria({ some: [{ flag: 'test' }] })).toBe(false);
  });
});

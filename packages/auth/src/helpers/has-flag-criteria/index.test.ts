import hasFlagCriteria from '.';

describe('hasFlagCriteria()', () => {
  it('returns true if the criteria is a flag', () => {
    expect(hasFlagCriteria({ flag: 'test' })).toBe(true);
    expect(hasFlagCriteria({ every: [{ flag: 'test' }] })).toBe(true);
    expect(hasFlagCriteria({ some: [{ flag: 'test' }] })).toBe(true);
  });

  it('returns false if the criteria is not a flag', () => {
    expect(hasFlagCriteria({ enablement: 'test' })).toBe(false);
    expect(hasFlagCriteria({ productState: 'free_class' })).toBe(false);
    expect(hasFlagCriteria({ role: 'student' })).toBe(false);
    expect(
      hasFlagCriteria({
        every: [
          { enablement: 'test' },
          { productState: 'one_on_one_membership' },
          { role: 'client' },
        ],
      })
    ).toBe(false);
    expect(
      hasFlagCriteria({
        every: [{ enablement: 'test' }, { productState: 'tutoring' }, { role: 'tutor' }],
      })
    ).toBe(false);
  });
});

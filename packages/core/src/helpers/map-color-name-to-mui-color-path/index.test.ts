import mapColorNameToMuiColorPath from '.';

describe('mapColorNameToMuiColorPath()', () => {
  it('should return the color with the `.main` suffix', () => {
    expect(mapColorNameToMuiColorPath('primary')).toBe('primary.main');
  });

  it('should leave value untouched for other color values', () => {
    const fn = () => {};
    expect(mapColorNameToMuiColorPath(undefined)).toBe(undefined);
    expect(mapColorNameToMuiColorPath(fn)).toBe(fn);
    expect(mapColorNameToMuiColorPath({})).toEqual({});
    expect(mapColorNameToMuiColorPath('inherit')).toBe('inherit');
    expect(mapColorNameToMuiColorPath('primary.main')).toBe('primary.main');
    expect(mapColorNameToMuiColorPath('var(--color)')).toBe('var(--color)');
  });
});

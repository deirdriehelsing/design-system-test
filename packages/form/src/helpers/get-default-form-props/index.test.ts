import getDefaultFormProps from '.';

describe('getDefaultFormProps()', () => {
  it('returns an object', () => {
    const result = getDefaultFormProps();

    expect(typeof result).toBe('object');
  });
});

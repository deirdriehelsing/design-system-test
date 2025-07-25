import getFlagOverride from '.';

describe('getFlagOverride()', () => {
  const flag = 'mock-flag-1';

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: { search: `${flag}=false` },
      writable: true,
    });
  });

  describe('when the URL param is a boolean string', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: { search: `${flag}=false` },
        writable: true,
      });
    });

    it('returns the URL param value', () => {
      expect(getFlagOverride({ flag })).toBe(false);
    });
  });

  describe('when the URL param is not a boolean string', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: { search: `${flag}=mock-value` },
        writable: true,
      });
    });

    it('returns the URL param value', () => {
      expect(getFlagOverride({ flag })).toBe('mock-value');
    });
  });

  describe('when the URL param is an empty string', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: { search: '' },
        writable: true,
      });
    });

    it('returns undefined', () => {
      expect(getFlagOverride({ flag })).toBe(undefined);
    });
  });
});

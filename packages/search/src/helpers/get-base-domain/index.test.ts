import getBaseDomain from '.';

// eslint-disable-next-line no-global-assign
window = Object.create(window);

describe('clients index', () => {
  describe('getBaseDomain', () => {
    it('is defined', () => {
      expect(getBaseDomain).toBeDefined();
    });

    it('returns the base domain for staging', () => {
      Object.defineProperty(window, 'location', {
        value: { host: 'www.vtstaging.com' },
        writable: true,
      });

      expect(getBaseDomain()).toEqual('https://itemsearch.vtstaging.com');
    });

    it('returns the base domain for production', () => {
      Object.defineProperty(window, 'location', {
        value: { host: 'www.varsitytutors.com' },
        writable: true,
      });

      expect(getBaseDomain()).toEqual('https://itemsearch.varsitytutors.com');
    });
  });
});

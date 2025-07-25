import parseRequestKey from '.';

describe('parseRequestKey()', () => {
  describe('query key', () => {
    it('uses query key array if provided', () => {
      const key = ['mock', 'query', 'key'];
      const request = { url: '/mock' };

      const result = parseRequestKey({ key, request });

      expect(result).toEqual(key);
    });

    it('uses query key string if provided', () => {
      const key = 'mock';
      const request = { url: '/mock' };

      const result = parseRequestKey({ key, request });

      expect(result).toEqual([key]);
    });

    it('uses url as query key if query key is not provided', () => {
      const request = { url: '/mock' };

      const result = parseRequestKey({ request });

      expect(result).toEqual([request.url]);
    });

    it('adds in-background query key if loadInBackground is provided', () => {
      const key = 'mock';
      const request = { url: '/mock' };

      const result = parseRequestKey({ loadInBackground: true, key, request });

      expect(result).toEqual([key, 'in-background']);
    });

    it('uses a random string if query key and url are missing', () => {
      const resultA = parseRequestKey();
      const resultB = parseRequestKey();

      const [randomStringA] = resultA;
      const [randomStringB] = resultB;

      expect(resultA).toHaveLength(1);
      expect(resultB).toHaveLength(1);
      expect(randomStringA).toHaveLength(5);
      expect(randomStringB).toHaveLength(5);
      expect(randomStringA).not.toBe(randomStringB);
    });
  });
});

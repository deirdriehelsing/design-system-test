import { makeRequest, parseRequestKey } from '.';

describe('helpers index', () => {
  describe('makeRequest()', () => {
    it('is defined', () => {
      expect(makeRequest).toBeDefined();
    });
  });

  describe('parseRequestKey()', () => {
    it('is defined', () => {
      expect(parseRequestKey).toBeDefined();
    });
  });
});

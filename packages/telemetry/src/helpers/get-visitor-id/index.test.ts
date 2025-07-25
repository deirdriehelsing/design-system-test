import Cookies from 'js-cookie';
import getVisitorId from '.';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));

describe('getVisitorId()', () => {
  describe('when visitor_id cookie is not set', () => {
    beforeEach(() => {
      Cookies.remove('visitor_id');
    });

    it('creates visitor_id cookie', () => {
      expect(getVisitorId()).toEqual('mock-uuid');
    });
  });

  describe('when visitor_id cookie is set', () => {
    beforeEach(() => {
      Cookies.set('visitor_id', 'mock-visitor-id');
    });

    it('returns correct visitor_id', () => {
      expect(getVisitorId()).toEqual('mock-visitor-id');
    });
  });
});

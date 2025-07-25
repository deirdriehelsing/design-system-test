import getBrowserSessionId from '.';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));

describe('getBrowserSessionId()', () => {
  describe('when browser_session_id is not set', () => {
    beforeEach(() => {
      window.sessionStorage.removeItem('browser_session_id');
    });

    it('stores new browser_session_id in SessionStorage', () => {
      expect(getBrowserSessionId()).toEqual('mock-uuid');
    });
  });

  describe('when browser_session_id is set', () => {
    beforeEach(() => {
      window.sessionStorage.setItem('browser_session_id', 'mock-browser-session-id');
    });

    it('returns correct browser_session_id', () => {
      expect(getBrowserSessionId()).toEqual('mock-browser-session-id');
    });
  });
});

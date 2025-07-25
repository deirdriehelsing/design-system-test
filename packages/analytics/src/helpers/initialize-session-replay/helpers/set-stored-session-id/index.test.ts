import { STORED_SESSION_ID_KEY } from '../../constants';
import setStoredSessionId from '.';

describe('setStoredSessionId()', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
  });

  it('should store the session ID in localStorage', () => {
    const sessionId = 12345;

    setStoredSessionId(sessionId);

    expect(window.localStorage.getItem(STORED_SESSION_ID_KEY)).toBe(sessionId.toString());
  });

  it('should convert the numeric ID to a string', () => {
    const sessionId = 98765;

    setStoredSessionId(sessionId);

    expect(window.localStorage.getItem(STORED_SESSION_ID_KEY)).toBe(sessionId.toString());
  });
});

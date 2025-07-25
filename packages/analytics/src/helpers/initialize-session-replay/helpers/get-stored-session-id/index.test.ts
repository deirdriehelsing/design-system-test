import { STORED_SESSION_ID_KEY } from '../../constants';
import getStoredSessionId from '.';

describe('getStoredSessionId()', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
  });

  it('returns "0" when no session ID is stored', () => {
    window.localStorage.removeItem(STORED_SESSION_ID_KEY);

    const result = getStoredSessionId();
    expect(result).toBe('0');
  });

  it('returns the stored session ID from localStorage', () => {
    const expectedSessionId = '12345';
    window.localStorage.setItem(STORED_SESSION_ID_KEY, expectedSessionId);

    const result = getStoredSessionId();
    expect(result).toBe(expectedSessionId);
  });
});

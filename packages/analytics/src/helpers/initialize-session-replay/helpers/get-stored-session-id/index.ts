import { STORED_SESSION_ID_KEY } from '../../constants';

/**
 * Retrieves the stored session ID from local storage.
 *
 * @see: https://amplitude.com/docs/session-replay/session-replay-integration-with-segment#amplitude-actions-destination
 */
function getStoredSessionId() {
  return window.localStorage.getItem(STORED_SESSION_ID_KEY) ?? '0';
}

export default getStoredSessionId;

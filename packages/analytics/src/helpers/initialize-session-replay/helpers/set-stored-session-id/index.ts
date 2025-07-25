import { STORED_SESSION_ID_KEY } from '../../constants';

/**
 * Sets the session ID in local storage.
 *
 * @see: https://amplitude.com/docs/session-replay/session-replay-integration-with-segment#amplitude-actions-destination
 */
function setStoredSessionId(id: number) {
  return window.localStorage.setItem(STORED_SESSION_ID_KEY, id.toString());
}

export default setStoredSessionId;

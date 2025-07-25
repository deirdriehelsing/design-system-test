import { v4 as uuid } from 'uuid';

function getBrowserSessionId() {
  if (!window.sessionStorage.getItem('browser_session_id')) {
    window.sessionStorage.setItem('browser_session_id', uuid());
  }

  return window.sessionStorage.getItem('browser_session_id') as string;
}

export default getBrowserSessionId;

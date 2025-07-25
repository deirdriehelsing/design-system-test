import type { Dispatch, SetStateAction } from 'react';

import { useCallback, useEffect, useState } from 'react';

type UseHashResult = [string, Dispatch<SetStateAction<string>>];

function useHash(): UseHashResult {
  const [hash, setHash] = useState(() => window?.location?.hash?.replace(/^#/, '') || '');
  const hashChangeHandler = useCallback(() => setHash(window.location.hash.replace(/^#/, '')), []);

  const updateHash: Dispatch<SetStateAction<string>> = useCallback(
    (dispatch) => {
      const newHash = typeof dispatch === 'function' ? dispatch(hash) : dispatch;

      if (newHash !== hash) {
        window.location.hash = newHash;
        // Remove the hash if it's empty
        if (!newHash) {
          history.replaceState(null, '', window.location.href.split('#')[0]);
        }
      }
    },
    [hash]
  );

  useEffect(() => {
    window.addEventListener('hashchange', hashChangeHandler);

    return function cleanup() {
      window.removeEventListener('hashchange', hashChangeHandler);
    };
  }, [hashChangeHandler]);

  return [hash, updateHash];
}

export default useHash;

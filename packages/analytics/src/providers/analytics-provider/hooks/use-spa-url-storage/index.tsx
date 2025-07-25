import { clearUrlStorage, storeCurrentUrl } from '../../../../helpers';
import { useEffect } from 'react';

type UseSpaUrlStorageParams = {
  enabled?: boolean;
};

/**
 * Keeps track of the current and previous URLs in localStorage for SPAs.
 */
function useSpaUrlStorage({ enabled = false }: UseSpaUrlStorageParams) {
  const url = window.location.href;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    storeCurrentUrl(url);

    return clearUrlStorage;
  }, [enabled, url]);
}

export default useSpaUrlStorage;

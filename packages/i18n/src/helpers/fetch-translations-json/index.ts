import type { createStore } from 'jotai';

import * as atoms from '../../state/atoms';

interface FetchTranslationsJSONParams {
  staticTranslationsURL: string;
  store: ReturnType<typeof createStore>;
}

function fetchTranslationsJSON({ staticTranslationsURL, store }: FetchTranslationsJSONParams) {
  // Retrieve data from memoized request if available
  const idempotentRequest = store.get(atoms.staticTranslationJSONRequest);

  if (idempotentRequest) {
    return idempotentRequest;
  }

  // Fetch translations JSON and memoize request in store for next calls
  const request = fetch(staticTranslationsURL).then(async (response) => {
    if (!response.ok) {
      return { response, json: null };
    }

    return {
      response,
      json: await response.json(),
    };
  });

  store.set(atoms.staticTranslationJSONRequest, request);

  return request;
}
export default fetchTranslationsJSON;

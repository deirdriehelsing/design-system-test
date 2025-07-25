import type { ClientAdapter, CustomClientRequestOptions } from '../../types';

import { AxiosClient } from '../../clients';

const deprecationMessage =
  'Calling `makeRequest` directly is deprecated. Please use `client.makeRequest` instead. Check @blueshift-ui/fetch README.md for more information';

// This helper is here for convenience of migration, but it's unadvised to use it
// Please refer to the README for more information
function makeRequest<TInstance = any, TCustomClientFetchOptions = any>(
  options: CustomClientRequestOptions<TCustomClientFetchOptions>,
  client?: ClientAdapter<TInstance, TCustomClientFetchOptions>
) {
  console.warn(deprecationMessage);
  const clientOrDefaultClient = client ?? (new AxiosClient(options) as ClientAdapter);

  return clientOrDefaultClient.makeRequest(options);
}

export { deprecationMessage };

export default makeRequest;

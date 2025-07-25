import type { JsonApiClientOptions, JsonApiOptions } from '../../types';

import BaseClient from '../base';

abstract class JsonApiClient<
  TInstance = any,
  TCustomClientMakeRequestOptions extends JsonApiClientOptions = JsonApiClientOptions,
> extends BaseClient<TInstance, TCustomClientMakeRequestOptions> {
  // Accepts two types of options:
  // 1. options - For instantiating the derived client with `new Client(options)`
  // 2. derivedClientDefaultOptions - For derived clients to provide default options at definition time
  constructor(
    options?: TCustomClientMakeRequestOptions,
    derivedClientDefaultOptions?: TCustomClientMakeRequestOptions
  ) {
    super(options, derivedClientDefaultOptions);

    if (this.defaultOptions.isJsonApi) {
      this.instance = this.addJsonApiInterceptors(
        this.instance,
        this.defaultOptions.jsonApiOptions
      );
    }
  }

  protected abstract addJsonApiInterceptors(
    instance: TInstance,
    jsonApiOptions: JsonApiOptions
  ): TInstance;
}

export default JsonApiClient;

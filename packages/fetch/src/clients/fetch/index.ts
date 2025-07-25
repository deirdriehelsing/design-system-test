import type {
  BaseResponse,
  CustomClientRequestOptions,
  FetchClientOptions,
  JsonApiOptions,
  MakeRequestResponse,
} from '../../types';

import JsonApiClient from '../json-api';
import Jsona from 'jsona';

type Options = CustomClientRequestOptions<FetchClientOptions>;

const DEFAULT_OPTIONS: Options = {
  credentials: 'include',
};

class FetchClient extends JsonApiClient<typeof fetch, FetchClientOptions> {
  constructor(options: Options = {}) {
    super(options, DEFAULT_OPTIONS);
  }

  public makeRequest<TResponse = any>(options: Options) {
    return this.baseMakeRequest<Omit<Response, 'headers'>, TResponse>(
      options,
      async (parsedOptions) => {
        return await this.instance(parsedOptions.url ?? '/', parsedOptions);
      }
    );
  }

  protected addJsonApiInterceptors(instance: typeof fetch, jsonApiOptions: JsonApiOptions) {
    const dataFormatter = new Jsona(jsonApiOptions);

    const interceptedInstance: typeof fetch = async (input, init) => {
      // Intercept requests
      const requestHeaders = new Headers(init?.headers);
      const requestContentType =
        requestHeaders.get('Content-Type') ?? requestHeaders.get('content-type');
      const isJsonApiRequest = requestContentType === 'application/vnd.api+json';

      if (isJsonApiRequest && init?.body) {
        // Get the body from the request in JSON format
        const body = typeof init.body === 'string' ? JSON.parse(init.body) : init.body;

        // Replace the body with the serialized JSON:API version
        init.body = JSON.stringify(dataFormatter.serialize(body));
      }

      // Make Request
      const response = await instance(input, init);

      // Intercept responses
      const responseHeaders = new Headers(response.headers);
      const responseContentType =
        responseHeaders.get('Content-Type') ?? responseHeaders.get('content-type');
      const isJsonApiResponse = responseContentType === 'application/vnd.api+json';

      if (isJsonApiResponse) {
        // Intercept response JSON parser

        const parseJson = response.json;

        response.json = async () => {
          const json = await parseJson();
          return dataFormatter.deserialize(json);
        };
      }

      return response;
    };

    return interceptedInstance;
  }

  protected createInstance() {
    // The global scope object is different depending on the environment
    // e.g. "window" in the browser, "global" in Node.js
    const globalScopeObject = typeof window !== 'undefined' ? window : global;

    return globalScopeObject.fetch.bind(globalScopeObject);
  }

  protected handleSuccess<
    TResponse = any,
    TOptions extends FetchClientOptions = FetchClientOptions,
  >(
    response: TResponse & BaseResponse,
    parsedOptions?: Partial<CustomClientRequestOptions<TOptions>>
  ) {
    const superResponse = super.handleSuccess(response, parsedOptions);
    const responseParser = parsedOptions?.parseResponse ?? this.parseJsonResponse;

    return responseParser<TResponse>(superResponse as Response);
  }

  private async parseJsonResponse<TResponse = any>(
    response: Response
  ): Promise<MakeRequestResponse<TResponse>> {
    const data: MakeRequestResponse<TResponse> = await response
      .json()
      .catch(() => ({ success: true })); // Assume empty response body

    return data;
  }
}

export default FetchClient;

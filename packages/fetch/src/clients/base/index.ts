import type {
  BaseClientRequestOptions,
  ClientAdapter,
  CustomClientRequestOptions,
  MakeRequestResponse,
} from '../../types';

import Cookie from 'js-cookie';
import logHandledError from '@blueshift-ui/telemetry/dist/helpers/log-handled-error';
import merge from 'lodash/merge';

const DEFAULT_OPTIONS: BaseClientRequestOptions = {
  attempts: 3,
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
};

abstract class BaseClient<TInstance, TCustomClientMakeRequestOptions>
  implements ClientAdapter<TInstance, TCustomClientMakeRequestOptions>
{
  public defaultOptions: CustomClientRequestOptions<TCustomClientMakeRequestOptions>;
  public instance: TInstance;

  // Accepts two types of options:
  // 1. options - For instantiating the derived client with `new Client(options)`
  // 2. derivedClientDefaultOptions - For derived clients to provide default options at definition time
  constructor(
    options?: CustomClientRequestOptions<TCustomClientMakeRequestOptions>,
    derivedClientDefaultOptions?: Partial<
      CustomClientRequestOptions<TCustomClientMakeRequestOptions>
    >
  ) {
    this.defaultOptions = merge({}, DEFAULT_OPTIONS, derivedClientDefaultOptions, options);
    this.instance = this.createInstance(this.defaultOptions);
  }

  public get authToken() {
    return Cookie.get('vt_authentication_token');
  }

  // Wrapper for makeRequest that adds a base implementation for inherited classes
  protected async baseMakeRequest<
    TWrappedResponse = any,
    TResponse = TWrappedResponse,
    // Variables generic is used on GraphQL client
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _TVariables = Record<string, unknown>,
  >(
    options: CustomClientRequestOptions<TCustomClientMakeRequestOptions>,
    wrappedMakeRequest: (
      options: CustomClientRequestOptions<TCustomClientMakeRequestOptions>
    ) => Promise<MakeRequestResponse<TWrappedResponse>>,
    currentAttempt = 1
  ): Promise<MakeRequestResponse<TResponse> | never> {
    // Needs `let` to be assigned in the `try` block and used in the `catch` block
    let response: MakeRequestResponse<TWrappedResponse> = {};
    const parsedOptions = this.parseOptions(options);

    try {
      response = await wrappedMakeRequest(parsedOptions);
      return this.handleSuccess(response, parsedOptions);
    } catch (error) {
      const isEligibleForRetry =
        response?.status === 403 || (response?.status === 502 && parsedOptions.method === 'GET');
      const hasRemainingAttempts = Boolean(
        parsedOptions.attempts && currentAttempt < parsedOptions.attempts
      );
      const shouldRetry = isEligibleForRetry && hasRemainingAttempts;

      if (shouldRetry) {
        return this.baseMakeRequest(options, wrappedMakeRequest, currentAttempt + 1);
      }

      return this.handleError(error);
    }
  }

  protected handleError<TError = unknown>(error: TError): never {
    logHandledError(error instanceof Error ? error.message : String(error));

    throw error;
  }

  protected handleSuccess<
    TResponse = any,
    TOptions extends TCustomClientMakeRequestOptions = TCustomClientMakeRequestOptions,
  >(
    response: MakeRequestResponse<TResponse>,
    _parsedOptions: Partial<CustomClientRequestOptions<TOptions>> = {}
  ) {
    // Needs comparison with `false`, otherwise `undefined` results in a false positive
    if (response.ok === false) {
      const status = response.status ?? '?';
      const statusText = response.statusText ?? '?';
      const message = `RESPONSE_NOT_OK - Status: ${status}, Status Text: ${statusText}`;

      throw new Error(message);
    }

    if (response.status === 204) {
      // We shouldn't expect a response body for this status
      // See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
      return {};
    }

    if (response.error) {
      const message = `RESPONSE_ERROR - Success response, but data indicated an error: ${response.error}`;

      throw new Error(message);
    }

    return response;
  }

  protected parseBody(body: any) {
    if (!body || body instanceof FormData || typeof body === 'string') {
      return body;
    }

    return JSON.stringify(body);
  }

  protected parseHeaders(headers?: Record<string, string>, omitAuthToken = false) {
    const authToken = this.authToken;
    const shouldAddAuthToken = !omitAuthToken && authToken;

    return {
      // Note: this is for fallback purposes only, and should be removed once the authentication
      // cookie is universally HttpOnly and secure
      ...(shouldAddAuthToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    };
  }

  protected parseOptions<
    TOptions extends TCustomClientMakeRequestOptions = TCustomClientMakeRequestOptions,
  >(
    partialOptions: Partial<CustomClientRequestOptions<TOptions>> = {}
  ): CustomClientRequestOptions<TOptions> {
    // Merges the default options given to the client with additional options (e.g. passed to the request)
    const options = merge(
      {},
      this.defaultOptions,
      partialOptions
      // Needs casting: TS didn't understand that merging a non-partial with a partial results in a non-partial
    ) as CustomClientRequestOptions<TOptions>;

    const { body, headers, omitAuthToken, params, url } = options;

    const parsedOptions = {
      ...options,
      body: this.parseBody(body),
      headers: this.parseHeaders(headers, omitAuthToken),
      method: options.method?.toUpperCase() ?? 'GET',
      url: this.parseUrl(url ?? '', params),
    };

    return parsedOptions;
  }

  protected parseUrl(path: string, params: Record<string, any> | URLSearchParams = {}) {
    const encodedParams = Object.entries(params)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((v) => `${key}[]=${encodeURIComponent(v)}`).join('&');
        }

        return `${key}=${encodeURIComponent(value)}`;
      })
      .join('&');

    if (!encodedParams) {
      return path;
    }

    return `${path}?${encodedParams}`;
  }

  // Variables generic is used on GraphQL clients
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public abstract makeRequest<TResponse = any, _TVariables = Record<string, unknown>>(
    options: CustomClientRequestOptions<TCustomClientMakeRequestOptions>
  ): Promise<MakeRequestResponse<TResponse>>;

  protected abstract createInstance(
    options?: CustomClientRequestOptions<TCustomClientMakeRequestOptions>
  ): TInstance;
}

export default BaseClient;

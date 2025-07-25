import type {
  AxiosClientOptions,
  AxiosInstance,
  AxiosResponse,
  CustomClientRequestOptions,
  JsonApiOptions,
  MakeRequestResponse,
} from '../../types';

import JsonApiClient from '../json-api';
import Jsona from 'jsona';
import axios from 'axios';

type Options = CustomClientRequestOptions<AxiosClientOptions>;

const DEFAULT_OPTIONS: Options = {
  // Note: This will not take the `omitAuthToken` option into account. A future iteration may want
  // to reconcile the two options.
  withCredentials: true,
};

export class AxiosClient extends JsonApiClient<AxiosInstance, AxiosClientOptions> {
  constructor(options: Options = {}) {
    super(options, DEFAULT_OPTIONS);
  }

  addJsonApiInterceptors(instance: AxiosInstance, jsonApiOptions: JsonApiOptions) {
    const dataFormatter = new Jsona(jsonApiOptions);

    // Intercept requests
    instance.interceptors.request.use((config) => {
      const contentType = config.headers?.['Content-Type'] ?? config.headers?.['content-type'];
      const isJsonApiRequest = contentType?.includes('application/vnd.api+json');

      if (isJsonApiRequest) {
        config.data = dataFormatter.serialize(config.data);
      }

      return config;
    });

    // Intercept responses
    instance.interceptors.response.use((response) => {
      const contentType = response.headers?.['Content-Type'] ?? response.headers?.['content-type'];
      const isJsonApiResponse = contentType?.includes('application/vnd.api+json');

      if (isJsonApiResponse) {
        response.data = dataFormatter.deserialize(response.data);
      }

      return response;
    });

    return instance;
  }

  public makeRequest<TResponse = any>(options: Options) {
    return this.baseMakeRequest<Omit<AxiosResponse, 'headers'>, TResponse>(
      options,
      async (parsedOptions) => {
        const response = await this.instance<MakeRequestResponse<AxiosResponse<TResponse>>>({
          data: parsedOptions?.body, // Axios uses the field "data" instead of "body"
          ...parsedOptions,
        });

        return {
          ...response,
          headers:
            response.headers instanceof Headers
              ? response.headers
              : new Headers(response.headers as Record<string, string>), // This cast is needed to make it conform with our response types)
        };
      }
    );
  }

  protected createInstance(options: CustomClientRequestOptions<AxiosClientOptions>) {
    return axios.create(options);
  }

  protected handleSuccess(response: MakeRequestResponse<Omit<AxiosResponse, 'headers'>>) {
    const superResponse = super.handleSuccess(response);

    return response.data ?? superResponse;
  }

  protected parseUrl(path: string): string {
    // Params are handled internally by the axios instance.
    // Adding them to the URL here will cause them to be duplicated.
    // For this reason, we should simply return the path as-is.
    return path;
  }
}

export default AxiosClient;

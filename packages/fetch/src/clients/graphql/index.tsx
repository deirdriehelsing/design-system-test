import type {
  CustomClientRequestOptions,
  GraphQLClientOptions,
  GraphQLClientResponse,
  GraphQLRequestOptions,
  GraphQLVariables,
  MakeRequestResponse,
} from '../../types';

import BaseClient from '../base';
import { GraphQLClient as GraphQLRequestClient } from 'graphql-request';

type RequestOptions<TVariables extends GraphQLVariables = GraphQLVariables> = Omit<
  CustomClientRequestOptions<GraphQLRequestOptions<TVariables>>,
  'query' | 'requestHeaders'
>;

const DEFAULT_OPTIONS: Partial<GraphQLClientOptions> = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'POST',
};

class GraphQLClient extends BaseClient<GraphQLRequestClient, GraphQLClientOptions> {
  constructor(options: GraphQLClientOptions) {
    super(options, DEFAULT_OPTIONS);
  }

  public makeRequest<TResponse = any, TVariables extends GraphQLVariables = GraphQLVariables>(
    // Generics make this look more complicated than it is.
    // All this is doing is merging graphql-request options with our own, but removing the redundant ones.
    options: RequestOptions<TVariables>
  ) {
    return this.baseMakeRequest<Omit<GraphQLClientResponse<TResponse>, 'headers'>, TResponse>(
      options,
      async (parsedOptions) => {
        const { body = '', headers, ...requestOptions } = parsedOptions;

        return await this.instance.rawRequest<GraphQLClientResponse<TResponse>>({
          query: body, // graphql-request uses "query" instead of "body"
          variables: options.variables,
          ...(headers ? { requestHeaders: headers } : {}), // graphql-request uses "requestHeaders" instead of "headers"
          ...requestOptions,
        });
      }
    );
  }

  protected createInstance(options: GraphQLClientOptions) {
    const { url, ...requestOptions } = options;

    return new GraphQLRequestClient(url, requestOptions);
  }

  protected handleSuccess(response: MakeRequestResponse<any>) {
    const superResponse = super.handleSuccess(response);

    return response.data ?? superResponse;
  }
}

export default GraphQLClient;

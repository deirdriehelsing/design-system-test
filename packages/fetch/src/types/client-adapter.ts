import type { CustomClientRequestOptions, MakeRequestResponse } from '.';

interface ClientAdapter<TInstance = any, TCustomClientMakeRequestOptions = any> {
  instance: TInstance;

  // Variables generic is user on GraphQL clients
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  makeRequest<TResponse = any, _TVariables = Record<string, unknown>>(
    options: CustomClientRequestOptions<TCustomClientMakeRequestOptions>
  ): Promise<MakeRequestResponse<TResponse>>;
}

export type { ClientAdapter };

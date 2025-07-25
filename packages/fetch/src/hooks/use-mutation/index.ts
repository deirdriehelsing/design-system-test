import type { BaseResponse, ClientAdapter, UseMutationOptions } from '../../types';

import { useQueryClient, useMutation as useReactQueryMutation } from '@tanstack/react-query';
import parseRequestKey from '../../helpers/parse-request-key';

function useMutation<TVariables = unknown, TResponse = unknown>({
  mutationFn,
  mutationKey,
  mutationOptions,
  request,
}: UseMutationOptions<TVariables, TResponse>) {
  const queryClient = useQueryClient();

  function defaultMutationFn<TVariables, TResponse>(
    variables: TVariables
  ): Promise<TResponse | never> {
    const client: ClientAdapter | undefined =
      mutationOptions?.meta?.client ?? queryClient.getDefaultOptions().mutations?.meta?.client;

    if (!client) {
      throw new Error('No client found in options. Did you pass a client to the context provider?');
    }

    const response = client.makeRequest<TResponse, TVariables>({
      method: 'POST', // Add default method. Should be before spread to avoid overriding "request.method"
      ...request,
      ...(variables && !request.body ? { body: variables } : {}),
      variables,
      attempts: 1, // Override "attempts" to avoid possibility of making multiple mutations. This should be after "...request" to always override "request.attempts"
    });

    // TODO: Remove type assertion when makeRequest doesn't enforce partial types
    return response as Promise<TResponse & BaseResponse>;
  }

  const {
    // We're omitting "mutate" in favour of the promise-based "mutateAsync"
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutate: _omit,
    mutateAsync: makeMutation,
    ...rest
  } = useReactQueryMutation<TResponse, unknown, TVariables>(
    parseRequestKey({ key: mutationKey, request }),
    mutationFn ?? defaultMutationFn,
    mutationOptions
  );

  return {
    makeMutation,
    ...rest,
  };
}

export default useMutation;

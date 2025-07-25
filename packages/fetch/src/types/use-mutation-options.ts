import type { CustomClientRequestOptions } from '.';
import type { UseMutationOptions as UseReactQueryMutationOptions } from '@tanstack/react-query';

// React Query types for options are extremely convoluted
// These are simply wrappers to make it easier to type the options
type UseMutationOptions<TVariables, TResponse> = {
  mutationFn?: (variables: TVariables) => Promise<TResponse>;
  mutationKey?: unknown | unknown[];
  mutationOptions?: Omit<
    UseReactQueryMutationOptions<TResponse, unknown, TVariables>,
    'mutationFn'
  >;
  request: CustomClientRequestOptions<{ body: TVariables }>;
};

export type { UseMutationOptions };

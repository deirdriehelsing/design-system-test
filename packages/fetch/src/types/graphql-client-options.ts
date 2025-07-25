import type { GraphQLRequestConfig } from '.';

// Retype incompatible options
interface GraphQLClientOptions extends Omit<GraphQLRequestConfig, 'headers'> {
  headers?: Record<string, string>;
  url: string;
}

export type { GraphQLClientOptions };

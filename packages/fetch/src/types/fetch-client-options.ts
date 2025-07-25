import type { JsonApiClientOptions } from '.';

interface FetchClientOptions extends JsonApiClientOptions, RequestInit {
  parseResponse?: <TResponse = any>(response: Response) => Promise<TResponse>;
}

export type { FetchClientOptions };

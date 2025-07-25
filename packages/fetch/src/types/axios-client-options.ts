import type { AxiosRequestConfig, JsonApiClientOptions } from '.';

interface AxiosClientOptions extends JsonApiClientOptions, AxiosRequestConfig {}

export type { AxiosClientOptions };

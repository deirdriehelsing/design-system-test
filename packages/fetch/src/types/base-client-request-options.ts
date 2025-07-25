interface BaseClientRequestOptions {
  attempts?: number;
  body?: any;
  headers?: Record<string, string>;
  method?: string;
  omitAuthToken?: boolean;
  params?: Record<string, any>;
  url?: string;
}

export type { BaseClientRequestOptions };

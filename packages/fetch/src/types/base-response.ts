interface BaseResponse {
  data?: any;
  error?: string;
  headers?: Headers;
  ok?: boolean;
  status?: number;
  statusText?: string;
  success?: boolean;
}

export type { BaseResponse };

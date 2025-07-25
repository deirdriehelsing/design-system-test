import type { BaseResponse } from '.';

// Always assume partial responses to avoid "Cannot read properties of undefined" errors
type MakeRequestResponse<TResponse> = Partial<TResponse & BaseResponse>;

export type { MakeRequestResponse };

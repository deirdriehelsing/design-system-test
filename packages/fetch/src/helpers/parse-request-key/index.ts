import type { ParseRequestKeyOptions } from '../../types';

function parseRequestKey<TRequestOptions>({
  key,
  loadInBackground,
  request,
}: ParseRequestKeyOptions<TRequestOptions> = {}): unknown[] {
  return [
    ...(Array.isArray(key) ? key : [key ?? request?.url ?? Math.random().toString(36).slice(2, 7)]), // We should never get to the random string, but it's here just in case
    ...(loadInBackground ? ['in-background'] : []),
  ];
}

export default parseRequestKey;

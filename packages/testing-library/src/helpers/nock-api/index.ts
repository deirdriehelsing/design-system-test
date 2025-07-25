import type { Options } from 'nock';

import nock from 'nock';

if (!global.fetch) {
  // this is needed to make nock work with fetch
  global.fetch = require('node-fetch');
}

/**
 * Standard headers for our API that should be returned with every nock reply in order to avoid CORS or encoding issues.
 */
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json',
};

/**
 * Uses nock to mock our API, defaulting the hostname to our API host and setting up default reply headers.
 */
const nockApi = (
  /** The host that jest is expecting your APIs to be calling. */
  host = process.env.NOCK_API_HOST ?? 'http://api.example.com',
  options?: Options
) => nock(host, options).defaultReplyHeaders(headers);

export default nockApi;
export { headers };

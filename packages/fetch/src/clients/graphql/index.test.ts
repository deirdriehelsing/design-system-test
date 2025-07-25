import { GraphQLClient as GraphQLRequestClient, gql } from 'graphql-request';
import BaseClient from '../base';
import GraphQLClient from '.';
import fetchMock from 'fetch-mock-jest';

jest.mock('@blueshift-ui/telemetry/dist/helpers/log-handled-error');

describe('GraphQLClient', () => {
  beforeEach(() => {
    fetchMock.mockClear();
    fetchMock.once(
      'https://0.0.0.0/mock',
      { body: { data: { mock: true, ok: true } }, status: 200 },
      { overwriteRoutes: true }
    );
  });

  it('is a class', () => {
    const client = new GraphQLClient({ url: '/mock' });

    expect(client).toBeInstanceOf(GraphQLClient);
  });

  it('extends BaseClient', () => {
    const client = new GraphQLClient({ url: '/mock' });

    expect(client).toBeInstanceOf(BaseClient);
  });

  it('exposes the underlying instance', () => {
    const client = new GraphQLClient({ url: '/mock' });

    expect(client.instance).toBeInstanceOf(GraphQLRequestClient);
  });

  it('calls instance for fetching', () => {
    const client = new GraphQLClient({
      fetch: global.fetch, // Ask it to use our mocked fetch
      headers: { 'Content-Type': 'application/json' },
      url: 'https://0.0.0.0/mock',
    });
    const requestSpy = jest.spyOn(client.instance, 'rawRequest');
    requestSpy.mockResolvedValueOnce({ data: 'mock', status: 200, headers: new Headers() });

    const body = gql`
      {
        mock
      }
    `;

    const data = client.makeRequest({ body });

    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith(expect.objectContaining({ query: body }));
    expect(data).resolves.toEqual('mock');
  });

  it('applies default options', () => {
    const client = new GraphQLClient({
      fetch: global.fetch, // Ask it to use our mocked fetch
      headers: { 'Content-Type': 'application/json' },
      url: 'https://0.0.0.0/mock',
    });

    client.makeRequest({
      body: gql`
        {
          mock
        }
      `,
    });

    expect(fetchMock).toHaveFetchedTimes(1);
    expect(fetchMock).toHaveFetched(
      'https://0.0.0.0/mock',
      expect.objectContaining({
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
  });
});

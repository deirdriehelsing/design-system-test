import BaseClient from '../base';
import FetchClient from '.';
import JsonApiClient from '../json-api';
import fetchMock from 'fetch-mock-jest';

jest.mock(
  'jsona',
  () =>
    class {
      deserialize = () => ({ isDeserialized: true, ok: true });
      serialize = () => ({ isSerialized: true, ok: true });
    }
);

// Mock fetch calls
Object.assign(global, { fetch: fetchMock });

jest.mock('@blueshift-ui/telemetry/dist/helpers/log-handled-error');

describe('FetchClient', () => {
  beforeEach(() => {
    fetchMock.mockClear();

    fetchMock.once(
      '/mock',
      { body: { mock: true, ok: true }, status: 200 },
      { overwriteRoutes: true }
    );
  });

  it('is a class', () => {
    const client = new FetchClient();

    expect(client).toBeInstanceOf(FetchClient);
  });

  it('extends BaseClient', () => {
    const client = new FetchClient();

    expect(client).toBeInstanceOf(BaseClient);
  });

  it('extends JsonApiClient', () => {
    const client = new FetchClient();

    expect(client).toBeInstanceOf(JsonApiClient);
  });

  it('exposes the underlying instance', () => {
    const client = new FetchClient();

    expect(client.instance).toBeTruthy(); // Can't check if it equals `global.fetch` because of a `bind` call
  });

  it('calls instance for fetching', () => {
    const client = new FetchClient();
    const spy = jest.spyOn(client, 'instance');
    const data = client.makeRequest({ url: '/mock' });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('/mock', expect.objectContaining({ url: '/mock' }));
    expect(data).resolves.toEqual(expect.objectContaining({ mock: true }));
  });

  it('applies default options', () => {
    const client = new FetchClient({ headers: { 'Content-Type': 'application/json' } });

    client.makeRequest({ url: '/mock' });

    expect(fetchMock).toHaveFetchedTimes(1);
    expect(fetchMock).toHaveFetched(
      '/mock',
      expect.objectContaining({
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
  });

  describe('JSON:API support', () => {
    beforeEach(() => {
      fetchMock.mockClear();
    });

    it('serializes JSON:API requests', () => {
      const client = new FetchClient({ isJsonApi: true });

      client.makeRequest({
        url: '/mock',
        body: { isSerialized: false, ok: true },
        headers: { 'Content-Type': 'application/vnd.api+json' },
      });

      expect(fetchMock).toHaveFetchedTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(
        '/mock',
        expect.objectContaining({
          body: JSON.stringify({ isSerialized: true, ok: true }),
        })
      );
    });

    it('deserializes JSON:API responses', () => {
      const client = new FetchClient({ isJsonApi: true });

      fetchMock.once(
        '/mock',
        {
          body: { isDeserialized: false, ok: true },
          headers: { 'Content-Type': 'application/vnd.api+json' },
          status: 200,
        },
        { overwriteRoutes: true }
      );

      client.makeRequest({
        url: '/mock',
        body: { mock: true },
        headers: { 'Content-Type': 'application/vnd.api+json' },
      });

      expect(fetchMock).toHaveFetchedTimes(1);
      expect(fetchMock).toHaveFetched(
        '/mock',
        expect.objectContaining({
          body: JSON.stringify({ isDeserialized: true }),
        })
      );
    });
  });
});

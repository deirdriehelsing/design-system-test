import BaseClient from '.';
import { expectToThrow } from 'helpers/expect-to-throw';
import fetchMock from 'fetch-mock-jest';

jest.mock('js-cookie', () => ({
  get(cookie: string) {
    return cookie;
  },
}));

// Mock fetch calls
Object.assign(global, { fetch: fetchMock });

jest.mock('@blueshift-ui/telemetry/dist/helpers/log-handled-error');

// BaseClient is an abstract class and needs another class to extend it
class MockClient extends BaseClient<any, any> {
  createInstance() {
    return global.fetch;
  }

  public makeRequest(options: any): Promise<any> {
    return this.baseMakeRequest(options, ({ url = '', ...parsedOptions }) => {
      return this.instance(url, parsedOptions);
    });
  }
}

describe('BaseClient', () => {
  beforeAll(() => {
    fetchMock.get('*', { body: { mock: true, ok: true }, status: 200 }, { overwriteRoutes: true });
  });

  beforeEach(() => {
    fetchMock.mockClear();
  });

  it('is an abstract class', () => {
    expectToThrow(() => {
      // We need to disable this safety check to test the abstract class
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const client = new BaseClient();
      client.makeRequest('/mock');
    });
  });

  it('retrieves auth token', () => {
    const client = new MockClient();

    expect(client.authToken).toBe('vt_authentication_token');
  });

  it('sets default options', () => {
    const client = new MockClient({ url: 'mock' });

    expect(client.defaultOptions).toEqual(expect.objectContaining({ url: 'mock' }));
  });

  it('formats params', () => {
    const client = new MockClient();

    client.makeRequest({
      url: '/mock',
      params: {
        key1: 'mock-value',
        key2: ['mock-value1', 'mock-value2', 'mock/value'],
        key3: false,
        key4: 7,
      },
    });

    const formattedUrl =
      '/mock?key1=mock-value&key2[]=mock-value1&key2[]=mock-value2&key2[]=mock%2Fvalue&key3=false&key4=7';

    expect(fetchMock).toHaveFetchedTimes(1);
    expect(fetchMock).toHaveLastFetched(formattedUrl);
  });

  describe('auth', () => {
    beforeAll(() => {
      fetchMock.get(
        '/mock',
        { body: { mock: true, ok: true }, status: 200 },
        { overwriteRoutes: true }
      );
    });

    beforeEach(() => {
      fetchMock.mockClear();
    });

    it('adds auth token', () => {
      const client = new MockClient();

      client.makeRequest({ url: '/mock' });

      expect(fetchMock.lastOptions()?.headers?.['Authorization']).toBe(
        'Bearer vt_authentication_token'
      );
    });

    it('omits auth token', () => {
      const client = new MockClient();

      client.makeRequest({ url: '/mock', omitAuthToken: true });

      expect(fetchMock.lastOptions()?.headers?.['Authorization']).toBe(undefined);
    });
  });

  describe('200 response', () => {
    beforeAll(() => {
      fetchMock.get(
        '*',
        { body: { mock: true, ok: true }, status: 200 },
        { overwriteRoutes: true }
      );
    });

    beforeEach(() => {
      fetchMock.mockClear();
    });

    it('returns expected result', () => {
      const client = new MockClient();

      const result = client.makeRequest('/mock').then((response) => response.json());

      expect(result).resolves.toEqual(expect.objectContaining({ mock: true }));
    });
  });

  describe('204 response', () => {
    beforeAll(() => {
      fetchMock.get(
        '*',
        { body: { mock: true, ok: true }, status: 204 },
        { overwriteRoutes: true }
      );
    });

    beforeEach(() => {
      fetchMock.mockClear();
    });

    it('handles empty response', () => {
      const client = new MockClient();

      const result = client.makeRequest('/mock');

      expect(result).resolves.toStrictEqual({});
    });
  });

  describe('403 response', () => {
    beforeAll(() => {
      fetchMock.get(
        '*',
        { body: { mock: true, ok: false }, status: 403 },
        { overwriteRoutes: true }
      );
    });

    beforeEach(() => {
      fetchMock.mockClear();
    });

    it('catches unexpected response', () => {
      const client = new MockClient();

      expect(client.makeRequest('/mock')).rejects.toEqual(
        new Error('RESPONSE_NOT_OK - Status: 403, Status Text: Forbidden')
      );
    });

    it('retries request up to three times', async () => {
      const client = new MockClient();

      // Casting is needed to spy on private/protected methods
      const baseMakeRequestSpy = jest.spyOn(client as any, 'baseMakeRequest');

      await client.makeRequest('/mock').catch(() => {}); // Will throw an error, but we're not interested in it

      expect(baseMakeRequestSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('422 response', () => {
    beforeAll(() => {
      fetchMock.get(
        '*',
        { body: { mock: true, ok: false }, status: 422 },
        { overwriteRoutes: true }
      );
    });

    beforeEach(() => {
      fetchMock.mockClear();
    });

    it('catches unexpected response', () => {
      const client = new MockClient();

      expect(client.makeRequest('/mock')).rejects.toEqual(
        new Error('RESPONSE_NOT_OK - Status: 422, Status Text: Unprocessable Entity')
      );
    });
  });

  describe('500 response', () => {
    beforeAll(() => {
      fetchMock.get(
        '*',
        { body: { mock: true, ok: false }, status: 500 },
        { overwriteRoutes: true }
      );
    });

    beforeEach(() => {
      fetchMock.mockClear();
    });

    it('catches unexpected response', () => {
      const client = new MockClient();

      expect(client.makeRequest('/mock')).rejects.toEqual(
        new Error('RESPONSE_NOT_OK - Status: 500, Status Text: Internal Server Error')
      );
    });
  });
});

import AxiosClient from '.';
import BaseClient from '../base';
import JsonApiClient from '../json-api';
import axios from 'axios';

jest.mock(
  'jsona',
  () =>
    class {
      deserialize = () => ({ isDeserialized: true });
      serialize = () => ({ isSerialized: true });
    }
);

jest.mock('@blueshift-ui/telemetry/dist/helpers/log-handled-error');

describe('AxiosClient', () => {
  it('is a class', () => {
    const client = new AxiosClient();

    expect(client).toBeInstanceOf(AxiosClient);
  });

  it('extends BaseClient', () => {
    const client = new AxiosClient();

    expect(client).toBeInstanceOf(BaseClient);
  });

  it('extends JsonApiClient', () => {
    const client = new AxiosClient();

    expect(client).toBeInstanceOf(JsonApiClient);
  });

  it('exposes the underlying instance', () => {
    const client = new AxiosClient();

    // instanceof Axios won't work because axios wraps the instance
    expect(client.instance).toBeInstanceOf(Function);
  });

  it('calls instance for fetching', () => {
    const mockInstance = jest.fn();
    const createSpy = jest.spyOn<any, any>(axios, 'create');
    createSpy.mockReturnValueOnce(mockInstance);
    mockInstance.mockReturnValueOnce({ data: { mock: true, ok: true } });

    const client = new AxiosClient();
    const data = client.makeRequest({ url: '/mock' });

    expect(mockInstance).toHaveBeenCalledTimes(1);
    expect(mockInstance).toHaveBeenCalledWith(expect.objectContaining({ url: '/mock' }));
    expect(data).resolves.toEqual(expect.objectContaining({ mock: true }));
  });

  it('applies default options', () => {
    const client = new AxiosClient({ baseURL: '/mock' });

    expect(client.instance.defaults.baseURL).toBe('/mock');
    expect(client.instance.defaults.withCredentials).toBe(true);
  });

  it('allows default option overrides', () => {
    const client = new AxiosClient({ baseURL: '/mock', withCredentials: false });

    expect(client.instance.defaults.baseURL).toBe('/mock');
    expect(client.instance.defaults.withCredentials).toBe(false);
  });

  it('lets axios handle query parameters', () => {
    const mockInstance = jest.fn();
    const createSpy = jest.spyOn<any, any>(axios, 'create');
    createSpy.mockReturnValueOnce(mockInstance);
    mockInstance.mockReturnValueOnce({ data: { mock: true, ok: true } });

    const client = new AxiosClient();
    client.makeRequest({ url: '/mock', params: { mock: true } });

    expect(mockInstance).toHaveBeenCalledTimes(1);
    expect(mockInstance).toHaveBeenCalledWith(
      expect.objectContaining({
        params: { mock: true },
        url: '/mock',
      })
    );
  });

  describe('JSON:API support', () => {
    it('serializes JSON:API requests', async () => {
      const client = new AxiosClient({ isJsonApi: true });

      const mockRequestConfig = {
        url: '/mock',
        method: 'get',
        headers: {
          'Content-Type': 'application/vnd.api+json',
        },
        data: {
          isSerialized: false,
        },
      };

      const modifiedRequestConfig =
        // Cast to any is necessary because axios types are not up to date
        await (client.instance.interceptors.request as any).handlers[0].fulfilled(
          mockRequestConfig
        );

      expect(modifiedRequestConfig.data.isSerialized).toEqual(true);
    });

    it('deserializes JSON:API responses', async () => {
      const client = new AxiosClient({ isJsonApi: true });

      const mockResponse = {
        data: {
          isDeserialized: false,
        },
        headers: {
          'Content-Type': 'application/vnd.api+json',
        },
        status: 200,
        statusText: 'OK',
      };

      const modifiedRequestConfig =
        // Cast to any is necessary because axios types are not up to date
        await (client.instance.interceptors.response as any).handlers[0].fulfilled(mockResponse);

      expect(modifiedRequestConfig.data.isDeserialized).toEqual(true);
    });
  });
});

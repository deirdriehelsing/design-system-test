import AxiosClient from '../../clients/axios';
import { renderHook } from '@testing-library/react';
import useAxiosClient from '.';

describe('useAxiosClient()', () => {
  it('returns a new AxiosClient', () => {
    const { result } = renderHook(() => useAxiosClient());
    expect(result.current).toBeInstanceOf(AxiosClient);
    expect((result.current as AxiosClient).instance.defaults.method).toEqual('GET');
    expect((result.current as AxiosClient).instance.defaults.withCredentials).toBe(true);
  });

  it('can take options', () => {
    const { result } = renderHook(() =>
      useAxiosClient({ baseURL: 'mock-base-url', method: 'POST', withCredentials: false })
    );
    expect(result.current).toBeInstanceOf(AxiosClient);
    expect((result.current as AxiosClient).instance.defaults.baseURL).toEqual('mock-base-url');
    expect((result.current as AxiosClient).instance.defaults.method).toEqual('POST');
    expect((result.current as AxiosClient).instance.defaults.withCredentials).toBe(false);
  });
});

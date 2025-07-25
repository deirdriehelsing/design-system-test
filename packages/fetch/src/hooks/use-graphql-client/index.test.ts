import GraphqlClient from '../../clients/graphql';
import { renderHook } from '@testing-library/react';
import useGraphqlClient from '.';

describe('useGraphqlClient()', () => {
  it('returns a new GraphqlClient', () => {
    const { result } = renderHook(() => useGraphqlClient());
    expect(result.current).toBeInstanceOf(GraphqlClient);
  });

  it('can take options', () => {
    const { result } = renderHook(() => useGraphqlClient({ baseURL: 'mock-base-url' }));
    expect(result.current).toBeInstanceOf(GraphqlClient);
    expect((result.current as GraphqlClient).defaultOptions.url).toEqual('mock-base-url/graphql');
  });
});

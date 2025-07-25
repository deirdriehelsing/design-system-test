import { renderHook } from '@testing-library/react';
import useAxiosClient from '@blueshift-ui/fetch/dist/hooks/use-axios-client';
import useData from '@blueshift-ui/fetch/dist/hooks/use-data';
import useNspContent from '.';

const mockedUseData = useData as jest.Mock;

jest.mock('@blueshift-ui/fetch/dist/hooks/use-axios-client');
jest.mock('@blueshift-ui/fetch/dist/hooks/use-data');

const gql = String.raw;

const MOCK_QUERY = gql`
  query GetLayout($name: StringFilter) {
    layout(filter: { name: $name }) {
      name
    }
  }
`;

const MOCK_VARIABLES = {
  name: 'simple',
};

describe('useNspContent()', () => {
  beforeEach(() => {
    mockedUseData.mockImplementation(
      jest.fn(() => ({
        data: {
          layout: {
            name: MOCK_VARIABLES.name,
          },
        },
      }))
    );
  });

  it('calls useData for querying', () => {
    renderHook(() =>
      useNspContent({
        query: MOCK_QUERY,
        queryId: 'test-query-id',
      })
    );

    expect(mockedUseData).toHaveBeenCalledWith({
      queryKey: ['nsp-content', 'test-query-id', null],
      queryOptions: {
        meta: {
          client: useAxiosClient(),
        },
        select: expect.any(Function),
      },
      request: {
        body: {
          preview: false,
          queries: [
            {
              cacheKey: 'test-query-id',
              query: MOCK_QUERY,
            },
          ],
        },
        method: 'POST',
        url: '/v2/cms/content',
      },
    });
    expect(mockedUseData).toHaveBeenCalledTimes(1);
  });

  it('calls useData for querying with variables', () => {
    renderHook(() =>
      useNspContent({
        query: MOCK_QUERY,
        queryId: 'test-query-id',
        variables: MOCK_VARIABLES,
      })
    );

    expect(mockedUseData).toHaveBeenCalledWith({
      queryKey: ['nsp-content', 'test-query-id', JSON.stringify(MOCK_VARIABLES)],
      queryOptions: {
        meta: {
          client: useAxiosClient(),
        },
        select: expect.any(Function),
      },
      request: {
        body: {
          preview: false,
          queries: [
            {
              cacheKey: 'test-query-id',
              query: MOCK_QUERY,
              ...MOCK_VARIABLES,
            },
          ],
        },
        method: 'POST',
        url: '/v2/cms/content',
      },
    });
    expect(mockedUseData).toHaveBeenCalledTimes(1);
  });

  it('extracts data from the useData return', () => {
    renderHook(() =>
      useNspContent({
        query: MOCK_QUERY,
        queryId: 'test-query-id',
      })
    );

    expect(mockedUseData).toHaveBeenCalledWith({
      queryKey: ['nsp-content', 'test-query-id', null],
      queryOptions: {
        meta: {
          client: useAxiosClient(),
        },
        select: expect.any(Function),
      },
      request: {
        body: {
          preview: false,
          queries: [
            {
              cacheKey: 'test-query-id',
              query: MOCK_QUERY,
            },
          ],
        },
        method: 'POST',
        url: '/v2/cms/content',
      },
    });
    expect(mockedUseData).toHaveBeenCalledTimes(1);
    expect(mockedUseData).toReturnWith({ data: { layout: { name: MOCK_VARIABLES.name } } });
  });
});

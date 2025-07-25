import { renderHook } from '@testing-library/react';
import useAuthenticatedUser from '../use-authenticated-user';
import useData from '@blueshift-ui/fetch/dist/hooks/use-data';
import useFlexTags from '.';

jest.mock('@blueshift-ui/fetch/dist/hooks/use-data');
jest.mock('../use-authenticated-user');

const mockedUseAuthenticatedUser = useAuthenticatedUser as jest.Mock;
const mockedUseData = useData as jest.Mock;

describe('useFlexTags()', () => {
  beforeEach(() => {
    mockedUseData.mockReturnValue({ data: [], isLoading: false });
  });

  it.each([undefined, 'mock-client-uuid'])('when user client uuid is %s', (clientUuid) => {
    mockedUseAuthenticatedUser.mockReturnValue({ data: { client_uuid: clientUuid } });

    renderHook(() => useFlexTags());

    const [{ queryKey, queryOptions, request }] = mockedUseData.mock.calls[0];

    expect(queryKey).toEqual(['flex-tags', clientUuid]);
    expect(queryOptions.enabled).toBe(Boolean(clientUuid));
    expect(request.params.entity_id).toBe(clientUuid);
  });

  it.each([false, true])('when enabled is %s', (enabled) => {
    renderHook(() => useFlexTags({ enabled }));

    const [{ queryOptions }] = mockedUseData.mock.calls[0];

    expect(queryOptions.enabled).toBe(enabled);
  });

  it.each([false, true])('when bypassCache is %s', (bypassCache) => {
    renderHook(() => useFlexTags({ bypassCache }));

    const [{ queryOptions }] = mockedUseData.mock.calls[0];

    expect(queryOptions.refetchOnMount).toBe(bypassCache ? 'always' : true);
  });

  it('returns flex tags', () => {
    mockedUseData.mockReturnValue({ data: [{ id: 'mock-tag-id' }], isLoading: false });
    const { result } = renderHook(() => useFlexTags());

    expect(result.current.flexTags).toEqual([{ id: 'mock-tag-id' }]);
  });
});

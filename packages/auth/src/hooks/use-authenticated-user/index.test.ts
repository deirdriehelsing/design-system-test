import { Provider as JotaiProvider } from 'jotai/react';
import { renderHook } from '@testing-library/react';
import useAuthenticatedUser from '.';
import useConfigValue from '@blueshift-ui/core/dist/hooks/use-config-value';
import useData from '@blueshift-ui/fetch/dist/hooks/use-data';
import useHost from '@blueshift-ui/core/dist/hooks/use-host';

jest.mock('@blueshift-ui/fetch/dist/hooks/use-data');
jest.mock('@blueshift-ui/core/dist/hooks/use-config-value');
jest.mock('@blueshift-ui/core/dist/hooks/use-host');

describe('useAuthenticatedUser()', () => {
  const mockedUseData = useData as jest.Mock;
  const mockedUseConfigValue = useConfigValue as jest.Mock;
  const mockedUseHost = useHost as jest.Mock;
  const mockUser = {
    user_id: 'A-bC1dE2fG3hI4jK5lM6-Z',
    first_name: 'Mock',
    last_name: 'User',
    product_state: 'tutoring',
    role: 'student',
  } as const;
  const mockStudents = [
    { id: 'mock-student-id' },
    { id: 'mock-student-id-2', enablements: [{ product: { short_name: 'active_membership' } }] },
  ];

  function renderUseAuthenticatedUser(...parameters) {
    return renderHook(() => useAuthenticatedUser(...parameters), {
      // If we don't wrap it with a Jotai provider, the atom state leaks between tests
      wrapper: JotaiProvider,
    });
  }

  beforeEach(() => {
    mockedUseConfigValue.mockReturnValue(false);
    mockedUseHost.mockReturnValue('https://example.com');
    mockedUseData.mockReturnValue({ data: {}, isLoading: false, selectedLeaner: null });
  });

  describe('setup', () => {
    describe('`queryOptions.select` parameter', () => {
      it('returns user', () => {
        renderUseAuthenticatedUser();

        const [{ queryOptions, request }] = mockedUseData.mock.calls[0];
        expect(queryOptions.refetchOnMount).toStrictEqual(true);
        expect(
          queryOptions.select({
            entity: mockUser,
            students: mockStudents,
            token: { user_id: mockUser.user_id },
          })
        ).toStrictEqual({
          ...mockUser,
          client_id: undefined,
          client_uuid: undefined,
          students: mockStudents,
          user_type: 'other',
        });
        expect(request.attempts).toBe(1);
      });
    });

    describe('bypassCache parameter', () => {
      it('uses the provided bypassCache value when true', () => {
        renderUseAuthenticatedUser({ bypassCache: true });

        const [{ queryOptions, request }] = mockedUseData.mock.calls[0];
        expect(queryOptions.refetchOnMount).toStrictEqual('always');
        expect(request.params.bypass_user_cache).toBe(true);
      });

      it('uses the provided bypassCache value when false', () => {
        renderUseAuthenticatedUser({ bypassCache: false });

        const [{ queryOptions, request }] = mockedUseData.mock.calls[0];
        expect(queryOptions.refetchOnMount).toStrictEqual(true);
        expect(request.params.bypass_user_cache).toBe(false);
      });

      it('falls back to the config value when bypassCache is not provided', () => {
        mockedUseConfigValue.mockReturnValue(true);
        renderUseAuthenticatedUser();

        const [{ queryOptions, request }] = mockedUseData.mock.calls[0];
        expect(queryOptions.refetchOnMount).toStrictEqual(true);
        expect(request.params.bypass_user_cache).toBe(true);
      });

      it('prioritizes the provided bypassCache value over the config value', () => {
        mockedUseConfigValue.mockReturnValue(true);
        renderUseAuthenticatedUser({ bypassCache: false });

        const [{ queryOptions, request }] = mockedUseData.mock.calls[0];
        expect(queryOptions.refetchOnMount).toStrictEqual(true);
        expect(request.params.bypass_user_cache).toBe(false);
      });
    });

    it('adds student login data', () => {
      renderUseAuthenticatedUser();

      const [{ queryOptions }] = mockedUseData.mock.calls[0];

      expect(
        queryOptions.select({
          entity: {
            ...mockUser,
            client_id: null,
            client_uuid: null,
            role: 'student',
          },
          students: [
            {
              ...mockStudents[0],
              client: {
                id: 'mock-student-client-id',
                uuid: 'mock-student-client-uuid',
              },
            },
          ],
          token: { user_id: mockUser.user_id },
        })
      ).toEqual(
        expect.objectContaining({
          client_id: 'mock-student-client-id',
          client_uuid: 'mock-student-client-uuid',
        })
      );
    });

    it('includes zendesk jwt flag', () => {
      renderUseAuthenticatedUser();

      const [{ request }] = mockedUseData.mock.calls[0];
      expect(request.params.include_zendesk).toBe(true);
    });
  });

  describe('student user', () => {
    it('set the activeLearner directly if the authenticated user is a student', () => {
      mockedUseData.mockReturnValue({
        data: {
          ...mockUser,
          role: 'student',
          students: [mockStudents[0]],
        },
        isLoading: false,
        selectedLeaner: null,
      });

      const { result } = renderUseAuthenticatedUser();

      expect(result.current.activeLearner).toEqual(mockStudents[0]);
    });

    it('does not set the activeLearner directly if the authenticated user is not a student', () => {
      mockedUseData.mockReturnValue({
        data: {
          ...mockUser,
          role: 'client',
        },
        isLoading: false,
        selectedLeaner: null,
      });

      const { result } = renderUseAuthenticatedUser();

      expect(result.current.activeLearner).toBeUndefined();
    });
  });

  describe('with bypassCache', () => {
    it('should always refetch on mount', () => {
      renderUseAuthenticatedUser({ bypassCache: true });

      const [{ queryOptions }] = mockedUseData.mock.calls[0];
      expect(queryOptions.refetchOnMount).toStrictEqual('always');
    });
  });

  it('can configure extra query options', () => {
    renderUseAuthenticatedUser({
      includeStudents: false,
      includeZendesk: false,
      bypassCache: true,
      queryOptions: {
        refetchOnMount: false,
      },
    });

    const [{ request, queryKey, queryOptions }] = mockedUseData.mock.calls[0];
    expect(queryKey).toEqual(['authenticated-user', false, false]);
    expect(queryOptions.refetchOnMount).toBe(false);
    expect(request).toEqual({
      attempts: 1,
      params: {
        bypass_user_cache: true,
        include_entity: true,
        include_students: null,
        include_zendesk: null,
      },
      url: '/v1/users/me',
    });
  });
});

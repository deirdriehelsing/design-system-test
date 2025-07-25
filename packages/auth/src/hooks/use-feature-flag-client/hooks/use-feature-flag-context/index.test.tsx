import { renderHook, waitFor } from '@testing-library/react';
import useAuthenticatedUser from '../../../use-authenticated-user';
import useFeatureFlagContext from '.';

const mockedUseAuthenticatedUser = useAuthenticatedUser as jest.Mock;

jest.mock('../../../use-authenticated-user');
jest.mock('@blueshift-ui/theme/dist/hooks/use-breakpoints', () =>
  jest.fn(() => ({ isSmallViewport: true, isMediumViewport: false }))
);

describe('useFeatureFlagContext()', () => {
  beforeEach(() => {
    mockedUseAuthenticatedUser.mockReset();
  });

  describe('when given a context', () => {
    beforeEach(() => {
      mockedUseAuthenticatedUser.mockReturnValue({
        isLoading: false,
        data: undefined,
      });
    });

    it('returns given context', () => {
      const mockedGivenContext = {
        key: 'yet-another-mock-student-id',
        kind: 'yet-another-user',
        custom: 'mock-custom-context',
      };

      const { result } = renderHook(() => useFeatureFlagContext({ context: mockedGivenContext }));

      expect(result.current).toBe(mockedGivenContext);
    });
  });

  describe('when authenticated user is loading', () => {
    beforeEach(() => {
      mockedUseAuthenticatedUser.mockReturnValue({
        isLoading: true,
      });
    });

    it('returns as undefined context', () => {
      const { result } = renderHook(() => useFeatureFlagContext());

      expect(result.current).toBeUndefined();
    });
  });

  describe('when authenticated user is loaded without a user', () => {
    beforeEach(() => {
      mockedUseAuthenticatedUser.mockReturnValue({
        isLoading: false,
        data: undefined,
      });
    });

    it('returns an anonymous context', async () => {
      const { result } = renderHook(() => useFeatureFlagContext());

      await waitFor(() => {
        expect(result.current).toStrictEqual({
          key: 'anonymous',
          kind: 'user',
        });
      });
    });
  });

  describe('when authenticated user is loaded with a user', () => {
    beforeEach(() => {
      const activeLearner = {
        enablements: [
          { product: { short_name: 'one_on_one' } },
          { product: { short_name: 'ai_chat' } },
        ],
        first_name: 'Test',
        grade_list_id: 1,
        last_name: 'User',
      };

      mockedUseAuthenticatedUser.mockReturnValue({
        data: {
          email: 'test.user@example.com',
          user_id: 'mock-student-id',
          students: [activeLearner],
        },
        activeLearner,
        isLoading: false,
      });
    });

    it('returns authenticated user context', async () => {
      const { result } = renderHook(() => useFeatureFlagContext());

      await waitFor(() => {
        expect(result.current).toStrictEqual({
          email: 'test.user@example.com',
          enablements: 'one_on_one,ai_chat',
          gradeListId: 1,
          key: 'mock-student-id',
          kind: 'user',
          productState: '',
          viewportSize: 'small',
        });
      });
    });

    it('does not track non-internal emails', async () => {
      mockedUseAuthenticatedUser.mockReturnValue({
        data: {
          email: 'joe@hotmail.com',
          user_id: 'mock-student-id',
        },
        isLoading: false,
      });

      const { result } = renderHook(() => useFeatureFlagContext());

      await waitFor(() => {
        expect(result.current).toStrictEqual({
          email: undefined,
          enablements: '',
          gradeListId: undefined,
          key: 'mock-student-id',
          kind: 'user',
          productState: '',
          viewportSize: 'small',
        });
      });
    });
  });
});

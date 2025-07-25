import checkCriteria from '../../helpers/check-criteria';
import { renderHook } from '@testing-library/react';
import useAuthenticatedUser from '../use-authenticated-user';
import useCheckFeatureAccess from '.';
import useFeatureFlagClient from '../use-feature-flag-client';

const mockCheckCriteria = checkCriteria as jest.Mock;
const mockUseAuthenticatedUser = useAuthenticatedUser as jest.Mock;
const mockUseFeatureFlagClient = useFeatureFlagClient as jest.Mock;

jest.mock('../use-authenticated-user');
jest.mock('../use-feature-flag-client');
jest.mock('../../helpers/check-criteria', () => jest.fn(() => true));

describe('useCheckFeatureAccess()', () => {
  beforeEach(() => {
    mockCheckCriteria.mockClear();
  });

  describe('when loading', () => {
    beforeAll(() => {
      mockUseAuthenticatedUser.mockReturnValue({ isLoading: true });
      mockUseFeatureFlagClient.mockReturnValue({ isLoading: true });
    });

    it('returns a loading state', () => {
      const { result } = renderHook(() => useCheckFeatureAccess());

      expect(result.current).toEqual({
        checkAccess: expect.any(Function),
        isLoading: true,
        isLoadingAuthenticatedUser: true,
        isLoadingFlagClient: true,
      });
    });
  });

  describe('when loading user data', () => {
    beforeAll(() => {
      mockUseAuthenticatedUser.mockReturnValue({ isLoading: true });
      mockUseFeatureFlagClient.mockReturnValue({ isLoading: false });
    });

    it('does not wait for the user data to load on non-user data criteria', () => {
      const { result } = renderHook(() => useCheckFeatureAccess());

      result.current.checkAccess({ criteria: { flag: 'mock-flag' } });

      expect(mockCheckCriteria).toHaveBeenCalled();
    });
  });

  describe('when loading flag data', () => {
    beforeAll(() => {
      mockUseAuthenticatedUser.mockReturnValue({ isLoading: false });
      mockUseFeatureFlagClient.mockReturnValue({ isLoading: true });
    });

    it('does not wait for the flag data to load on non-flag criteria', () => {
      const { result } = renderHook(() => useCheckFeatureAccess());

      result.current.checkAccess({ criteria: { enablement: 'some_enablement' } });

      expect(mockCheckCriteria).toHaveBeenCalled();
    });
  });

  describe('when loaded', () => {
    const mockFlagClient = { variation: jest.fn(() => true) };
    const mockProductState = 'tutoring';
    const mockRole = 'student';
    const mockStudents = [
      { id: 'mock-student-id' },
      {
        id: 'mock-student-id-2',
        enablements: [{ product: { short_name: 'some_enablement' } }],
      },
    ];

    beforeAll(() => {
      mockUseAuthenticatedUser.mockReturnValue({
        isLoading: false,
        data: {
          product_state: mockProductState,
          role: mockRole,
          students: mockStudents,
        },
      });

      mockUseFeatureFlagClient.mockReturnValue({ client: mockFlagClient, isLoading: false });
    });

    it('returns a loaded state', () => {
      const { result } = renderHook(() => useCheckFeatureAccess());

      expect(result.current).toEqual({
        checkAccess: expect.any(Function),
        isLoading: false,
        isLoadingAuthenticatedUser: false,
        isLoadingFlagClient: false,
      });
    });

    it('does access checks', () => {
      const { result } = renderHook(() => useCheckFeatureAccess());

      const hasAccess = result.current.checkAccess({
        criteria: {
          some: [
            { enablement: 'some_enablement' },
            { flag: 'mock-flag' },
            { productState: 'tutoring' },
            { role: 'student' },
          ],
        },
      });

      expect(mockCheckCriteria).toHaveBeenCalledWith(
        {
          flagClient: mockFlagClient,
          students: mockStudents,
          userProductState: mockProductState,
          userRole: mockRole,
        },
        {
          some: [
            { enablement: 'some_enablement' },
            { flag: 'mock-flag' },
            { productState: 'tutoring' },
            { role: 'student' },
          ],
        }
      );

      expect(hasAccess).toBe(true);
    });
  });
});

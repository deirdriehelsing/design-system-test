import type {
  FeatureAccessCriteria,
  UseFeatureAccessResult,
  UserProductState,
  UserRole,
} from '../../types';

import * as helpers from '../../helpers';
import { renderHook } from '@testing-library/react';
import useAuthenticatedUser from '../use-authenticated-user';
import useFeatureAccess from '.';
import useFeatureFlagClient from '../use-feature-flag-client';

const mockUseAuthenticatedUser = useAuthenticatedUser as jest.Mock;
const mockUseFeatureFlagClient = useFeatureFlagClient as jest.Mock;

const mockProductState = 'tutoring';
const mockRole = 'student';
const mockStudents = [
  { id: 'mock-student-id' },
  { id: 'mock-student-id-2', enablements: [{ product: { short_name: 'some_enablement' } }] },
];

jest.mock('../use-authenticated-user');
jest.mock('../use-feature-flag-client', () =>
  jest.fn(() => ({
    client: { variation: jest.fn(() => true) },
    isLoading: false,
  }))
);
jest.mock('../../helpers', () => ({
  __esModule: true,
  ...jest.requireActual('../../helpers'),
}));

describe('useFeatureAccess()', () => {
  let checkFlagSpy: jest.SpyInstance;
  let checkEnablementSpy: jest.SpyInstance;
  let checkProductStateSpy: jest.SpyInstance;
  let checkRoleSpy: jest.SpyInstance;

  describe('when passing single criteria', () => {
    describe('when checking enablement', () => {
      // Mock other checks to always be true so we can test the enablement check in isolation
      beforeAll(() => {
        checkFlagSpy = jest.spyOn(helpers, 'checkFlag').mockReturnValue(true);
        checkProductStateSpy = jest.spyOn(helpers, 'checkProductState').mockReturnValue(true);
        checkRoleSpy = jest.spyOn(helpers, 'checkRole').mockReturnValue(true);
      });

      afterAll(() => {
        checkFlagSpy.mockRestore();
        checkProductStateSpy.mockRestore();
        checkRoleSpy.mockRestore();
      });

      describe('when user data is loading', () => {
        it('returns undefined', () => {
          mockUseAuthenticatedUser.mockReturnValue({ isLoading: true });
          const { result } = renderHook(() =>
            useFeatureAccess({ criteria: { enablement: 'some_enablement' } })
          );
          expect(result.current.isLoading).toBe(true);
          expect(result.current.hasAccess).toBe(undefined);
        });
      });

      describe('when there are no students present', () => {
        it('returns false', () => {
          mockUseAuthenticatedUser.mockReturnValue({ data: { students: [] } });
          const { result } = renderHook(() =>
            useFeatureAccess({ criteria: { enablement: 'some_enablement' } })
          );
          expect(result.current.isLoading).toBe(false);
          expect(result.current.hasAccess).toBe(false);
        });
      });

      describe('when there are students present', () => {
        beforeEach(() => {
          mockUseAuthenticatedUser.mockReturnValue({ data: { students: mockStudents } });
        });

        it.each([
          ['some_enablement', { hasAccess: true, isLoading: false }],
          ['another_enablement', { hasAccess: false, isLoading: false }],
        ])(
          'returns correct result when passed an enablement short name',
          (enablement, expectation) => {
            const { result } = renderHook(() => useFeatureAccess({ criteria: { enablement } }));
            expect(result.current.hasAccess).toBe(expectation.hasAccess);
            expect(result.current.isLoading).toBe(expectation.isLoading);
          }
        );

        it('returns correct result when passed a custom enablement checker function', () => {
          const { result } = renderHook(() =>
            useFeatureAccess({ criteria: { enablement: () => true } })
          );
          expect(result.current.hasAccess).toBe(true);
          expect(result.current.isLoading).toBe(false);
        });
      });
    });

    describe('when checking flag', () => {
      // Mock other checks to always be true so we can test the flag check in isolation
      beforeAll(() => {
        checkEnablementSpy = jest.spyOn(helpers, 'checkEnablement').mockReturnValue(true);
        checkProductStateSpy = jest.spyOn(helpers, 'checkProductState').mockReturnValue(true);
        checkRoleSpy = jest.spyOn(helpers, 'checkRole').mockReturnValue(true);
      });

      beforeEach(() => {
        mockUseAuthenticatedUser.mockReturnValue({
          data: { students: mockStudents },
          isLoading: false,
        });
      });

      afterAll(() => {
        checkEnablementSpy.mockRestore();
        checkProductStateSpy.mockRestore();
        checkRoleSpy.mockRestore();
      });

      it.each([true, false])('checks given feature flag for value %s', (flagValue) => {
        mockUseFeatureFlagClient.mockReturnValue({
          client: { variation: jest.fn(() => flagValue) },
          isLoading: false,
        });
        const { result } = renderHook(() => useFeatureAccess({ criteria: { flag: 'mock' } }));
        expect(result.current.hasAccess).toBe(flagValue);
        expect(result.current.isLoading).toBe(false);
      });
    });

    describe('when checking product state', () => {
      // Mock other checks to always be true so we can test the product state check in isolation
      beforeAll(() => {
        checkEnablementSpy = jest.spyOn(helpers, 'checkEnablement').mockReturnValue(true);
        checkFlagSpy = jest.spyOn(helpers, 'checkFlag').mockReturnValue(true);
        checkRoleSpy = jest.spyOn(helpers, 'checkRole').mockReturnValue(true);
      });

      beforeEach(() => {
        mockUseAuthenticatedUser.mockReturnValue({
          data: { product_state: mockProductState },
          isLoading: false,
        });
      });

      afterAll(() => {
        checkEnablementSpy.mockRestore();
        checkFlagSpy.mockRestore();
        checkRoleSpy.mockRestore();
      });

      describe('when user data is loading', () => {
        it('returns undefined', () => {
          mockUseAuthenticatedUser.mockReturnValue({ isLoading: true });
          const { result } = renderHook(() =>
            useFeatureAccess({ criteria: { productState: mockProductState } })
          );
          expect(result.current.isLoading).toBe(true);
          expect(result.current.hasAccess).toBe(undefined);
        });
      });

      describe('when there is no product state', () => {
        it('returns false', () => {
          mockUseAuthenticatedUser.mockReturnValue({ data: { product_state: undefined } });
          const { result } = renderHook(() =>
            useFeatureAccess({ criteria: { productState: 'free_class' } })
          );
          expect(result.current.isLoading).toBe(false);
          expect(result.current.hasAccess).toBe(false);
        });
      });

      describe('when product state is present', () => {
        beforeEach(() => {
          mockUseAuthenticatedUser.mockReturnValue({ data: { product_state: mockProductState } });
        });

        it.each<[UserProductState, UseFeatureAccessResult]>([
          ['tutoring', { hasAccess: true, isLoading: false }],
          ['free_class', { hasAccess: false, isLoading: false }],
        ])('returns correct result when passed a product state', (productState, expectation) => {
          const { result } = renderHook(() => useFeatureAccess({ criteria: { productState } }));
          expect(result.current.hasAccess).toBe(expectation.hasAccess);
          expect(result.current.isLoading).toBe(expectation.isLoading);
        });
      });
    });

    describe('when checking role', () => {
      // Mock other checks to always be true so we can test the role check in isolation
      beforeAll(() => {
        checkEnablementSpy = jest.spyOn(helpers, 'checkEnablement').mockReturnValue(true);
        checkFlagSpy = jest.spyOn(helpers, 'checkFlag').mockReturnValue(true);
        checkProductStateSpy = jest.spyOn(helpers, 'checkProductState').mockReturnValue(true);
      });

      beforeEach(() => {
        mockUseAuthenticatedUser.mockReturnValue({
          data: { product_state: mockRole },
          isLoading: false,
        });
      });

      afterAll(() => {
        checkEnablementSpy.mockRestore();
        checkFlagSpy.mockRestore();
        checkProductStateSpy.mockRestore();
      });

      describe('when user data is loading', () => {
        it('returns undefined', () => {
          mockUseAuthenticatedUser.mockReturnValue({ isLoading: true });
          const { result } = renderHook(() =>
            useFeatureAccess({ criteria: { productState: mockProductState } })
          );
          expect(result.current.isLoading).toBe(true);
          expect(result.current.hasAccess).toBe(undefined);
        });
      });

      describe('when there is no role', () => {
        it('returns false', () => {
          mockUseAuthenticatedUser.mockReturnValue({ data: { role: undefined } });
          const { result } = renderHook(() => useFeatureAccess({ criteria: { role: 'student' } }));
          expect(result.current.isLoading).toBe(false);
          expect(result.current.hasAccess).toBe(false);
        });
      });

      describe('when role is present', () => {
        beforeEach(() => {
          mockUseAuthenticatedUser.mockReturnValue({ data: { role: mockRole } });
        });

        it.each<[UserRole, UseFeatureAccessResult]>([
          ['student', { hasAccess: true, isLoading: false }],
          ['client', { hasAccess: false, isLoading: false }],
        ])('returns correct result when passed a role', (role, expectation) => {
          const { result } = renderHook(() => useFeatureAccess({ criteria: { role } }));
          expect(result.current.hasAccess).toBe(expectation.hasAccess);
          expect(result.current.isLoading).toBe(expectation.isLoading);
        });
      });
    });
  });

  describe('when passing multiple criteria', () => {
    // Mock other checks to always be true so we can test the criteria in isolation
    beforeAll(() => {
      checkFlagSpy = jest.spyOn(helpers, 'checkFlag').mockReturnValue(true);
      checkRoleSpy = jest.spyOn(helpers, 'checkRole').mockReturnValue(true);
    });

    beforeEach(() => {
      mockUseAuthenticatedUser.mockReturnValue({
        data: { product_state: mockProductState, students: mockStudents },
        isLoading: false,
      });
    });

    afterAll(() => {
      checkFlagSpy.mockRestore();
      checkRoleSpy.mockRestore();
    });

    it.each<[FeatureAccessCriteria, UseFeatureAccessResult]>([
      [
        {
          criteria: {
            some: [{ productState: mockProductState }, { enablement: 'some_enablement' }],
          },
        },
        {
          hasAccess: true,
          isLoading: false,
        },
      ],
      [
        {
          criteria: {
            some: [{ productState: mockProductState }, { enablement: 'another_enablement' }],
          },
        },
        {
          hasAccess: true,
          isLoading: false,
        },
      ],
      [
        {
          criteria: {
            some: [{ productState: 'free_class' }, { enablement: 'another_enablement' }],
          },
        },
        {
          hasAccess: false,
          isLoading: false,
        },
      ],
    ])('returns correct result when for criteria passed', ({ criteria }, expectation) => {
      const { result } = renderHook(() => useFeatureAccess({ criteria }));
      expect(result.current.hasAccess).toEqual(expectation.hasAccess);
      expect(result.current.isLoading).toEqual(expectation.isLoading);
    });
  });

  it('lazy-checks the feature access', () => {
    const variationSpy = jest.fn(() => true);

    mockUseFeatureFlagClient.mockReturnValue({
      client: { variation: variationSpy },
      isLoading: false,
    });

    const { result } = renderHook(() => useFeatureAccess({ criteria: { flag: 'mock' } }));
    expect(variationSpy).not.toHaveBeenCalled();

    expect(result.current.hasAccess).toBe(true);
    expect(variationSpy).toHaveBeenCalled();
  });
});

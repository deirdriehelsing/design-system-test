import type { FeatureAccessCriteria } from '../../types';

import checkCriteria from '../../helpers/check-criteria';
import hasFlagCriteria from '../../helpers/has-flag-criteria';
import hasUserCriteria from '../../helpers/has-user-criteria';
import useAuthenticatedUser from '../use-authenticated-user';
import useFeatureFlagClient from '../use-feature-flag-client';
import { useMemo } from 'react';

interface UseCheckFeatureAccessResult {
  checkAccess: ({ criteria }: FeatureAccessCriteria) => boolean | undefined;
  isLoading: boolean;
  isLoadingAuthenticatedUser: boolean;
  isLoadingFlagClient: boolean;
}

function useCheckFeatureAccess(): UseCheckFeatureAccessResult {
  const {
    data: { product_state: userProductState, role: userRole, students } = {},
    isLoading: isLoadingAuthenticatedUser,
  } = useAuthenticatedUser();

  const { client: flagClient, isLoading: isLoadingFlagClient } = useFeatureFlagClient();

  return useMemo(() => {
    return {
      checkAccess: ({ criteria }: FeatureAccessCriteria) => {
        const isLoading =
          (hasUserCriteria(criteria) && isLoadingAuthenticatedUser) ||
          (hasFlagCriteria(criteria) && isLoadingFlagClient);

        if (isLoading) {
          return;
        }

        return checkCriteria({ flagClient, students, userProductState, userRole }, criteria);
      },
      isLoading: isLoadingAuthenticatedUser || isLoadingFlagClient,
      isLoadingAuthenticatedUser,
      isLoadingFlagClient,
    };
  }, [
    flagClient,
    isLoadingAuthenticatedUser,
    isLoadingFlagClient,
    students,
    userProductState,
    userRole,
  ]);
}

export default useCheckFeatureAccess;

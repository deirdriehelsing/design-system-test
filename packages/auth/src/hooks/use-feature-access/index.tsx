import type { FeatureAccessCriteria, UseFeatureAccessResult } from '../../types';

import { useCallback, useMemo } from 'react';
import useCheckFeatureAccess from '../use-check-feature-access';

function useFeatureAccess({ criteria }: FeatureAccessCriteria): UseFeatureAccessResult {
  const { checkAccess, isLoading, isLoadingAuthenticatedUser, isLoadingFlagClient } =
    useCheckFeatureAccess();

  const hasAccess = useCallback(() => checkAccess({ criteria }), [checkAccess, criteria]);

  // return a proxy object so that we don't have to call the checkAccess function unless necessary
  // which can help performance and reduce calls to LaunchDarkly
  return useMemo(
    () =>
      Object.create(
        { isLoading, isLoadingAuthenticatedUser, isLoadingFlagClient },
        { hasAccess: { get: hasAccess } }
      ),
    [hasAccess, isLoading, isLoadingAuthenticatedUser, isLoadingFlagClient]
  );
}

export default useFeatureAccess;

import type { LDContext } from '../../../../types';

import getContextEmail from '../../helpers/get-context-email';
import getContextEnablements from '../../helpers/get-context-enablements';
import useAuthenticatedUser from '../../../use-authenticated-user';
import useBreakpoints from '@blueshift-ui/theme/dist/hooks/use-breakpoints';
import { useMemo } from 'react';

type UseFeatureFlagContextResult = LDContext | undefined;

interface UseFeatureFlagContextParams {
  context?: LDContext;
  enabled?: boolean;
}

function useFeatureFlagContext({
  context: givenContext,
  enabled = true,
}: UseFeatureFlagContextParams = {}): UseFeatureFlagContextResult {
  const {
    data: authenticatedUser,
    isLoading: isLoadingAuthenticatedUser,
    activeLearner,
  } = useAuthenticatedUser({
    // The only reason to fetch user info is to provide a context key to LaunchDarkly
    // If a context is already given, we don't need to fetch any user info at all
    enabled: enabled && !givenContext,
  });
  const { isSmallViewport, isMediumViewport } = useBreakpoints();
  const viewportSize = isSmallViewport ? 'small' : isMediumViewport ? 'medium' : 'large';

  const defaultContext = useMemo<UseFeatureFlagContextResult>(() => {
    if (!enabled || isLoadingAuthenticatedUser) {
      return;
    }

    if (!authenticatedUser) {
      return {
        key: 'anonymous',
        kind: 'user',
      };
    }

    return {
      // https://docs.launchdarkly.com/home/contexts
      // https://launchdarkly.github.io/node-client-sdk/types/LDContext.html
      email: getContextEmail(activeLearner?.email ?? authenticatedUser.email),
      enablements: getContextEnablements(authenticatedUser),
      gradeListId: activeLearner?.grade_list_id,
      key: authenticatedUser.user_id,
      kind: 'user',
      productState: authenticatedUser.product_state ?? '',
      viewportSize: viewportSize,
    };
  }, [activeLearner, authenticatedUser, enabled, isLoadingAuthenticatedUser, viewportSize]);

  return givenContext ?? defaultContext;
}

export default useFeatureFlagContext;

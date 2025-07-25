import type { AuthenticatedUser, Student, UseRedirectParams } from '../../../../types';

import getRedirectUrl from '../../helpers/get-redirect-url';
import { useEffect } from 'react';

function _getRedirectReason(activeLearner?: Student) {
  if (!activeLearner && !window.location.pathname?.startsWith('/my-learning/profile/select')) {
    return 'no_active_learner';
  }

  return '';
}

interface ProfileSelectorRedirectParams extends UseRedirectParams {
  activeLearner?: Student;
  applicationId: string;
  debug?: boolean;
  user?: AuthenticatedUser;
}

function useProfileSelectorRedirect({
  activeLearner,
  applicationId,
  debug = false,
  enabled = false,
  redirector,
  user,
}: ProfileSelectorRedirectParams) {
  const reason = _getRedirectReason(activeLearner);

  const shouldRedirectToLearnerSelection =
    enabled &&
    // Student users only have 1 student, so they don't need to select a profile
    user?.role !== 'student' &&
    Boolean(reason);

  useEffect(() => {
    if (!shouldRedirectToLearnerSelection) {
      return;
    }

    if (
      process.env.NODE_ENV === 'development' &&
      applicationId !== 'my-learning' &&
      !process.env.STORYBOOK_ENV
    ) {
      console.warn(
        '[Development Mode]: User doesn’t hasn’t selected an active learning. In higher environments this will redirect to the my-learning profile selector.',
        { activeLearner: activeLearner }
      );
      return;
    }

    const url = getRedirectUrl({
      debug,
      params: { return_to: window.location.href },
      path: '/my-learning/profile/select',
      reason,
      user,
    });

    redirector(url);
  }, [
    activeLearner,
    applicationId,
    debug,
    reason,
    redirector,
    shouldRedirectToLearnerSelection,
    user,
  ]);

  return shouldRedirectToLearnerSelection;
}

export default useProfileSelectorRedirect;

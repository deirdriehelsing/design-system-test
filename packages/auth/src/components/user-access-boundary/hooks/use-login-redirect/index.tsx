import type { AuthenticatedUser, UseRedirectParams, UserRole } from '../../../../types';

import getRedirectUrl from '../../helpers/get-redirect-url';
import { useEffect } from 'react';

function _getRedirectReason(user?: AuthenticatedUser, roles?: UserRole[]) {
  if (!user) {
    return 'no_user';
  }

  if (roles?.length && !roles?.includes(user.role)) {
    return `unsupported_role__${user.role}`;
  }

  return '';
}

interface UseRootRedirectParams extends UseRedirectParams {
  roles: UserRole[];
  user?: AuthenticatedUser;
}

function useLoginRedirect({
  debug = false,
  enabled = false,
  redirector,
  roles,
  user,
}: UseRootRedirectParams) {
  const reason = _getRedirectReason(user, roles);
  const shouldRedirectToLogin = enabled && Boolean(reason);

  useEffect(() => {
    if (!shouldRedirectToLogin) {
      return;
    }

    if (process.env.NODE_ENV === 'development' && !process.env.STORYBOOK_ENV) {
      console.error(
        '[Development Mode]: User doesn’t have required role. In higher environments this will redirect to login.',
        { userRole: user?.role, requiredRoles: roles }
      );
      return;
    }

    const url = getRedirectUrl({
      debug,
      params: { return_to: window.location.href },
      path: '/login',
      reason,
      user,
    });

    redirector(url);
  }, [debug, reason, redirector, roles, shouldRedirectToLogin, user]);

  return shouldRedirectToLogin;
}

export default useLoginRedirect;

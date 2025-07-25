import type { PropsWithChildren, ReactNode } from 'react';
import type { UserProductState, UserRole } from '../../types';

import React from 'react';
import useAuthenticatedUser from '../../hooks/use-authenticated-user';
import useLoginRedirect from './hooks/use-login-redirect';
import useProfileSelectorRedirect from './hooks/use-profile-selector-redirect';
import useRootRedirect from './hooks/use-root-redirect';

interface UserAccessBoundaryProps extends PropsWithChildren {
  /**
   * The application ID the boundary is rendered in. This helps us be smarter about redirects,
   */
  applicationId: string;
  /**
   * Whether or not the component should bypass the useAuthenticatedUser cache.
   * @default false
   */
  bypassAuthenticatedUserCache?: boolean;
  /**
   * Whether or not the boundary should operate in debug mode.
   */
  debug?: boolean;
  /**
   * The fallback to render when user data is loading. Set as `false` to continue eager-rendering while
   * loading is taking place.
   * @default null
   */
  loadingFallback?: ReactNode;
  /**
   * The product states that are allowed to access child content. If the user's product state is not
   * included in this array, they will be redirected to the www home page.
   * @note An undefined or empty array will allow all product states.
   */
  productStates?: UserProductState[];
  /**
   * function for handling redirects
   * @default window.location.assign
   */
  redirector?: (location: string) => void;
  /**
   * Whether or not there must be an active learner selected to access child content.
   * @default false
   */
  requireActiveLearner?: boolean;
  /**
   * The roles that are allowed to access child content. If the user's role is not included in this
   * array, they will be redirected to the login page.
   */
  roles: UserRole[];
  /**
   * The root path to redirect to when the user is known (logged-in), but not allowed to access
   * child content.
   * @default '/'
   */
  rootPath?: string;
}

function defaultRedirector(location: string) {
  window.location.assign(location);
}

function UserAccessBoundary({
  applicationId,
  bypassAuthenticatedUserCache = false,
  children,
  debug = false,
  loadingFallback = null,
  productStates,
  redirector = defaultRedirector,
  requireActiveLearner = false,
  roles,
  rootPath = '/',
}: UserAccessBoundaryProps) {
  const {
    activeLearner,
    isLoading: isLoadingAuthenticatedUser,
    data: user,
  } = useAuthenticatedUser({ bypassCache: bypassAuthenticatedUserCache });

  const willRedirectToLogin = useLoginRedirect({
    debug,
    enabled: !isLoadingAuthenticatedUser,
    redirector,
    roles,
    user,
  });

  const willRedirectToRoot = useRootRedirect({
    debug,
    enabled: !isLoadingAuthenticatedUser && !willRedirectToLogin,
    productStates,
    redirector,
    rootPath,
    user,
  });

  const willRedirectProfileSelector = useProfileSelectorRedirect({
    activeLearner,
    applicationId,
    debug,
    enabled:
      !isLoadingAuthenticatedUser &&
      !willRedirectToLogin &&
      !willRedirectToRoot &&
      requireActiveLearner,
    redirector,
    user,
  });

  /* Render */

  if (
    loadingFallback !== false &&
    (isLoadingAuthenticatedUser ||
      willRedirectToLogin ||
      willRedirectToRoot ||
      willRedirectProfileSelector)
  ) {
    return <>{loadingFallback}</>;
  }

  return <>{children}</>;
}

export default UserAccessBoundary;

import type { AuthenticatedUser, UseRedirectParams, UserProductState } from '../../../../types';

import getRedirectUrl from '../../helpers/get-redirect-url';
import { useEffect } from 'react';

function _getRedirectReason(user?: AuthenticatedUser, productStates?: UserProductState[]) {
  if (!user) {
    return 'no_user';
  }

  if (productStates?.length && !productStates?.includes(user.product_state)) {
    return `unsupported_product_state__${user.product_state}`;
  }

  return '';
}

interface UseRootRedirectParams extends UseRedirectParams {
  productStates?: UserProductState[];
  rootPath?: string;
  user?: AuthenticatedUser;
}

function useRootRedirect({
  debug = false,
  enabled = false,
  productStates,
  redirector,
  rootPath,
  user,
}: UseRootRedirectParams) {
  const reason = _getRedirectReason(user, productStates);
  const shouldRedirectToRoot = enabled && Boolean(reason);

  useEffect(() => {
    if (!shouldRedirectToRoot) {
      return;
    }

    if (process.env.NODE_ENV === 'development' && !process.env.STORYBOOK_ENV) {
      console.error(
        '[Development Mode]: User doesn’t have required product state. In higher environments this will redirect to the www root.',
        { userProductState: user?.product_state, requiredProductStates: productStates }
      );
      return;
    }

    const url = getRedirectUrl({ debug, path: rootPath, reason, user });

    redirector(url);
  }, [debug, productStates, reason, redirector, rootPath, shouldRedirectToRoot, user]);

  return shouldRedirectToRoot;
}

export default useRootRedirect;

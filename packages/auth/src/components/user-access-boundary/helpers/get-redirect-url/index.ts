import type { AuthenticatedUser } from '../../../../types';

import normalizeHref from '@blueshift-ui/core/dist/helpers/normalize-href';

interface GetRedirectUrlParams {
  debug?: boolean;
  params?: Record<string, string>;
  path?: string;
  reason?: string;
  user?: AuthenticatedUser;
}

function getRedirectUrl({ debug, params, path = '/', reason, user }: GetRedirectUrlParams): string {
  const url = new URL(normalizeHref(path, { full: true }));

  // Append given params
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  // Add info to the URL when on debug mode
  if (debug) {
    url.searchParams.append('debug', 'true');

    // Add redirect reason info to url
    if (reason) {
      url.searchParams.append('redirect_reason', reason);
    }

    // Add referrer url
    if (document.referrer) {
      url.searchParams.append('referrer', document.referrer);
    }

    // Append user information to the URL
    const userFields = ['user_id', 'client_id', 'product_state', 'role'];
    userFields.forEach((userField) => {
      const fieldValue = user?.[userField as keyof AuthenticatedUser];
      url.searchParams.append(userField, String(fieldValue));
    });
  }

  return url.toString();
}

export default getRedirectUrl;

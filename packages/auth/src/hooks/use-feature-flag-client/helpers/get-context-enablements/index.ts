import type { AuthenticatedUser } from '../../../../types';

import getAllEnablements from '../../../../helpers/get-all-enablements';

/**
 * Get a comma-separated string of unique enablements for a given user
 */
function getContextEnablements(user: AuthenticatedUser) {
  return getAllEnablements(user.students, { unique: true })
    .map((enablement) => enablement.product.short_name)
    .join(',');
}

export default getContextEnablements;

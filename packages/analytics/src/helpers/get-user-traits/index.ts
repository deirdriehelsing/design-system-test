import type { AuthenticatedUser, AuthenticatedUserResponse } from '@blueshift-ui/core';
import type { UserTraits } from '../../types';

import getRoleTraits from '../get-role-traits';
import getStudentTraits from '../get-student-traits';

/**
 * Get the analytics traits for a user.
 * @param user - The user to get the analytics traits for. It can be a direct response from the /me
 * endpoint or the return from the `useAuthenticatedUser` hook.
 * @returns The analytics traits for the user.
 */
function getUserTraits(
  user?: AuthenticatedUser | AuthenticatedUserResponse
): UserTraits | undefined {
  if (!user) {
    return undefined;
  }

  /**
   * This allows us to use the return from both useAuthenticatedUser ({@link AuthenticatedUser}) and
   * the /me endpoint directly ({@link AuthenticatedUserResponse}).
   */
  const authenticatedUser =
    'entity' in user
      ? {
          ...user.entity,
          students: user.students,
          user_id: user.token?.user_id,
        }
      : user;

  return {
    ...getRoleTraits(authenticatedUser),
    email: authenticatedUser.email,
    first_name: authenticatedUser.first_name,
    id: authenticatedUser.id,
    jurisdiction_id: authenticatedUser.jurisdiction_id,
    last_name: authenticatedUser.last_name,
    product_state: authenticatedUser.product_state,
    role: authenticatedUser.role,
    sales_group_ids: authenticatedUser.sales_group_list,
    students: authenticatedUser.students?.map(getStudentTraits) ?? [],
    user_id: authenticatedUser.user_id,
  };
}

export default getUserTraits;

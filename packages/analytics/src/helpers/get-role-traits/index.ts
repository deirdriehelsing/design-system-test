import type { AuthenticatedUser } from '@blueshift-ui/core';
import type { RoleTraits } from '../../types';

/**
 * Get the analytics traits for an authenticated user's role.
 * @param authenticatedUser - The authenticated user to get the analytics traits for.
 * @returns The analytics traits for the role.
 */
function getRoleTraits(authenticatedUser: AuthenticatedUser): RoleTraits {
  switch (authenticatedUser.role) {
    case 'client':
      return {
        role_id: authenticatedUser.client_id,
        role_uuid: authenticatedUser.client_uuid,
      };
    case 'student': {
      const student = authenticatedUser.students?.[0];
      return {
        role_id: student?.id ?? authenticatedUser.id,
        role_uuid: student?.uuid ?? authenticatedUser.user_id,
      };
    }
    case 'tutor':
      return {
        role_id: authenticatedUser.tutor_id,
        role_uuid: authenticatedUser.tutor_uuid,
      };
    default:
      return {
        role_id: authenticatedUser.id,
        role_uuid: authenticatedUser.user_id,
      };
  }
}

export default getRoleTraits;

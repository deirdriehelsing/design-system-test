import type { UserRole, UserRoleArg } from '../../types';

interface CheckRoleParams {
  role?: UserRoleArg;
  userRole?: UserRole;
}

function checkRole({ role, userRole }: CheckRoleParams = {}) {
  // Do not block access if no role was given
  if (!role) {
    return true;
  }

  if (!userRole) {
    return false;
  }

  if (typeof role === 'function') {
    return role(userRole);
  }

  return role === userRole;
}

export default checkRole;

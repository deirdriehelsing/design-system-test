import type {
  FeatureAccessOptions,
  LDClient,
  Student,
  UserProductState,
  UserRole,
} from '../../types';

import checkEnablement from '../check-enablement';
import checkFlag from '../check-flag';
import checkProductState from '../check-product-state';
import checkRole from '../check-role';

interface UserValues {
  flagClient?: LDClient;
  students?: Student[] | undefined;
  userProductState?: UserProductState;
  userRole?: UserRole;
}

function checkCriteria(args: UserValues, criteria: FeatureAccessOptions): boolean {
  if (criteria === true || criteria === false) {
    return Boolean(criteria);
  }

  if ('every' in criteria && criteria.every) {
    return criteria.every.every(checkCriteria.bind(null, args));
  }

  if ('some' in criteria && criteria.some) {
    return criteria.some.some(checkCriteria.bind(null, args));
  }

  if ('enablement' in criteria) {
    return checkEnablement({ enablement: criteria.enablement, students: args.students });
  }

  if ('flag' in criteria) {
    return checkFlag({ flag: criteria.flag, flagClient: args.flagClient });
  }

  if ('productState' in criteria) {
    return checkProductState({
      productState: criteria.productState,
      userProductState: args.userProductState,
    });
  }

  if ('role' in criteria) {
    return checkRole({ role: criteria.role, userRole: args.userRole });
  }

  return false;
}

export default checkCriteria;

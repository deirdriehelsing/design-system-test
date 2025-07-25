import type { FeatureAccessOptions } from '../../types';

const USER_CRITERIA_KEYS = ['enablement', 'productState', 'role'] as const;

function hasUserCriteria(criteria: FeatureAccessOptions) {
  if (typeof criteria !== 'object') {
    return false;
  }

  return Boolean(
    USER_CRITERIA_KEYS.some((key) => key in criteria) ||
      criteria.every?.some(hasUserCriteria) ||
      criteria.some?.some(hasUserCriteria)
  );
}

export default hasUserCriteria;

import type { FeatureAccessOptions } from '../../types';

function hasFlagCriteria(criteria: FeatureAccessOptions) {
  if (typeof criteria !== 'object') {
    return false;
  }

  return Boolean(
    'flag' in criteria ||
      criteria.every?.some(hasFlagCriteria) ||
      criteria.some?.some(hasFlagCriteria)
  );
}

export default hasFlagCriteria;

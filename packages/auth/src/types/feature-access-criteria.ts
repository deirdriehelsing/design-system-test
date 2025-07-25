import type { FeatureAccessOptions } from './feature-access-options';

interface FeatureAccessCriteria {
  /**
   * Criteria options that grant access to a given feature. A criteria is an object
   * with one key, typically the criteria you want to check for access.
   *
   * You can supply `every` or `some` with arrays of criteria for joining rules together.
   *
   * You can even supply a pure boolean, which is useful for cases where you need to
   * handle what to do with nullish inputs. (e.g. assume access is granted if there is no criteria)
   */
  criteria: FeatureAccessOptions;
}

export type { FeatureAccessCriteria };

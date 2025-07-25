import type { EnablementArg, FlagArg, UserProductStateArg, UserRoleArg } from '.';

interface AllFeatureAccessOptions {
  /**
   * An enablement short name to check for, or a custom function that takes an array of
   * enablements and returns a boolean.
   */
  enablement: EnablementArg;
  /**
   * Returns true if all of the criteria in the array are true.
   */
  every: FeatureAccessOptions[];
  /**
   * A feature flag to check access for, or a custom function that takes a flag set
   * and returns a boolean.
   */
  flag: FlagArg;
  /**
   * A user product state to check for, or a custom function that takes the user's product state
   * and returns a boolean.
   */
  productState: UserProductStateArg;
  /**
   * A user role to check for, or a custom function that takes the user's role
   * and returns a boolean.
   */
  role: UserRoleArg;
  /**
   * Returns true if any of the criteria in the array are true.
   */
  some: FeatureAccessOptions[];
}

/**
 * Utility type to force us to only use one key of an object.
 */
type OneKey<T extends object> = {
  [K in keyof T]-?: { [P in K]: T[K] } & { [P in Exclude<keyof T, K>]?: never } extends infer O
    ? { [P in keyof O]: O[P] }
    : never;
}[keyof T];

type FeatureAccessOptions = OneKey<AllFeatureAccessOptions> | true | false;

export type { FeatureAccessOptions };

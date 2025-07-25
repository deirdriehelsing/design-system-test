import type { ProductStates } from '../constants';

/**
 * These are the possible states of a user's selected product. They map to the `product_state` value
 * returned with the user entity data.
 * @see: @blueshift-ui/auth/src/hooks/use-authenticated-user/index.ts
 */
type UserProductState = (typeof ProductStates)[number];

export type { UserProductState };

import type { UserProductState, UserProductStateArg } from '../../types';

interface CheckProductStateParams {
  productState?: UserProductStateArg;
  userProductState?: UserProductState;
}

function checkProductState({ productState, userProductState }: CheckProductStateParams = {}) {
  // Do not block access if no product state was given
  if (!productState) {
    return true;
  }

  if (!userProductState) {
    return false;
  }

  if (typeof productState === 'function') {
    return productState(userProductState);
  }

  return productState === userProductState;
}

export default checkProductState;

import type { FlagArg, LDClient } from '../../types';

interface CheckFlagParams {
  flag?: FlagArg;
  flagClient?: LDClient;
}

function checkFlag({ flag, flagClient }: CheckFlagParams = {}): boolean {
  // Do not block access if no flag was given
  if (!flag) {
    return true;
  }

  if (!flagClient) {
    return false;
  }

  if (typeof flag === 'function') {
    return flag(flagClient);
  }

  return Boolean(flagClient.variation(flag, false));
}

export default checkFlag;

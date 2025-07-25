import type { LDClient } from '.';
import type { UseDataResult } from '@blueshift-ui/fetch';

interface UseFeatureFlagClientResult extends Omit<UseDataResult<LDClient>, 'data'> {
  client?: LDClient;
}

export type { UseFeatureFlagClientResult };

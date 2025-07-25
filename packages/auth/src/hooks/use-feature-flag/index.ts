import type { UseFeatureFlagClientParams, UseFeatureFlagClientResult } from '../../types';

import getFlagOverride from '../../helpers/get-flag-override';
import useConfigValue from '@blueshift-ui/core/dist/hooks/use-config-value';
import useFeatureFlagClient from '../use-feature-flag-client';
import { useMemo } from 'react';

interface UseFeatureFlagResult extends Omit<UseFeatureFlagClientResult, 'client'> {
  value: any;
}

function useFeatureFlag(
  flag: string,
  { context, enabled = true, options }: UseFeatureFlagClientParams = {}
): UseFeatureFlagResult {
  const allowFeatureFlagOverride = useConfigValue('allowFeatureFlagOverride');
  const { client, ...queryStatusParams } = useFeatureFlagClient({
    context,
    enabled,
    options,
  });

  return {
    value: useMemo(() => {
      const flagOverride = getFlagOverride({ flag });

      // overwrite LaunchDarkly flag with URL param if not production
      return allowFeatureFlagOverride && flagOverride !== undefined
        ? flagOverride
        : (client?.variation(flag, false) ?? null);
    }, [allowFeatureFlagOverride, client, flag]),
    ...queryStatusParams,
  };
}

export default useFeatureFlag;

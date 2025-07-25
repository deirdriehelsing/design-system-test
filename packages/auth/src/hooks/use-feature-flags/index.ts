import type {
  LDFlagSet,
  UseFeatureFlagClientParams,
  UseFeatureFlagClientResult,
} from '../../types';

import getFlagOverride from '../../helpers/get-flag-override';
import useConfigValue from '@blueshift-ui/core/dist/hooks/use-config-value';
import useFeatureFlagClient from '../use-feature-flag-client';
import { useMemo } from 'react';

const EMPTY_FLAGS: LDFlagSet = {};

interface UseFeatureFlagsResult extends Omit<UseFeatureFlagClientResult, 'client'> {
  flags: LDFlagSet;
}

/**
 * @note If the `sendEventsOnlyForVariation` option is set to `true` (default), this hook will not
 * send any tracking events to LaunchDarkly. For that reason, it is recommended to use
 * `useFeatureFlag` or `useFeatureAccess` when using flag values to make decisions in the UI.
 */
function useFeatureFlags({
  context,
  enabled = true,
  options,
}: UseFeatureFlagClientParams = {}): UseFeatureFlagsResult {
  const allowFeatureFlagOverride = useConfigValue('allowFeatureFlagOverride');
  const { client, ...queryStatusParams } = useFeatureFlagClient({ context, enabled, options });
  const search = window.location.search;

  return {
    flags: useMemo(() => {
      const flags = client?.allFlags() ?? EMPTY_FLAGS;

      // overwrite LaunchDarkly flags with URL params if not production
      if (allowFeatureFlagOverride === 'true') {
        const overriddenFlags: LDFlagSet = {};

        Object.keys(flags).forEach((key) => {
          const flagOverride = getFlagOverride({
            flag: key,
            searchParams: new URLSearchParams(search),
          });

          overriddenFlags[key] = flagOverride !== undefined ? flagOverride : flags[key];
        });

        return overriddenFlags;
      }

      return flags;
    }, [allowFeatureFlagOverride, client, search]),
    ...queryStatusParams,
  };
}

export default useFeatureFlags;

import type { FlagData, LDFlagSet } from '@blueshift-ui/core';
import type { TrackEventParams } from '../../types';

import { useMemo } from 'react';
import useViewTracking from '../use-view-tracking';

interface UseTrackPageLoadParams extends TrackEventParams {
  flags: LDFlagSet;
  flagsData: FlagData[];
  tag?: string;
}

const useViewTrackingWithTests = ({
  flags,
  tag = 'experiment',
  flagsData,
  ...trackEventParams
}: UseTrackPageLoadParams) => {
  const tests = useMemo(() => {
    return flagsData.map(({ name: flagName, variations }) => ({
      experimentId: flagName,
      variantId: variations.find(({ value }) => flags[flagName] === value)?.name ?? '',
    }));
  }, [flags, flagsData]);

  useViewTracking({ ...trackEventParams, tests }, tests.length > 0);
};

export default useViewTrackingWithTests;

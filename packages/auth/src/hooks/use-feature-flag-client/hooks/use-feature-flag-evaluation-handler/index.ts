import type { FeatureFlagEvaluatedEvent } from '@blueshift-ui/analytics';
import type { LDEvaluationDetail } from 'launchdarkly-js-client-sdk';

import { ANALYTICS_EVENT_NAMES, useAnalytics } from '@blueshift-ui/analytics';
import { useCallback } from 'react';

function useFeatureFlagEvaluationHandler() {
  const analytics = useAnalytics();

  const handleFeatureFlagEvaluation = useCallback(
    (flagKey: string, flagDetail: LDEvaluationDetail) => {
      if (!analytics.instance) {
        return;
      }

      const trackedProperties: FeatureFlagEvaluatedEvent = {
        evaluation_error_detail: flagDetail.reason?.errorKind,
        evaluation_prerequisite_key: flagDetail.reason?.prerequisiteKey,
        evaluation_reason: flagDetail.reason?.kind,
        flag_name: flagKey,
        flag_value: flagDetail.value,
        flag_variation_index: flagDetail.variationIndex,
        in_experiment: flagDetail.reason?.inExperiment,
      };

      analytics.track(ANALYTICS_EVENT_NAMES.featureFlagEvaluated, trackedProperties);
    },
    [analytics]
  );

  return handleFeatureFlagEvaluation;
}

export default useFeatureFlagEvaluationHandler;

import type { LDEvaluationDetail } from 'launchdarkly-js-client-sdk';

import { ANALYTICS_EVENT_NAMES, useAnalytics } from '@blueshift-ui/analytics';
import { renderHook } from '@testing-library/react';
import useFeatureFlagEvaluationHandler from '.';

jest.mock('@blueshift-ui/analytics/dist/hooks/use-analytics');

describe('useFeatureFlagEvaluationHandler', () => {
  const mockTrack = jest.fn();

  beforeEach(() => {
    (useAnalytics as jest.Mock).mockReturnValue({
      track: mockTrack,
      instance: true,
    });
  });

  it('calls analytics.track with correct parameters when flag is evaluated', () => {
    const { result } = renderHook(() => useFeatureFlagEvaluationHandler());

    const flagKey = 'test-flag';
    const flagDetail: LDEvaluationDetail = {
      value: true,
      variationIndex: 1,
      reason: {
        kind: 'RULE_MATCH',
        ruleIndex: 0,
        ruleId: 'rule-1',
        prerequisiteKey: 'prerequisite-flag',
        errorKind: 'ERROR',
        inExperiment: true,
      },
    };

    // Call the handler function
    result.current(flagKey, flagDetail);

    // Check that analytics.track was called with the correct parameters
    expect(mockTrack).toHaveBeenCalledWith(
      ANALYTICS_EVENT_NAMES.featureFlagEvaluated,
      expect.objectContaining({
        evaluation_error_detail: 'ERROR',
        evaluation_prerequisite_key: 'prerequisite-flag',
        evaluation_reason: 'RULE_MATCH',
        flag_name: flagKey,
        flag_value: true,
        flag_variation_index: 1,
        in_experiment: true,
      })
    );
  });

  it('does not call analytics.track when analytics.instance is falsy', () => {
    (useAnalytics as jest.Mock).mockReturnValue({
      track: mockTrack,
      instance: false,
    });

    const { result } = renderHook(() => useFeatureFlagEvaluationHandler());

    const flagKey = 'test-flag';
    const flagDetail: LDEvaluationDetail = {
      value: true,
      variationIndex: 1,
      reason: {
        kind: 'RULE_MATCH',
      },
    };

    // Call the handler function
    result.current(flagKey, flagDetail);

    // Check that analytics.track was not called
    expect(mockTrack).not.toHaveBeenCalled();
  });

  it('handles missing reason fields gracefully', () => {
    const { result } = renderHook(() => useFeatureFlagEvaluationHandler());

    const flagKey = 'test-flag';
    const flagDetail: LDEvaluationDetail = {
      value: false,
      variationIndex: 0,
      // No reason field
    };

    // Call the handler function
    result.current(flagKey, flagDetail);

    // Check that analytics.track was called with undefined values for reason fields
    expect(mockTrack).toHaveBeenCalledWith(
      ANALYTICS_EVENT_NAMES.featureFlagEvaluated,
      expect.objectContaining({
        flag_name: flagKey,
        flag_value: false,
        flag_variation_index: 0,
      })
    );
  });
});

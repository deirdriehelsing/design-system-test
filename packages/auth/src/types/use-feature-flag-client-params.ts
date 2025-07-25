import type { LDContext, LDOptions } from 'launchdarkly-js-client-sdk';

interface UseFeatureFlagClientParams {
  context?: LDContext;
  enabled?: boolean;
  options?: LDOptions;
}

export type { UseFeatureFlagClientParams };

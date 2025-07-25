import type { LDLogLevel, LDOptions } from '../../../types';

import { basicLogger } from 'launchdarkly-js-client-sdk';

const DEFAULT_CLIENT_OPTIONS: Readonly<LDOptions> = {
  // https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html
  application: {
    id: 'blueshift-ui',
    version: '0.0.0',
  },
  bootstrap: 'localStorage',
  diagnosticOptOut: true,
  disableSyncEventPost: true,
  evaluationReasons: true, // temporarily set to true to debug Onboarding Wizard flag evaluation
  fetchGoals: false,
  logger: basicLogger({
    level: (process.env.LAUNCH_DARKLY_LOG_LEVEL ?? 'info') as LDLogLevel,
    prefix: '[Feature Management]: ',
  }),
  sendEventsOnlyForVariation: true,
  streaming: false,
};

export default DEFAULT_CLIENT_OPTIONS;

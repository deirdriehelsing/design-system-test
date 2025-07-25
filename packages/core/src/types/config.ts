import type { LDLogLevel } from './launchdarkly';

/**
 * The interface that governs Blueshift configuration values.
 * This can be overridden/extended in containing applications.
 */
interface Config {
  allowFeatureFlagOverride?: string;
  apiHost?: string;
  bypassUserCache?: boolean;
  host?: string;
  launchDarklyApiBaseUrl?: string;
  launchDarklyAppKey?: string;
  launchDarklyAuth?: string;
  launchDarklyLogLevel?: LDLogLevel;
  pusherAppKey?: string;
  pusherCluster?: string;
}

export type { Config };

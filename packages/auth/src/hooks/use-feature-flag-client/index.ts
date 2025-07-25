import type {
  LDClient,
  LDContext,
  UseFeatureFlagClientParams,
  UseFeatureFlagClientResult,
} from '../../types';

import { basicLogger, initialize } from 'launchdarkly-js-client-sdk';
import DEFAULT_CLIENT_OPTIONS from './constants/default-client-options';
import { launchDarklyClient as cachedClientAtom } from '../../state/atoms';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import useConfigValue from '@blueshift-ui/core/dist/hooks/use-config-value';
import useData from '@blueshift-ui/fetch/dist/hooks/use-data';
import useFeatureFlagContext from './hooks/use-feature-flag-context';
import useFeatureFlagEvaluationHandler from './hooks/use-feature-flag-evaluation-handler';

function useFeatureFlagClient({
  context: givenContext,
  enabled = true,
  options = DEFAULT_CLIENT_OPTIONS,
}: UseFeatureFlagClientParams = {}): UseFeatureFlagClientResult {
  // The client is cached in global state.
  // This helps preventing the creation of too many clients.
  const [cachedClient, setCachedClient] = useAtom(cachedClientAtom);

  const appKey = useConfigValue('launchDarklyAppKey');
  const context = useFeatureFlagContext({ context: givenContext, enabled });
  const level = useConfigValue('launchDarklyLogLevel', 'info');
  const handleFeatureFlagEvaluation = useFeatureFlagEvaluationHandler();

  const getFeatureFlagClient = useCallback(async () => {
    // This will always be defined due to the `queryOptions.enabled` check
    const knownContext = context as LDContext;

    // Try to grab flags from the cached client first
    if (cachedClient) {
      // Update client identity context if it has changed.
      if (cachedClient.getContext().key !== knownContext.key) {
        await cachedClient.identify(knownContext);
      }

      await cachedClient.waitUntilReady();

      return cachedClient;
    }

    // There is no cached client. We need to create one before getting the flags.
    // Set up the logger based on our config retrieved above.
    const client = initialize(appKey, knownContext, {
      ...options,
      inspectors: [
        ...(options?.inspectors ?? []),
        {
          method: handleFeatureFlagEvaluation,
          name: 'track-flag-evaluation',
          type: 'flag-used',
        },
      ],
      logger: basicLogger({ level, prefix: '[Feature Management]: ' }),
    });

    setCachedClient(client);

    await client.waitUntilReady();

    return client;
  }, [appKey, cachedClient, context, handleFeatureFlagEvaluation, level, options, setCachedClient]);

  const { data: client, ...queryStatusParams } = useData<LDClient>({
    queryKey: [
      'feature-flag-client',
      context ? JSON.stringify(context) : null,
      JSON.stringify(options),
    ],
    queryFn: getFeatureFlagClient,
    queryOptions: {
      enabled: Boolean(enabled && context),
      // Feature flags do not need to be refetched as often
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  });

  return { client, ...queryStatusParams };
}

export default useFeatureFlagClient;

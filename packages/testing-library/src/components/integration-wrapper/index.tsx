import type { ReactNode } from 'react';

import { Provider as JotaiProvider, createStore } from 'jotai';
import FetchProvider from '@blueshift-ui/fetch/dist/components/fetch-provider';
import I18nProvider from '@blueshift-ui/i18n/dist/components/provider';
import TrackInteractionProvider from '@blueshift-ui/telemetry/dist/components/track-interaction-provider';
import { configAtom } from '@blueshift-ui/core/dist/state/config-atoms';

interface IntegrationWrapperProps {
  children: ReactNode;
  suspense?: boolean;
}

/**
 * Convenience wrapper for integration tests that mocks fetching, i18n and launchdarkly for use with nock.
 */
function IntegrationWrapper({ children, suspense = false }: IntegrationWrapperProps) {
  const store = createStore();
  store.set(configAtom, {
    launchDarklyAppKey: 'launch_darkly_key',
    launchDarklyLogLevel: 'warn',
    apiHost: process.env.NOCK_API_HOST ?? 'http://api.example.com',
  });

  return (
    <TrackInteractionProvider applicationId="test" segmentWriteKey="test">
      <JotaiProvider store={store}>
        <FetchProvider>
          <I18nProvider namespace="blueshift-ui" suspense={suspense}>
            {children}
          </I18nProvider>
        </FetchProvider>
      </JotaiProvider>
    </TrackInteractionProvider>
  );
}

export default IntegrationWrapper;

import type { Config } from '../../types';
import type { PropsWithChildren } from 'react';

import * as atoms from '../../state/config-atoms';
import { useHydrateAtoms } from 'jotai/utils';

interface ConfigProviderProps extends PropsWithChildren<unknown> {
  /**
   * Configuration object of string:string key-value pairs.
   *
   * @note It must be referentially stable, otherwise it will cause unnecessary re-renders.
   */
  config: Config;
}

/**
 * Simple configuration provider. Wrap your application with this provider to provide its
 * descendants access to its values.
 *
 * @note This is intended to be used once at/near the root of your application as a way to inject
 * environment-variable-like config dependencies. Nesting this provider will lead to unexpected
 * behavior.
 *
 * @example
 * const appConfig = { baseAssetPath: process.env.BASE_ASSET_PATH };
 *
 * function Logo() {
 *  const baseApiPath = useConfigValue('baseAssetPath');
 *  return <img src={`${baseAssetPath}/logo.webp`} />;
 * }
 *
 * function App() {
 *  return (
 *   <ConfigProvider config={config}>
 *     <Logo />
 *   </ConfigProvider>
 * }
 *
 */
function ConfigProvider({ children, config }: ConfigProviderProps) {
  useHydrateAtoms(new Map([[atoms.configAtom, config]]));

  return <>{children}</>;
}

export default ConfigProvider;

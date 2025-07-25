import type { Config } from '../../types';

import * as atoms from '../../state/config-atoms';
import { selectAtom } from 'jotai/utils';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

/**
 * Hook to get a value from the application config. Must be used within a `ConfigProvider`.
 * @param {string} key - The key of the config value to retrieve.
 * @param {string} [defaultValue=''] - The default value to return if the key is not found.
 *
 * @see {@link file://./../../providers/config-provider/index.tsx | ConfigProvider} implementation
 */
function useConfigValue<T extends keyof Config>(
  key: T,
  defaultValue?: Config[T]
): NonNullable<Config[T]> {
  const configValueAtom = selectAtom(
    atoms.readonlyConfigAtom,
    useCallback((config: Config) => config[key], [key])
  );

  const [configValue] = useAtom(configValueAtom);

  return configValue ?? defaultValue ?? ('' as NonNullable<Config[T]>);
}

export default useConfigValue;

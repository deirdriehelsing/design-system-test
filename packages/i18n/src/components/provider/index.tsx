import type { StaticTranslationsJSON } from '../../types';

import * as atoms from '../../state/atoms';
import { i18next, initI18next } from '../../lib/i18next/config';
import { useAtomValue, useStore } from 'jotai';
import { I18nextProvider } from 'react-i18next';
import React from 'react';
import useConfigValue from '@blueshift-ui/core/dist/hooks/use-config-value';
import { useHydrateAtoms } from 'jotai/utils';

interface I18nProviderProps extends React.PropsWithChildren<unknown> {
  /**
   * Optional translation scope, defaults to a global `vt` namespace.
   * @remark Namespace values need to align to the namespaces defined in rich_translation groupings in NSP.
   * @see https://nerdy.admin.datocms.com/admin/item_types/1450762
   */
  namespace?: string;
  /**
   * Optional preview flag, defaults to `false`. When true, the provider will fetch unpublished/draft translations.
   * @see https://nerdy.admin.datocms.com/admin/item_types/1450762
   */
  preview?: boolean;
  /**
   * Optional static translations JSON containing all translations for loading translations from memory. Fallbacks to `staticTranslationsURL` if not provided.
   * The provided JSON should contain all of the translations following the format expected by MultiLoading
   * @see https://github.com/i18next/i18next-multiload-backend-adapter
   * Returned JSON structure should be:
   * {
   *  lang : {
   *   namespaceA: {},
   *   namespaceB: {},
   *   ...etc
   *  }
   * }
   */
  staticTranslationsJSON?: StaticTranslationsJSON;
  /**
   * Optional load path for static translation files containing all translations. Fallbacks to content API if not provided.
   * The returned JSON file should contain all of the translations following the format expected by MultiLoading
   * @see https://github.com/i18next/i18next-multiload-backend-adapter
   * Returned JSON structure should be:
   * {
   *  lang : {
   *   namespaceA: {},
   *   namespaceB: {},
   *   ...etc
   *  }
   * }
   */
  staticTranslationsURL?: string;
  /**
   * Optional suspense flag, defaults to `true`. When true, the provider will suspend rendering until i18next is initialized.
   */
  suspense?: boolean;
}

function I18nProvider({
  children,
  namespace = 'vt',
  preview = false,
  staticTranslationsJSON,
  staticTranslationsURL,
  suspense = true,
}: I18nProviderProps) {
  const apiHost = useConfigValue('apiHost');
  const namespaceAtom = useAtomValue(atoms.namespace);
  const previewAtom = useAtomValue(atoms.preview);
  const store = useStore();

  useHydrateAtoms([
    [atoms.namespace, namespace ?? namespaceAtom],
    [atoms.preview, preview ?? previewAtom],
  ]);

  // reinitialize i18n with new namespace and preview values
  if (suspense && !i18next.isInitialized) {
    throw new Promise<unknown>((resolve) => {
      initI18next({ apiHost, staticTranslationsJSON, staticTranslationsURL, store }).then(resolve);
    });
  }

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}

export default I18nProvider;

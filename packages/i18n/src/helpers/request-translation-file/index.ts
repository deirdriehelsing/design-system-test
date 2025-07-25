import type { RequestTranslationCallback } from '../../types';
import type { createStore } from 'jotai';

import fetchTranslationsJSON from '../fetch-translations-json';
import logHandledError from '@blueshift-ui/telemetry/dist/helpers/log-handled-error';

interface RequestTranslationFileParams {
  callback: RequestTranslationCallback;
  staticTranslationsURL: string;
  store: ReturnType<typeof createStore>;
  translationPath: string;
}

async function requestTranslationFile({
  callback,
  staticTranslationsURL,
  store,
  translationPath,
}: RequestTranslationFileParams) {
  const [locale, namespace] = translationPath.split('/');

  // Skip if locale or namespace are not provided
  if (!locale || locale.startsWith('null') || !namespace || namespace.startsWith('null')) {
    callback(null, { status: 400, data: '' });
    return;
  }

  let responseStatus: number = 0;
  try {
    const { response, json } = await fetchTranslationsJSON({ staticTranslationsURL, store });
    responseStatus = response.status;

    if (!response?.ok) {
      throw new Error(
        `Failed to fetch translation file: [status: ${response?.status}, statusText: ${response?.statusText}]`
      );
    }

    if (!json?.[locale]?.[namespace]) {
      throw new Error(`Translation not found for locale: ${locale}, namespace: ${namespace}`);
    }

    // Return translation if available in retrieved JSON file
    callback(null, { status: 200, data: JSON.stringify(json[locale][namespace]) });
  } catch (error) {
    logHandledError(error instanceof Error ? error.message : String(error));
    callback(error, { status: responseStatus ?? 0, data: '' });
  }
}

export default requestTranslationFile;

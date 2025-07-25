import type { StaticTranslationsJSON } from '../types/static-translations-json';

import { atom } from 'jotai/vanilla';

const namespace = atom<string | null>(null);
const preview = atom<boolean>(false);
const staticTranslationJSONRequest = atom<Promise<{
  json: StaticTranslationsJSON;
  response: Response;
}> | null>(null);

export { namespace, preview, staticTranslationJSONRequest };

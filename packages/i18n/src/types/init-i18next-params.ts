import type { StaticTranslationsJSON } from '../types';
import type { createStore } from 'jotai/vanilla';

interface InitI18nextParams {
  apiHost: string;
  staticTranslationsJSON?: StaticTranslationsJSON;
  staticTranslationsURL?: string;
  store?: ReturnType<typeof createStore>;
}

export type { InitI18nextParams };

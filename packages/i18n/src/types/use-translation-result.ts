import type { TranslationFunction, TranslationResult } from './translation-function';
import type { i18n } from 'i18next';

interface UseTranslationResult<TResult extends TranslationResult> {
  i18n: i18n;
  loading: boolean;
  translate: TranslationFunction<TResult>;
}

export type { UseTranslationResult };

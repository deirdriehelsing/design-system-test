import type { UseTranslationOptions as I18nextUseTranslationOptions } from 'react-i18next';

interface UseTranslationOptions extends I18nextUseTranslationOptions {
  /** Any other namespaces to load in the same request */
  include?: string[];
  ns?: string;
  rich?: boolean;
}

export type { UseTranslationOptions };

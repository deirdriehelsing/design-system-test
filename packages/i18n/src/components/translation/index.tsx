import type { TFunction } from 'i18next';
import type { TranslationFunction } from '../../types';

import React, { Suspense } from 'react';
import { Trans } from 'react-i18next';

interface Replacements {
  components: React.ReactElement[] | Record<string, React.ReactElement>;
  values?: Record<string, string>;
}

interface TranslationProps {
  /**
   * Translation key.
   */
  i18nKey: string;
  /**
   * Replacement data for the translation.
   */
  replace: Replacements;
  /**
   * Optional fallback to render while the translation is loading.
   */
  suspenseFallback?: React.ReactNode;
  /**
   * Translator function. This typically comes from the `translate` function provided by the `useTranslation` hook.
   */
  translator: TranslationFunction<string>;
}

function Translation({
  i18nKey,
  replace: { components, values },
  suspenseFallback = null,
  translator,
}: TranslationProps) {
  return (
    <Suspense fallback={suspenseFallback}>
      <Trans
        components={components}
        i18nKey={i18nKey}
        t={((key: string) => translator(key, values)) as TFunction}
      />
    </Suspense>
  );
}

export default Translation;

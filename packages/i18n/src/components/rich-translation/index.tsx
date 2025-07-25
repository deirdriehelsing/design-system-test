import type { RichContent, TranslationFunction } from '../../types';
import type {
  StructuredTextGraphQlResponseRecord,
  StructuredTextPropTypes,
} from 'react-datocms/structured-text';

import React, { Suspense } from 'react';
import { StructuredText } from 'react-datocms/structured-text';

interface RichTranslationProps
  extends Omit<StructuredTextPropTypes<StructuredTextGraphQlResponseRecord>, 'data'> {
  /**
   * Translation key.
   */
  i18nKey: string;
  /**
   * Translator options.
   */
  replace?: Record<string, any>;
  /**
   * Optional fallback to render while the translation is loading.
   */
  suspenseFallback?: React.ReactNode;
  /**
   * Translator function. This typically comes from the `translate` function provided by the `useRichTranslation` hook.
   */
  translator: TranslationFunction<RichContent>;
}

function RichTranslation({
  i18nKey,
  replace: replacementValues,
  suspenseFallback = null,
  translator: translate,
  ...structuredTextProps
}: RichTranslationProps) {
  return (
    <Suspense fallback={suspenseFallback}>
      <StructuredText data={translate(i18nKey, replacementValues)} {...structuredTextProps} />
    </Suspense>
  );
}

export default RichTranslation;

import type {
  StructuredTextGraphQlResponse,
  StructuredTextGraphQlResponseRecord,
} from 'react-datocms/structured-text';
import type { TranslationFunction, TranslationResult, UseTranslationResult } from '../../types';
import type { UseTranslationOptions } from '../../types/use-translation-options';

import React from 'react';
import logHandledError from '@blueshift-ui/telemetry/dist/helpers/log-handled-error';
import { useTranslation as useI18nextTranslation } from 'react-i18next';
import useTranslationNamespace from '../use-translation-namespace';

type RichContent = StructuredTextGraphQlResponse<StructuredTextGraphQlResponseRecord>;
type I18nextOptions = Record<string, any> | string;

function _getFallbackTranslation(key: string, i18nextOptions: I18nextOptions): string {
  // If i18nextOptions is a string, it is considered the default value by i18next, so let's treat it as
  // the same here.
  return typeof i18nextOptions === 'string' ? i18nextOptions : key;
}

function useTranslation(name: string): UseTranslationResult<string>;

/** @deprecated Use `options` as an object instead of an array of flags */
function useTranslation<TResult extends TranslationResult = string>(
  name: string,
  flags: string[]
): UseTranslationResult<TResult>;

function useTranslation<Options extends UseTranslationOptions>(
  name: string,
  options: Options
): UseTranslationResult<Options['rich'] extends true ? RichContent : string>;

function useTranslation(
  name: string,
  options: string[] | UseTranslationOptions = {}
): UseTranslationResult<TranslationResult> {
  // support deprecated usage
  if (Array.isArray(options)) {
    options = { rich: Boolean(options?.includes('rich')) };
  }

  const { rich } = options;
  const translationNameSpace = useTranslationNamespace(`${name}${rich ? '::rich' : ''}`, options);

  const {
    i18n,
    ready,
    t: translate,
  } = useI18nextTranslation(translationNameSpace, {
    useSuspense: !rich,
    ...options,
  });

  const translationLoading = Boolean(!ready || !translationNameSpace);

  return {
    i18n,
    loading: translationLoading,
    translate: React.useCallback(
      (key: string, i18nextOptions: I18nextOptions = '') => {
        if (translationLoading) {
          // Our config relies on suspense
          return rich ? undefined : _getFallbackTranslation(key, i18nextOptions);
        }

        const translation = translate<string, any>(key, i18nextOptions);

        if (!translation) {
          logHandledError(
            `Translation not found for key "${key}" in namespace "${translationNameSpace}"`
          );
        }

        if (rich) {
          try {
            return translation ? JSON.parse(translation) : undefined;
          } catch (error) {
            console.error(error);
            return undefined;
          }
        }

        return translation;
      },
      [rich, translate, translationLoading, translationNameSpace]
    ) as TranslationFunction<TranslationResult>,
  };
}

export default useTranslation;

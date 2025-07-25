import type { RichContent, UseTranslationResult } from '../../types';

import useTranslation from '../use-translation';

/** @deprecated use `useTranslation(name, { rich: true })` instead of this function */
function useRichTranslation(name: string, flags: string[] = []): UseTranslationResult<RichContent> {
  return useTranslation<RichContent>(name, [...flags, 'rich']);
}

export default useRichTranslation;

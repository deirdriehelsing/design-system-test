import type { UseTranslationOptions } from '../../types/use-translation-options';

import * as atoms from '../../state/atoms';
import { useAtomValue } from 'jotai/react';

function useTranslationNamespace(
  name: string,
  options: UseTranslationOptions = {}
): string[] | string | undefined {
  const namespace = useAtomValue(atoms.namespace);
  const preview = useAtomValue(atoms.preview);

  if (!namespace && !options.ns) {
    // i18next isn't ready yet
    return;
  }

  const buildNamespace = (name: string) =>
    [options.ns ?? namespace, name, preview ? 'preview' : undefined].filter(Boolean).join('::');

  return options.include ? [name, ...options.include].map(buildNamespace) : buildNamespace(name);
}

export default useTranslationNamespace;

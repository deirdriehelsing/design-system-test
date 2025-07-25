import type { RequestTranslationCallback } from '../../types';

type TranslationTypeConfig = {
  query: (slug: string, locale: string) => Record<string, any>;
};

/**
 * A fallback function to get the api host from the current path in case we do not supply it from I18nProvider.
 */
const getFallbackApiHost = () => location.origin.replace(/\/\/\w+/, '//api');

const dataSelector: (
  results: any,
  locale: string,
  preview: boolean
) => Record<string, Record<string, Record<string, string>>> = (results, locale, preview) => {
  const output: Record<string, Record<string, string>> = {};

  for (const result of results ?? []) {
    const { translationGroup, richTranslationGroup } = result?.data ?? {};

    if (translationGroup) {
      const slug = translationGroup.slug.replace(/\./, '::');
      output[`${slug}${preview ? '::preview' : ''}`] = translationGroup.translations;
    }

    if (richTranslationGroup) {
      const slug = richTranslationGroup.slug.replace(/\./, '::');
      output[`${slug}::rich${preview ? '::preview' : ''}`] =
        richTranslationGroup.translations.reduce(
          (memo: Record<string, string>, { key, value: translation }: Record<string, string>) => ({
            ...memo,
            [key]: JSON.stringify(translation),
          }),
          {}
        );
    }
  }

  return { [locale]: output };
};

const translationConfig: Record<string, TranslationTypeConfig> = {
  rich: {
    query(slug: string, locale: string) {
      return {
        cacheKey: `rich_translation_group/${slug}`,
        query: `
          query localizedContent($slug: String) {
            richTranslationGroup(filter: {slug: {eq: $slug}}) {
              id
              name
              namespace
              slug
              translations(fallbackLocales: en, locale: ${locale}) {
                id
                key
                value {
                  blocks
                  links { id actionName }
                  value
                }
              }
            }
          }
        `,
        slug,
      };
    },
  },
  plain: {
    query(slug: string, locale: string) {
      return {
        cacheKey: `translation_group/${slug}`,
        query: `
          query localizedCopy($slug: String) {
            translationGroup(filter: {slug: {eq: $slug}}) {
              name
              namespace
              slug
              translations(fallbackLocales: en, locale: ${locale})
            }
          }
        `,
        slug,
      };
    },
  },
};

interface RequestTranslationParams {
  apiHost?: string;
  callback: RequestTranslationCallback;
  translationPath: string;
}

async function requestTranslation({
  apiHost = getFallbackApiHost(),
  callback,
  translationPath,
}: RequestTranslationParams) {
  const [locale, namespace] = translationPath.split('/');
  const preview = namespace.includes('::preview');

  if (namespace.startsWith('null')) {
    callback(null, { status: 204, data: '' });
    return;
  }

  const queries = namespace.split('+').map((slug) => {
    const [namespace, name] = slug.split('::');
    const isRich = slug.includes('::rich');
    const { query } = translationConfig[isRich ? 'rich' : 'plain'];
    return query(`${namespace}.${name}`, locale);
  });

  try {
    const response = await fetch(`${apiHost}/v2/cms/content`, {
      method: 'POST',
      body: JSON.stringify({ preview, queries }),
    });

    const json = await response.json();
    const data = dataSelector(json.results, locale, preview);

    callback(null, {
      status: response.status,
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
    callback(error, { status: 500, data: '' });
  }
}

export default requestTranslation;

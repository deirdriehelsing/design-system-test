import type { Scope } from 'nock';
import type { StructuredText } from 'datocms-structured-text-utils';

import { initI18next } from '@blueshift-ui/i18n/dist/lib/i18next/config';
import nockApi from '../nock-api';

type TranslationKeys = string[] | Record<string, string | StructuredText>;

const cache: Record<string, TranslationKeys> = {};

const onlyUnique = <T>(value: T, index: number, array: T[]) => array.indexOf(value) === index;

const buildStructuredText = (value: string): StructuredText => ({
  blocks: [],
  links: [],
  value: {
    schema: 'dast',
    document: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'span',
              value,
            },
          ],
        },
      ],
    },
  },
});

/**
 * Mocks the translations returned by the useTranslation hook.
 *
 * The format is `{ namespace: { key: value } }` or the shorthand `{ namespace: ['keyA', 'keyB', ...] }`.
 * Multiple namespaces can be mocked at once.
 *
 * To target a fully qualified namespace, use `::`, e.g. `blueshift-ui::search`. Otherwise
 * it will default to mocking all fetched namespaces with the given translation keys.
 */
function mockTranslations(namesAndKeys: Record<string, TranslationKeys>): Scope;

/**
 * Mocks the translations returned by the useTranslation hook.
 *
 * Keys are given as `{key: value }` or the shorthand `['keyA', 'keyB', ...]`.
 *
 * To target a fully qualified namespace, use `::`, e.g. `blueshift-ui::search`. Otherwise
 * it will default to mocking all fetched namespaces with the given translation keys.
 */
function mockTranslations(namespace: string, keys: TranslationKeys): Scope;

function mockTranslations(args: string | Record<string, TranslationKeys>, keys?: TranslationKeys) {
  // reinit i18n to clear the cache
  initI18next({ apiHost: process.env.NOCK_API_HOST ?? 'http://api.example.com' });

  // convert [string, object] syntax to [key: object]
  if (typeof args === 'string' && keys) {
    args = { [String(args)]: keys };
  }

  Object.assign(cache, args);

  return nockApi()
    .post('/v2/cms/content')
    .reply((_uri, body) => {
      const queries: { slug: string }[] = JSON.parse(String(body)).queries;

      return [
        200,
        {
          results: Object.entries(cache).flatMap(
            ([fullName, entries]: [string, TranslationKeys]) => {
              // find all root namespaces we are querying, so we can return mock translations for all of them
              let nss = queries.map(({ slug }) => slug.split('.')[0]).filter(onlyUnique);
              let name = fullName;

              // use override namespace if provided (e.g. `blueshift-ui::search`)
              if (fullName.includes('::')) {
                nss = [fullName.split('::')[1]];
                name = fullName.split('::')[0];
              }

              // convert shorthand syntax to object
              const keys: Record<string, string | StructuredText> = Array.isArray(entries)
                ? entries.reduce((obj, key) => ({ ...obj, [key]: key }), {})
                : entries;

              // map all given keys to a list of translation groups and rich translation groups
              // so that i18next can fetch and cache them all at once
              return nss.flatMap((ns) => [
                {
                  data: {
                    translationGroup: {
                      name,
                      namespace: ns,
                      slug: `${ns}.${name}`,
                      translations: keys,
                    },
                  },
                },
                {
                  data: {
                    richTranslationGroup: {
                      name,
                      namespace: ns,
                      slug: `${ns}.${name}`,
                      translations: Object.entries(keys).map(([key, value]) => ({
                        key,
                        value: typeof value === 'string' ? buildStructuredText(value) : value,
                      })),
                    },
                  },
                },
              ]);
            }
          ),
        },
      ];
    })
    .persist();
}

export default mockTranslations;

/* JSON structure based on https://github.com/i18next/i18next-multiload-backend-adapter:
 *  lang : {
 *   namespaceA: {
 *    key: 'value',
 *    ...etc},
 *   namespaceB: {
 *    key: 'value',
 *    ...etc},
 *  }
 */
interface StaticTranslationsJSON {
  [lang: string]: Record<string, Record<string, string>>;
}

export type { StaticTranslationsJSON };

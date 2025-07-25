import fetchMock from 'fetch-mock-jest';
import requestTranslation from '.';

describe('requestTranslation()', () => {
  beforeEach(() => {
    fetchMock.mockClear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('when translation group namespace is `null`', () => {
    it('provides expected response data', async () => {
      await requestTranslation({
        callback: (error, response) => {
          expect(error).toBe(null);
          expect(response.status).toBe(204);
          expect(response.data).toBe('');
        },
        translationPath: 'en/null',
      });
    });

    it('does not call `fetch`', async () => {
      await requestTranslation({ callback: () => {}, translationPath: 'en/null' });
      expect(fetchMock).not.toHaveBeenCalled();
    });
  });

  describe('when translation group namespace does not include `rich` flag', () => {
    const mockResponse = {
      results: [
        {
          data: {
            translationGroup: {
              name: 'plain_group',
              namespace: 'test',
              slug: 'test.plain_group',
              translations: {
                test_key: 'Test Value',
              },
            },
          },
        },
      ],
    };

    beforeEach(() => {
      fetchMock.once(
        'http://api/v2/cms/content',
        { status: 200, body: mockResponse },
        { overwriteRoutes: true }
      );
    });

    it('calls `fetch` correctly', async () => {
      await requestTranslation({ callback: () => {}, translationPath: 'en/test::plain_group' });
      expect(fetchMock).toHaveFetchedTimes(1);
      expect(fetchMock).toHaveFetched(
        'http://api/v2/cms/content',
        expect.objectContaining({
          body: JSON.stringify({
            query: `
              query localizedCopy($slug: String) {
                translationGroup(filter: {slug: {eq: $slug}}) {
                  name
                  namespace
                  slug
                  translations(fallbackLocales: en, locale: en)
                }
              }
            `,
            slug: 'test.plain_group',
          }),
        })
      );
    });

    it('provides expected response data', async () => {
      await requestTranslation({
        callback: (error, response) => {
          expect(error).toBe(null);
          expect(response.status).toBe(200);
          expect(response.data).toBe(
            JSON.stringify({
              en: {
                'test::plain_group': mockResponse.results[0].data.translationGroup.translations,
              },
            })
          );
        },
        translationPath: 'en/test::plain_group',
      });
    });

    it('can fetch multiple translation groups', async () => {
      await requestTranslation({
        callback: () => {},
        translationPath: 'en/test::group_1+test::group_2',
      });
      expect(fetchMock).toHaveFetchedTimes(1);
      expect(fetchMock).toHaveLastFetched((url, { body }) => {
        expect(url).toBe('http://api/v2/cms/content');
        expect(body).toEqual(
          JSON.stringify({
            preview: false,
            queries: [
              {
                cacheKey: 'translation_group/test.group_1',
                query: `
          query localizedCopy($slug: String) {
            translationGroup(filter: {slug: {eq: $slug}}) {
              name
              namespace
              slug
              translations(fallbackLocales: en, locale: en)
            }
          }
        `,
                slug: 'test.group_1',
              },
              {
                cacheKey: 'translation_group/test.group_2',
                query: `
          query localizedCopy($slug: String) {
            translationGroup(filter: {slug: {eq: $slug}}) {
              name
              namespace
              slug
              translations(fallbackLocales: en, locale: en)
            }
          }
        `,
                slug: 'test.group_2',
              },
            ],
          })
        );
        return true;
      });
    });
  });

  describe('when translation group namespace includes `rich` flag', () => {
    const mockResponse = {
      results: [
        {
          data: {
            richTranslationGroup: {
              name: 'rich_group',
              namespace: 'test',
              slug: 'test.rich_group',
              translations: [
                {
                  key: 'test_key',
                  value: {
                    schema: 'dast',
                    document: {
                      type: 'root',
                      children: [
                        {
                          type: 'heading',
                          level: 1,
                          children: [
                            { type: 'span', value: 'This\nis a ' },
                            { type: 'span', marks: ['strong'], value: 'mock' },
                          ],
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    };

    beforeEach(() => {
      fetchMock.once(
        'http://api/v2/cms/content',
        { status: 200, body: mockResponse },
        { overwriteRoutes: true }
      );
    });

    beforeEach(() => {
      fetchMock.mockClear();
    });

    it('calls `fetch` correctly', async () => {
      await requestTranslation({
        callback: () => {},
        translationPath: 'en/test::rich_group::rich',
      });
      expect(fetchMock).toHaveFetchedTimes(1);
      expect(fetchMock).toHaveFetched(
        'http://api/v2/cms/content',
        expect.objectContaining({
          body: JSON.stringify({
            query: `
              query localizedContent($slug: String) {
                richTranslationGroup(filter: {slug: {eq: $slug}}) {
                  id
                  name
                  namespace
                  slug
                  translations(fallbackLocales: en, locale: en) {
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
            slug: 'test.rich_group',
          }),
        })
      );
    });

    it('provides expected response data', async () => {
      await requestTranslation({
        callback: (error, response) => {
          expect(error).toBe(null);
          expect(response.status).toBe(200);
          expect(response.data).toBe(
            JSON.stringify({
              en: {
                'test::rich_group::rich': {
                  test_key: JSON.stringify(
                    mockResponse.results[0].data.richTranslationGroup.translations[0].value
                  ),
                },
              },
            })
          );
        },
        translationPath: 'en/test::rich_group::rich',
      });
    });
  });

  describe('when `fetch` fails', () => {
    beforeEach(() => {
      fetchMock.once(
        'http://api/v2/cms/content',
        { status: 500, body: '' },
        { overwriteRoutes: true }
      );
    });

    it('provides expected response data', async () => {
      await requestTranslation({
        callback: (error, response) => {
          expect(error).toBeInstanceOf(Error);
          expect(response.status).toBe(500);
          expect(response.data).toBe('');
        },
        translationPath: 'en/test::plain_group',
      });
    });
  });
});
